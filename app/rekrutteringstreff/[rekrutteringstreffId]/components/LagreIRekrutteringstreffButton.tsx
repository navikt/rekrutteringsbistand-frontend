import {
  AlertType,
  useVisVarsling,
} from '../../../components/varsling/Varsling';
import { useKandidatSøkMarkerteContext } from '../../../kandidat/KandidatSøkMarkerteContext';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
import {
  leggtilNyeJobbsøkere,
  LeggTilNyJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import * as React from 'react';

interface LagreIRekrutteringstreffButtonProps {
  rekrutteringstreffId?: string;
  kandidatsokKandidater: KandidatsokKandidat[];
  ref: React.RefObject<HTMLDialogElement>;
}

const LagreIRekrutteringstreffButton: React.FC<
  LagreIRekrutteringstreffButtonProps
> = ({ rekrutteringstreffId, kandidatsokKandidater, ref }) => {
  //const { track } = useUmami();

  const { markerteKandidater, fjernMarkerteKandidater } =
    useKandidatSøkMarkerteContext();
  /*const mineKandidatlisterHook = useMineKandidatlister(
    pageNumber > 1 ? pageNumber - 1 : 0,
  );*/

  //const kandidatlisteHook = useKandidatliste(stillingsId);
  const visVarsel = useVisVarsling();

  return (
    <Button
      variant='tertiary'
      onClick={() => {
        console.log(
          'klikker i rekrutteringstreff med id',
          rekrutteringstreffId,
        );
        if (rekrutteringstreffId) {
          lagreKandidaterIRekrutteringstreff({
            markerteKandidater,
            kandidatsokKandidater,
            rekrutteringstreffId,
            selectedRows: [],
            visVarsel,
            fjernMarkerteKandidater,
            closeModal: () => ref.current?.close(),
            setLaster: () => {},
            logger,
          });
        } else {
          console.log('viser modal');
          ref.current?.showModal();
        }
      }}
      icon={<PersonPlusIcon aria-hidden />}
      disabled={markerteKandidater?.length === 0}
    >
      {rekrutteringstreffId
        ? 'Legg til markerte kandidater i rekrutteringstreffet'
        : 'Lagre i rekrutteringstreff'}
    </Button>
  );
};

export default LagreIRekrutteringstreffButton;

export async function lagreKandidaterIRekrutteringstreff({
  markerteKandidater,
  kandidatsokKandidater,
  rekrutteringstreffId,
  selectedRows,
  visVarsel,
  fjernMarkerteKandidater,
  closeModal,
  setLaster,
  logger,
}: {
  markerteKandidater: string[] | undefined;
  kandidatsokKandidater: KandidatsokKandidat[];
  rekrutteringstreffId?: string;
  selectedRows: string[];
  visVarsel: (args: { alertType: AlertType; innhold: string }) => void;
  fjernMarkerteKandidater: () => void;
  closeModal: () => void;
  setLaster: (val: boolean) => void;
  logger: any;
}) {
  if (!markerteKandidater || markerteKandidater.length === 0) return;

  setLaster(true);
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
        navkontor: kandidat.navkontor ?? null,
        veilederNavn: kandidat.veilederVisningsnavn ?? 'UKJENT',
        veilederNavIdent: kandidat.veilederIdent ?? 'UKJENT',
      };
    })
    .filter(
      (kandidat) => kandidat && kandidat.fødselsnummer,
    ) as LeggTilNyJobbsøkereDTO;

  try {
    if (rekrutteringstreffId) {
      await leggtilNyeJobbsøkere(dto, rekrutteringstreffId);
    } else if (selectedRows.length !== 0) {
      await Promise.all(
        selectedRows.map((id) => leggtilNyeJobbsøkere(dto, id)),
      );
    } else {
      visVarsel({
        alertType: 'info',
        innhold: 'Velg minst ett rekrutteringstreff',
      });
      setLaster(false);
      return;
    }
    visVarsel({
      alertType: 'success',
      innhold: 'Kandidater lagret i rekrutteringstreff',
    });
    fjernMarkerteKandidater();
    closeModal();
  } catch (error) {
    logger.error('Feil ved lagring av kandidater i rekrutteringstreff', error);
    visVarsel({
      alertType: 'error',
      innhold: 'Feil ved lagring av kandidater i rekrutteringstreff',
    });
  }
  setLaster(false);
}
