import { RekbisError } from '@/util/rekbisError';
import { Box, LinkCard, Loader } from '@navikt/ds-react';
import * as React from 'react';

export interface LenkeKortMedIkonProps {
  tittel: string;
  beskrivelse?: string;
  href?: string;
  onClick?: () => void;
  ikon: React.ReactElement<{ className?: string }> | string;
  loading?: boolean;
}

export default function LenkeKortMedIkon({
  tittel,
  beskrivelse,
  href,
  ikon,
  loading,
  onClick,
}: LenkeKortMedIkonProps) {
  if (!href && !onClick) {
    throw new RekbisError('LenkeKortMedIkon må få href eller onClick');
  }
  return (
    <LinkCard data-color='accent'>
      <Box
        asChild
        borderRadius='12'
        padding='space-8'
        style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}
        className='cursor-pointer'
      >
        <LinkCard.Icon>
          {loading ? (
            <Loader />
          ) : typeof ikon === 'string' ? (
            <span className='mt-0.5 text-xl leading-none'>{ikon}</span>
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
        {href ? (
          <LinkCard.Anchor href={href}>{tittel}</LinkCard.Anchor>
        ) : (
          <LinkCard.Anchor asChild>
            <div onClick={onClick}>{tittel}</div>
          </LinkCard.Anchor>
        )}
      </LinkCard.Title>
      <LinkCard.Description>{beskrivelse}</LinkCard.Description>
    </LinkCard>
  );
}
