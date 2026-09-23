'use client';

import { useUtskrift } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useUtskrift';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, Modal } from '@navikt/ds-react';
import { FC, ReactNode, useRef } from 'react';

interface Props {
  åpen: boolean;
  tittel: string;
  dokumenttittel: string;
  sidestil: string;
  onLukk: () => void;
  children: ReactNode;
}

/** Forhåndsvisning i modal. Bare innholdet i `children` skrives ut. */
const Utskriftsmodal: FC<Props> = ({
  åpen,
  tittel,
  dokumenttittel,
  sidestil,
  onLukk,
  children,
}) => {
  const utskriftsområdeRef = useRef<HTMLDivElement>(null);
  const skrivUt = useUtskrift({ utskriftsområdeRef, dokumenttittel, sidestil });

  return (
    <Modal
      open={åpen}
      onClose={onLukk}
      header={{ heading: tittel, closeButton: true }}
      width='90vw'
      placement='top'
    >
      <Modal.Body>
        <div ref={utskriftsområdeRef}>{children}</div>
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

/** Én side i utskriften. */
export const Utskriftsseksjon: FC<{
  headingId: string;
  tittel: string;
  children: ReactNode;
}> = ({ headingId, tittel, children }) => (
  <Box
    as='section'
    aria-labelledby={headingId}
    borderColor='neutral-subtle'
    borderWidth='1'
    borderRadius='8'
    padding='space-16'
    marginBlock='space-0 space-16'
    className='break-inside-avoid last:break-after-auto print:break-after-page'
  >
    <Heading id={headingId} level='2' size='medium' spacing>
      {tittel}
    </Heading>
    {children}
  </Box>
);

export default Utskriftsmodal;
