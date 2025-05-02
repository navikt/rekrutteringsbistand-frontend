import { useKandidatSøkMarkerteContext } from '../../../../kandidat/KandidatSøkMarkerteContext';
import LagreIRekrutteringstreffModal from './LagreIRekrutteringstreffModal';
import { useLagreKandidaterIRekrutteringstreff } from './useLagreKandidaterIRekrutteringstreff';
import { KandidatsokKandidat } from '@/app/api/kandidat-sok/useKandidatsøk';
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
  const lagreKandidater = useLagreKandidaterIRekrutteringstreff(
    kandidatsokKandidater,
    rekrutteringstreffId,
  );
  const modalRef = React.useRef<HTMLDialogElement>(null!);
  //const { track } = useUmami();

  const { markerteKandidater } = useKandidatSøkMarkerteContext();
  /*const mineKandidatlisterHook = useMineKandidatlister(
    pageNumber > 1 ? pageNumber - 1 : 0,
  );*/

  //const kandidatlisteHook = useKandidatliste(stillingsId);

  return (
    <div>
      <Button
        variant='tertiary'
        onClick={() => {
          console.log(
            'klikker i rekrutteringstreff med id',
            rekrutteringstreffId,
          );
          if (rekrutteringstreffId) {
            lagreKandidater(undefined);
          } else {
            console.log('viser modal');
            modalRef.current?.showModal();
          }
        }}
        icon={<PersonPlusIcon aria-hidden />}
        disabled={markerteKandidater?.length === 0}
      >
        {rekrutteringstreffId
          ? 'Legg til markerte kandidater i rekrutteringstreffet'
          : 'Lagre i rekrutteringstreff'}
      </Button>
      <LagreIRekrutteringstreffModal
        rekrutteringstreffId={rekrutteringstreffId}
        kandidatsokKandidater={kandidatsokKandidater}
        modalRef={modalRef}
      />
    </div>
  );
};

export default LagreIRekrutteringstreffButton;
