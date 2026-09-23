'use client';

import { useUtskrift } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useUtskrift';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { Box, Button, Dialog, Heading } from '@navikt/ds-react';
import { FC, ReactNode, useRef } from 'react';

interface Props {
  åpen: boolean;
  tittel: string;
  dokumenttittel: string;
  sidestil: string;
  onLukk: () => void;
  children: ReactNode;
}

/** Forhåndsvisning i dialog. Bare innholdet i `children` skrives ut. */
const Utskriftsdialog: FC<Props> = ({
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
    <Dialog
      open={åpen}
      onOpenChange={(nesteÅpen) => {
        if (!nesteÅpen) onLukk();
      }}
    >
      <Dialog.Popup width='90vw' closeOnOutsideClick={false}>
        <Dialog.Header>
          <Dialog.Title>{tittel}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <div ref={utskriftsområdeRef}>{children}</div>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button type='button' variant='secondary'>
              Lukk
            </Button>
          </Dialog.CloseTrigger>
          <Button
            type='button'
            icon={<PrinterSmallIcon aria-hidden />}
            onClick={() => skrivUt()}
          >
            Skriv ut
          </Button>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
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

export default Utskriftsdialog;
