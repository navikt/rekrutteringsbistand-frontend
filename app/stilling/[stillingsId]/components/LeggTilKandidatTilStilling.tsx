import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '../../../components/legg-til-kandidat/LeggTilKandidater';
import { useVisVarsling } from '../../../components/varsling/Varsling';

export interface LeggTilKandidatTilStillingProps {
  stillingsId: string;
  stillingsTittel: string;
}

const LeggTilKandidatTilStilling: React.FC<LeggTilKandidatTilStillingProps> = ({
  stillingsId,
  stillingsTittel,
}) => {
  const ref = useRef<HTMLDialogElement>(null);

  const [valgteKandidater, setValgteKandidater] = useState<ValgtKandidatProp[]>(
    [],
  );

  const kandidatlisteIdHook = useKandidatliste(stillingsId);

  const visVarsel = useVisVarsling();

  const [laster, setLaster] = useState(false);

  const onLeggTilKandidat = async () => {
    setLaster(true);

    const valgteAktørIder = valgteKandidater
      .map((kandidat) => kandidat.aktørId)
      .filter((aktørId) => aktørId !== undefined && aktørId !== null);

    if (valgteAktørIder.length > 0) {
      await leggTilKandidater(valgteAktørIder, stillingsId)
        .then(() => {
          kandidatlisteIdHook.mutate();
          visVarsel({
            innhold: 'Kandidater ble lagt til i stillingen',
            alertType: 'success',
          });

          ref.current?.close();
        })
        .catch(() => {
          visVarsel({
            innhold: 'Noe gikk galt ved lagring av kandidat',
            alertType: 'error',
          });
        });
    }
    setLaster(false);
  };

  return (
    <div>
      <Button
        loading={laster}
        onClick={() => ref.current?.showModal()}
        variant='secondary'
        className='mr-2'
        icon={<ArrowForwardIcon aria-hidden />}
      >
        Legg til kandidater
      </Button>

      <Modal
        width='600px'
        ref={ref}
        header={{
          closeButton: false,
          heading: `Legg til kandidater til ${stillingsTittel ?? 'stilling'}`,
        }}
      >
        <Modal.Body>
          <LeggTilKandidater
            måHaAktørId
            callBack={(valgteKandidater) => {
              setValgteKandidater(valgteKandidater);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onLeggTilKandidat}>Legg til kandidater</Button>
          <Button
            loading={laster}
            type='button'
            variant='secondary'
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeggTilKandidatTilStilling;
