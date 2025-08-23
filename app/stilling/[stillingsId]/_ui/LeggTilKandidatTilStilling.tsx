import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { formidleUsynligKandidat } from '@/app/api/kandidat/formidleKandidat';
import { useKandidatlisteInfo } from '@/app/api/kandidat/useKandidatlisteInfo';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '@/components/felles/legg-til-kandidat/LeggTilKandidater';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
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
  const { stillingsData } = useStillingsContext();
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const [valgteKandidater, setValgteKandidater] = useState<ValgtKandidatProp[]>(
    [],
  );
  const [modalKey, setModalKey] = useState(0);
  const kandidatlisteInfoHook = useKandidatlisteInfo(
    stillingsData.stillingsinfo,
  );

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
      kandidatlisteInfoHook?.data?.kandidatlisteId &&
      (synligeKandidater.length > 0 || usynligFåttJobben.length > 0)
    ) {
      try {
        await leggTilKandidater(synligeKandidater, stillingsId);

        for (const kandidat of usynligFåttJobben) {
          await formidleUsynligKandidat(
            kandidatlisteInfoHook?.data?.kandidatlisteId,
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
        kandidatlisteInfoHook.mutate();
        ref.current?.close();
      } catch (error) {
        visVarsel({
          tekst: 'Noe gikk galt ved lagring av kandidater',
          type: 'error',
        });
        throw new RekbisError({ message: 'Veil ved legg til kandidat', error });
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
