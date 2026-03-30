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
        telefonnummer: kandidat.telefonnummer ?? null,
      };
    })
    .filter((kandidat) => kandidat.fødselsnummer) as OpprettJobbsøkereDTO;

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
