import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FilterIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import * as React from 'react';

export interface AlleFilterKomponentProps {
  children?: React.ReactNode | undefined;
}

const AlleFilterKomponent: React.FC<AlleFilterKomponentProps> = ({
  children,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='small' variant='tertiary' icon={<FilterIcon />}>
          Filtrer
        </Button>
      </SheetTrigger>

      <SheetContent className='flex flex-col bg-sidebar'>
        <SheetHeader className='flex-shrink-0'>
          <SheetTitle>Filtrer</SheetTitle>
        </SheetHeader>
        <div className='flex-grow overflow-y-auto p-4'>
          <div className='flex flex-col gap-4'>{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AlleFilterKomponent;
