'use client';

import type { ArbeidsgiverMedId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringStegProps';
import { useUtskrift } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useUtskrift';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Button,
  Heading,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { FC, useRef } from 'react';

export interface Utskriftsfordeling {
  arbeidsgiver: ArbeidsgiverMedId;
  personTreffIder: string[];
}

interface Props {
  åpen: boolean;
  fordelinger: Utskriftsfordeling[];
  navnPåJobbsøker: (personTreffId: string) => string;
  onLukk: () => void;
}

/** Utskriftsvennlig visning av intervjurekkefølgen per arbeidsgiver. */
const IntervjufordelingUtskrift: FC<Props> = ({
  åpen,
  fordelinger,
  navnPåJobbsøker,
  onLukk,
}) => {
  const utskriftsområdeRef = useRef<HTMLDivElement>(null);
  const skrivUt = useUtskrift({
    utskriftsområdeRef,
    dokumenttittel: 'WorkOp-intervjufordeling',
    sidestil: '@page { size: landscape; margin: 12mm; }',
  });

  return (
    <Modal
      open={åpen}
      onClose={onLukk}
      header={{ heading: 'Intervjufordeling – utskrift', closeButton: true }}
      width='90vw'
      placement='top'
    >
      <Modal.Body>
        <div ref={utskriftsområdeRef}>
          <Heading
            level='1'
            size='medium'
            spacing
            className='hidden print:block'
          >
            WorkOp – intervjufordeling
          </Heading>
          <VStack gap='space-16'>
            {fordelinger.map(({ arbeidsgiver, personTreffIder }) => {
              const headingId = `utskrift-intervjufordeling-${arbeidsgiver.arbeidsgiverTreffId}`;

              return (
                <Box
                  as='section'
                  key={arbeidsgiver.arbeidsgiverTreffId}
                  aria-labelledby={headingId}
                  borderColor='neutral-subtle'
                  borderWidth='1'
                  borderRadius='8'
                  padding='space-16'
                  className='break-inside-avoid last:break-after-auto print:break-after-page'
                >
                  <Heading id={headingId} level='2' size='medium' spacing>
                    {arbeidsgiver.navn}
                  </Heading>
                  <VStack
                    as='ol'
                    gap='space-4'
                    aria-label={`Intervjurekkefølge for ${arbeidsgiver.navn}`}
                    className='m-0 list-none p-0'
                  >
                    {personTreffIder.map((personTreffId) => (
                      <Box as='li' key={personTreffId}>
                        <BodyShort>{navnPåJobbsøker(personTreffId)}</BodyShort>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              );
            })}
          </VStack>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type='button'
          icon={<PrinterSmallIcon aria-hidden />}
          onClick={() => skrivUt()}
        >
          Skriv ut
        </Button>
        <Button type='button' variant='secondary' onClick={onLukk}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default IntervjufordelingUtskrift;
