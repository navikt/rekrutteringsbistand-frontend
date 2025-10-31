import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { formidleUsynligKandidat } from '@/app/api/kandidat/formidleKandidat';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '@/app/stilling/_ui/legg-til-kandidat/LeggTilKandidater';
import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { Button, Modal } from '@navikt/ds-react';
import { FC, Fragment, useRef, useState } from 'react';

export interface LeggTilKandidatTilStillingProps {
  stillingsId: string;
  stillingsTittel: string;
}

const LeggTilKandidatTilStilling: FC<LeggTilKandidatTilStillingProps> = ({
  stillingsId,
  stillingsTittel,
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const { track } = useUmami();
  const { kandidatlisteInfo, refetchKandidatliste } = useStillingsContext();
  const { valgtNavKontor, visVarsel } = useApplikasjonContext();
  const [valgteKandidater, setValgteKandidater] = useState<ValgtKandidatProp[]>(
    [],
  );
  const [modalKey, setModalKey] = useState(0);

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
      kandidatlisteInfo?.kandidatlisteId &&
      (synligeKandidater.length > 0 || usynligFåttJobben.length > 0)
    ) {
      try {
        await leggTilKandidater(synligeKandidater, stillingsId);

        for (const kandidat of usynligFåttJobben) {
          await formidleUsynligKandidat(kandidatlisteInfo.kandidatlisteId, {
            fnr: kandidat.fødselsnummer,
            fåttJobb: true,
            navKontor: valgtNavKontor?.navKontor ?? '',
            stillingsId: stillingsId,
          });
        }

        track(UmamiEvent.Stilling.legg_til_kandidat, {
          antall: valgteKandidater.length,
        });

        visVarsel({
          tekst: 'Jobbsøkere ble lagt til i stillingen',
          type: 'success',
        });
        setValgteKandidater([]);
        refetchKandidatliste?.();
        ref.current?.close();
      } catch (error) {
        visVarsel({
          tekst: 'Noe gikk galt ved lagring av jobbsøkere',
          type: 'error',
        });
        throw new RekbisError({
          message: 'Veil ved legg til jobbsøkere',
          error,
        });
      }
    }

    setLaster(false);
  };

  return (
    <Fragment key={stillingsId}>
      <LenkeKortMedIkon
        tittel='Legg til jobbsøkere'
        beskrivelse='Vet du fødselsnummeret til personen, kan du legge dem til med en
              gang.'
        onClick={handleOpenModal}
        ikon={'➕'}
        loading={laster}
      />

      <Modal
        width='600px'
        ref={ref}
        header={{
          closeButton: false,
          heading: `Legg til jobbsøkere til ${stillingsTittel ?? 'stilling'}`,
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
            Legg til jobbsøker
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
    </Fragment>
  );
};

export default LeggTilKandidatTilStilling;
