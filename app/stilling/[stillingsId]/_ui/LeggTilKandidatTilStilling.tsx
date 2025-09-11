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
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Link, Modal } from '@navikt/ds-react';
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
          tekst: 'Jobbsøkere ble lagt til i stillingen',
          type: 'success',
        });
        setValgteKandidater([]);
        kandidatlisteInfoHook.mutate();
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
    <React.Fragment key={stillingsId}>
      <Box.New
        background='neutral-softA'
        borderRadius='xlarge'
        paddingInline='space-16'
        paddingBlock='space-12'
        role='button'
        tabIndex={0}
        aria-label='Legg til jobbsøkere. Velg og legg til jobbsøkere i stillingen.'
        className='group flex items-start justify-between gap-4 cursor-pointer outline-none focus:ring-2 focus:ring-focus focus:ring-offset-2'
        onClick={() => !laster && handleOpenModal()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !laster) {
            e.preventDefault();
            handleOpenModal();
          }
        }}
        aria-busy={laster || undefined}
      >
        <div className='flex gap-3 items-start'>
          <span className='text-xl leading-none mt-0.5'>➕</span>
          <div className='flex flex-col'>
            <BodyShort spacing className='m-0'>
              <Link
                href={'#'}
                onClick={(e) => {
                  e.preventDefault();
                  if (!laster) handleOpenModal();
                }}
              >
                Legg til jobbsøkere
              </Link>
            </BodyShort>
            <BodyShort size='small'>
              Vet du fødselsnummeret til personen, kan du legge dem til med en
              gang.
            </BodyShort>
          </div>
        </div>
        <ArrowRightIcon
          aria-hidden
          className='transition-transform group-hover:translate-x-1 mt-1'
        />
      </Box.New>

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
    </React.Fragment>
  );
};

export default LeggTilKandidatTilStilling;
