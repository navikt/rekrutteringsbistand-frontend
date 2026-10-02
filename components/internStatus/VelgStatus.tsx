'use client';

import { PencilIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { ReactNode, useState } from 'react';

export interface StatusAlternativ<T extends string> {
  verdi: T;
  tekst: string;
  ikon?: ReactNode;
}

export interface VelgStatusProps<T extends string> {
  status: T | null;
  alternativer: readonly StatusAlternativ<T>[];
  tag: ReactNode;
  onEndreStatus: (ny: T) => Promise<void>;
  disabled?: boolean;
  ariaLabel: string;
}

export default function VelgStatus<T extends string>({
  status,
  alternativer,
  tag,
  onEndreStatus,
  disabled = false,
  ariaLabel,
}: VelgStatusProps<T>) {
  const [pending, setPending] = useState(false);

  const endreStatus = async (ny: T) => {
    if (pending || ny === status) return;
    setPending(true);
    try {
      await onEndreStatus(ny);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className='flex items-center'>
      {tag}
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            data-color='neutral'
            disabled={disabled || pending}
            size='small'
            icon={<PencilIcon aria-hidden />}
            variant='tertiary'
            aria-label={ariaLabel}
          />
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          {alternativer.map((a) => (
            <ActionMenu.Item
              key={a.verdi}
              icon={a.ikon}
              onSelect={() => void endreStatus(a.verdi)}
            >
              {a.tekst}
            </ActionMenu.Item>
          ))}
        </ActionMenu.Content>
      </ActionMenu>
    </div>
  );
}
