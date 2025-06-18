import { RekbisError } from '../../../../../util/rekbisError';
import { useKandidatSøkMarkerteContext } from '../../../../kandidat/KandidatSøkMarkerteContext';
import LagreIRekrutteringstreffModal from './LagreIRekrutteringstreffModal';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { useApplikasjonContext } from '@/app/providers/ApplikasjonContext';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

interface LagreIRekrutteringstreffButtonProps {
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[];
}

const LagreIRekrutteringstreffButton: React.FC<
  LagreIRekrutteringstreffButtonProps
> = ({ rekrutteringstreffId, kandidatsokKandidater }) => {
  const modalRef = React.useRef<HTMLDialogElement>(null!);
  const { visVarsel } = useApplikasjonContext();
  //const { track } = useUmami();

  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();

  return (
    <div>
      <Button
        variant='tertiary'
        onClick={() => {
          if (rekrutteringstreffId) {
            lagreKandidater();
          } else {
            modalRef.current?.showModal();
          }
        }}
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        {rekrutteringstreffId
          ? 'Legg til markerte kandidater'
          : 'Lagre i rekrutteringstreff'}
      </Button>
      <LagreIRekrutteringstreffModal
        kandidatsokKandidater={kandidatsokKandidater}
        modalRef={modalRef}
      />
    </div>
  );

  async function lagreKandidater() {
    if (!markerteKandidater || markerteKandidater.length === 0) return;

    const feil: string[] = [];
    const dto: LeggTilNyJobbsøkereDTO = markerteKandidater
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
          kandidatnummer: kandidat.arenaKandidatnr ?? null,
          // navkontor: kandidat.navkontor ?? null,
          // veilederNavn: kandidat.veilederVisningsnavn ?? 'UKJENT',
          // veilederNavIdent: kandidat.veilederIdent ?? 'UKJENT',
        };
      })
      .filter(
        (kandidat) => kandidat && kandidat.fødselsnummer,
      ) as LeggTilNyJobbsøkereDTO;

    try {
      if (rekrutteringstreffId) {
        await leggtilNyeJobbsøkere(dto, rekrutteringstreffId);
      }
      visVarsel({
        type: 'success',
        tekst: `${markerteKandidater.length}  kandidat${markerteKandidater.length > 1 ? 'er' : ''} lagret i rekrutteringstreff`,
      });
      fjernMarkerteKandidater();
    } catch (error) {
      new RekbisError({
        beskrivelse: 'Feil ved lagring av kandidater i rekrutteringstreff',
        error,
      });
      visVarsel({
        type: 'error',
        tekst: 'Feil ved lagring av kandidater i rekrutteringstreff',
      });
    }
  }
};

export default LagreIRekrutteringstreffButton;
