import {
  opprettJobbsøkere,
  type OpprettJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations';
import { MarkertKandidat } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { RekbisError } from '@/util/rekbisError';

export interface LagreKandidaterParams {
  markerteKandidater?: MarkertKandidat[];
  rekrutteringstreffId?: string;
  selectedRows?: string[];
}

export interface LagreKandidaterCallbacks {
  visVarsel: (varsel: {
    type: 'success' | 'error' | 'info';
    tekst: string;
  }) => void;
  fjernMarkerteKandidater: () => void;
  mutateJobbsøkere?: () => void;
  mutateRekrutteringstreffOversikt?: () => void;
}

export interface LagreKandidaterResultat {
  suksess: boolean;
  feil: string[];
}

interface LeggTilRespons {
  antallLagtTil: number;
  antallAvvist: number;
}

export async function lagreKandidaterIRekrutteringstreff(
  params: LagreKandidaterParams,
  callbacks: LagreKandidaterCallbacks,
): Promise<LagreKandidaterResultat> {
  const { markerteKandidater, rekrutteringstreffId, selectedRows } = params;
  const {
    visVarsel,
    fjernMarkerteKandidater,
    mutateJobbsøkere,
    mutateRekrutteringstreffOversikt,
  } = callbacks;

  if (!markerteKandidater || markerteKandidater.length === 0) {
    return { suksess: false, feil: ['Ingen kandidater markert'] };
  }

  const feil: string[] = [];
  const dto: OpprettJobbsøkereDTO = markerteKandidater
    .map((kandidat) => {
      if (!kandidat.fodselsnummer) {
        feil.push(
          `Kandidat mangler fødselsnummer (${kandidat.arenaKandidatnr})`,
        );
      }
      return {
        fødselsnummer: kandidat.fodselsnummer,
        fornavn: kandidat.fornavn ?? null,
        etternavn: kandidat.etternavn ?? null,
      };
    })
    .filter((kandidat) => kandidat.fødselsnummer) as OpprettJobbsøkereDTO;

  try {
    let responser: LeggTilRespons[] = [];

    if (rekrutteringstreffId) {
      const respons = await opprettJobbsøkere(rekrutteringstreffId, dto);
      if (respons && typeof respons === 'object' && 'antallAvvist' in respons) {
        responser = [respons as LeggTilRespons];
      }
      mutateJobbsøkere?.();
    } else if (selectedRows && selectedRows.length > 0) {
      const resultater = await Promise.all(
        selectedRows.map((id) => opprettJobbsøkere(id, dto)),
      );
      responser = resultater.filter(
        (r): r is LeggTilRespons =>
          r && typeof r === 'object' && 'antallAvvist' in r,
      );
      mutateRekrutteringstreffOversikt?.();
    } else {
      visVarsel({
        type: 'info',
        tekst: 'Velg minst ett rekrutteringstreff',
      });
      return { suksess: false, feil: ['Ingen rekrutteringstreff valgt'] };
    }

    const antallAvvist = responser.reduce((sum, r) => sum + r.antallAvvist, 0);
    if (antallAvvist > 0) {
      const antallLagtTil = responser.reduce(
        (sum, r) => sum + r.antallLagtTil,
        0,
      );
      const lagtTilTekst =
        antallLagtTil > 0
          ? `${antallLagtTil} kandidat${antallLagtTil > 1 ? 'er' : ''} ble lagt til. `
          : '';
      visVarsel({
        type: 'info',
        tekst: `${lagtTilTekst}${antallAvvist} kandidat${antallAvvist > 1 ? 'er' : ''} ble ikke lagt til fordi de ikke er synlige i kandidatsøk`,
      });
    } else {
      visVarsel({
        type: 'success',
        tekst: `${markerteKandidater.length} kandidat${markerteKandidater.length > 1 ? 'er' : ''} lagret i rekrutteringstreff`,
      });
    }
    fjernMarkerteKandidater();

    return { suksess: true, feil };
  } catch (error) {
    new RekbisError({
      message: 'Feil ved lagring av kandidater i rekrutteringstreff',
      error,
    });
    visVarsel({
      type: 'error',
      tekst: 'Feil ved lagring av kandidater i rekrutteringstreff',
    });
    return { suksess: false, feil: ['Feil ved lagring'] };
  }
}
