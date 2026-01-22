import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  opprettJobbsøkere,
  type OpprettJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations';
import { RekbisError } from '@/util/rekbisError';

export interface LagreKandidaterParams {
  markerteKandidater?: string[];
  kandidatsokKandidater: KandidatsokKandidat[];
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

export async function lagreKandidaterIRekrutteringstreff(
  params: LagreKandidaterParams,
  callbacks: LagreKandidaterCallbacks,
): Promise<LagreKandidaterResultat> {
  const {
    markerteKandidater,
    kandidatsokKandidater,
    rekrutteringstreffId,
    selectedRows,
  } = params;
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
    .map((kandidatnummer) => {
      const kandidat = kandidatsokKandidater.find(
        (k) => k.arenaKandidatnr === kandidatnummer,
      );
      if (!kandidat) {
        feil.push(`Fant ikke kandidat med kandidatnummer: ${kandidatnummer}`);
        return null;
      }
      if (!kandidat.fodselsnummer) {
        feil.push(`Kandidat mangler fødselsnummer (${kandidatnummer})`);
      }
      return {
        fødselsnummer: kandidat.fodselsnummer,
        fornavn: kandidat.fornavn ?? null,
        etternavn: kandidat.etternavn ?? null,
      };
    })
    .filter(
      (kandidat) => kandidat && kandidat.fødselsnummer,
    ) as OpprettJobbsøkereDTO;

  try {
    if (rekrutteringstreffId) {
      await opprettJobbsøkere(rekrutteringstreffId, dto);
      mutateJobbsøkere?.();
    } else if (selectedRows && selectedRows.length > 0) {
      await Promise.all(selectedRows.map((id) => opprettJobbsøkere(id, dto)));
      mutateRekrutteringstreffOversikt?.();
    } else {
      visVarsel({
        type: 'info',
        tekst: 'Velg minst ett rekrutteringstreff',
      });
      return { suksess: false, feil: ['Ingen rekrutteringstreff valgt'] };
    }

    visVarsel({
      type: 'success',
      tekst: `${markerteKandidater.length} kandidat${markerteKandidater.length > 1 ? 'er' : ''} lagret i rekrutteringstreff`,
    });
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
