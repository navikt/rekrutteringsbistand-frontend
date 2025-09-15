import { Box, LinkCard, Loader } from '@navikt/ds-react';
import * as React from 'react';

export interface LenkeKortMedIkonProps {
  tittel: string;
  beskrivelse?: string;
  onClick: () => void;
  ikon: React.ReactElement<{ className?: string }> | string;
  loading?: boolean;
}

export default function LenkeKortMedIkon({
  tittel,
  beskrivelse,
  onClick,
  ikon,
  loading,
}: LenkeKortMedIkonProps) {
  return (
    <LinkCard data-color='accent'>
      <Box
        asChild
        borderRadius='12'
        padding='space-8'
        style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}
      >
        <LinkCard.Icon>
          {loading ? (
            <Loader />
          ) : typeof ikon === 'string' ? (
            <span className='text-xl leading-none mt-0.5'>{ikon}</span>
          ) : (
            React.cloneElement(ikon, {
              className: ['h-6 w-6 text-accent', ikon.props?.className]
                .filter(Boolean)
                .join(' '),
            })
          )}
        </LinkCard.Icon>
      </Box>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <div onClick={onClick}>{tittel}</div>
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>{beskrivelse}</LinkCard.Description>
    </LinkCard>
  );
}
