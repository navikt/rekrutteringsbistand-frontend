import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

export interface FilterKomponentProps {
  children?: React.ReactNode | undefined;
  tittel: string;
}

const FilterKomponent: React.FC<FilterKomponentProps> = ({
  children,
  tittel,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className='relative'>
      <Button
        variant='tertiary'
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        iconPosition='right'
        icon={<ChevronDownIcon aria-hidden />}
      >
        {tittel}
      </Button>
      {open && (
        <div className='bg-surface-default absolute top-full left-0 z-50 mt-1 rounded-md border p-4 shadow-md'>
          {children}
        </div>
      )}
    </div>
  );
};

export default FilterKomponent;
