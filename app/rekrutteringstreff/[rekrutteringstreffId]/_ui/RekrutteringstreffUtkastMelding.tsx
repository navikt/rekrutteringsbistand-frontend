'use client';

import { slettRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useSafeRouter } from '@/hooks/useSafeRouter';
import UtkastFigur from '@/public/illustrasjoner/figur-med-verktøy.svg';
import { RekbisError } from '@/util/rekbisError';
import { TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading, List, Modal } from '@navikt/ds-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface RekrutteringstreffUtkastMeldingProps {
  erEier?: boolean;
}

export default function RekrutteringstreffUtkastMelding({
  erEier = true,
}: RekrutteringstreffUtkastMeldingProps) {
  const router = useSafeRouter();
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [laster, setLaster] = useState(false);

  const handleSlett = async () => {
    if (laster || !rekrutteringstreffId) return;
    setLaster(true);
    let skalLukke = false;

    try {
      await slettRekrutteringstreff(rekrutteringstreffId);
      skalLukke = true;
      if (router?.push) {
        router.push('/rekrutteringstreff');
      } else {
        window.location.href = '/rekrutteringstreff';
      }
    } catch (error) {
      new RekbisError({
        message: 'Feiler når vi prøver å slette rekrutteringstreff',
        error,
      });
    } finally {
      setLaster(false);
      if (skalLukke) {
        modalRef.current?.close();
      }
    }
  };

  return (
    <div className='flex flex-col items-center gap-4 self-stretch px-5 py-10'>
      <Image src={UtkastFigur} alt='En smilende figur med verktøy i hendene' />
      <Heading level='5' size='small'>
        Treffet er ikke publisert enda
      </Heading>
      {erEier ? (
        <>
          <p className='pb-10'>
            Fortsett der du slapp, eller slett det hvis du vil
          </p>
          <div className='flex gap-2 pb-5'>
            <Button
              variant='primary'
              className='h-12 w-72'
              onClick={() =>
                router?.push(
                  `/rekrutteringstreff/${rekrutteringstreffId}/rediger`,
                )
              }
            >
              Fortsett å opprette
            </Button>
            <Button
              icon={<TrashIcon />}
              variant='tertiary'
              onClick={() => modalRef.current?.showModal()}
            >
              Slett
            </Button>
          </div>
        </>
      ) : (
        <p className='pb-10'>
          Treffet er opprettet, men er ikke publisert enda.
        </p>
      )}

      <Modal
        ref={modalRef}
        onClose={() => {
          if (laster) {
            modalRef.current?.showModal();
          }
        }}
        className='overflow-visible'
        header={{ heading: 'Slett treffet' }}
      >
        <Modal.Body className='overflow-visible'>
          <BodyShort className='mb-4'>
            Siden treffet ikke er publisert kan du slette det.
          </BodyShort>
          <Box marginBlock='space-16' asChild>
            <List data-aksel-migrated-v8 as='ul'>
              Etter sletting:
              <List.Item>
                forsvinner treffet fra treff-oversikten i rekrutteringsbistand.
              </List.Item>
              <List.Item>kan du ikke lenger gjennopprette treffet.</List.Item>
            </List>
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-color='danger'
            type='button'
            variant='primary'
            size='small'
            loading={laster}
            onClick={() => void handleSlett()}
          >
            Ja, slett treffet
          </Button>
          <Button
            type='button'
            variant='secondary'
            size='small'
            disabled={laster}
            onClick={() => {
              if (!laster) modalRef.current?.close();
            }}
          >
            Nei, behold treffet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
