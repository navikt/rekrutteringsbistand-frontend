import { RekbisError } from '../../../../util/rekbisError';
import { UmamiEvent } from '../../../../util/umamiEvents';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { formidleUsynligKandidat } from '../../../api/kandidat/formidleKandidat';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '../../../components/legg-til-kandidat/LeggTilKandidater';
import { useApplikasjonContext } from '../../../providers/ApplikasjonContext';
import { useUmami } from '../../../providers/UmamiContext';
import { useStillingsContext } from '../StillingsContext';
import { PersonPlusIcon } from '@navikt/aksel-icons';
import { Button, Modal } from '@navikt/ds-react';
import * as React from 'react';
import { useRef, useState } from 'react';

export interface LeggTilKandidatTilStillingProps {
  stillingsId: string;
  stillingsTittel: string;
}

const LeggTilKandidatTilStilling: React.FC<LeggTilKandidatTilStillingProps> = ({
  stillingsId,
  stillingsTittel,
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const { track } = useUmami();
  const { erEier, stillingsData } = useStillingsContext();
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const [valgteKandidater, setValgteKandidater] = useState<ValgtKandidatProp[]>(
    [],
  );
  const [modalKey, setModalKey] = useState(0);
  const kandidatlisteIdHook = useKandidatliste(stillingsData, erEier);

  const [laster, setLaster] = useState(false);

  const handleOpenModal = () => {
    setModalKey((prevKey) => prevKey + 1);
    track(UmamiEvent.Stilling.åpne_legg_til_kandidat_modal);
    ref.current?.showModal();
  };

  const onLeggTilKandidat = async () => {
    setLaster(true);

    const usynligFåttJobben = valgteKandidater.filter(
      (k) => k.aktørId === null,
    );
    const synligeKandidater = valgteKandidater
      .map((kandidat) => kandidat.aktørId)
      .filter((aktørId) => aktørId !== undefined && aktørId !== null);

    if (
      kandidatlisteIdHook.data?.kandidatlisteId &&
      (synligeKandidater.length > 0 || usynligFåttJobben.length > 0)
    ) {
      try {
        await leggTilKandidater(synligeKandidater, stillingsId);

        for (const kandidat of usynligFåttJobben) {
          await formidleUsynligKandidat(
            kandidatlisteIdHook.data?.kandidatlisteId,
            {
              fnr: kandidat.fødselsnummer,
              fåttJobb: true,
              navKontor: valgtNavKontor?.navKontor ?? '',
              stillingsId: stillingsId,
            },
          );
        }

        track(UmamiEvent.Stilling.legg_til_kandidat, {
          antall: valgteKandidater.length,
        });

        visVarsel({
          tekst: 'Kandidater ble lagt til i stillingen',
          type: 'success',
        });
        setValgteKandidater([]);
        kandidatlisteIdHook.mutate();
        ref.current?.close();
      } catch (error) {
        visVarsel({
          tekst: 'Noe gikk galt ved lagring av kandidater',
          type: 'error',
        });
        throw new RekbisError({ error: error });
      }
    }

    setLaster(false);
  };

  return (
    <React.Fragment key={stillingsId}>
      <Button
        loading={laster}
        onClick={handleOpenModal}
        variant='secondary'
        size='small'
        icon={<PersonPlusIcon aria-hidden />}
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
            key={modalKey}
            callBack={(valgteKandidater) => {
              setValgteKandidater(valgteKandidater);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={valgteKandidater.length === 0}
            onClick={onLeggTilKandidat}
          >
            Legg til kandidater
          </Button>
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
    </React.Fragment>
  );
};

export default LeggTilKandidatTilStilling;
