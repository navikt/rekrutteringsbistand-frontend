import { rekbisError } from '../../../../util/rekbisError';
import { useApplikasjonContext } from '../../../ApplikasjonContext';
import { leggTilKandidater } from '../../../api/kandidat-sok/leggTilKandidat';
import { formidleUsynligKandidat } from '../../../api/kandidat/formidleKandidat';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '../../../components/legg-til-kandidat/LeggTilKandidater';
import { useVisVarsling } from '../../../components/varsling/Varsling';
import { ArrowForwardIcon } from '@navikt/aksel-icons';
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

  const { valgtNavKontor } = useApplikasjonContext();
  const [valgteKandidater, setValgteKandidater] = useState<ValgtKandidatProp[]>(
    [],
  );

  const kandidatlisteIdHook = useKandidatliste(stillingsId);

  const visVarsel = useVisVarsling();

  const [laster, setLaster] = useState(false);

  const onLeggTilKandidat = async () => {
    setLaster(true);

    const usynligFåttJobben = valgteKandidater.filter(
      (k) => k.aktørId === null,
    );
    const synligeKandidater = valgteKandidater
      .map((kandidat) => kandidat.aktørId)
      .filter((aktørId) => aktørId !== undefined && aktørId !== null);

    if (synligeKandidater.length > 0) {
      try {
        await leggTilKandidater(synligeKandidater, stillingsId);

        for (const kandidat of usynligFåttJobben) {
          await formidleUsynligKandidat(
            kandidatlisteIdHook.data?.kandidatlisteId ?? '',
            {
              fnr: kandidat.fødselsnummer,
              fåttJobb: true,
              navKontor: valgtNavKontor?.navKontor ?? '',
              stillingsId: stillingsId,
            },
          );
        }

        const formidleUsynligeKandidater = async () => {
          for (const kandidat of usynligFåttJobben) {
            await formidleUsynligKandidat(
              kandidatlisteIdHook.data?.kandidatlisteId ?? '',
              {
                fnr: kandidat.fødselsnummer,
                fåttJobb: false,
                navKontor: valgtNavKontor?.navKontor ?? '',
                stillingsId: stillingsId,
              },
            );
          }
        };
        await formidleUsynligeKandidater();

        visVarsel({
          innhold: 'Kandidater ble lagt til i stillingen',
          alertType: 'success',
        });
        kandidatlisteIdHook.mutate();
        ref.current?.close();
      } catch (error) {
        visVarsel({
          innhold: 'Noe gikk galt ved lagring av kandidater',
          alertType: 'error',
        });
        throw new rekbisError({ error: error });
      }
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
            //TODO Alternativ
            // måHaAktørId
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
    </div>
  );
};

export default LeggTilKandidatTilStilling;
