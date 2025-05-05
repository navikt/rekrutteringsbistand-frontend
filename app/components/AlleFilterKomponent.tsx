import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';
import { FilterIcon } from '@navikt/aksel-icons';
import * as React from 'react';

export interface AlleFilterKomponentProps {
  children?: React.ReactNode | undefined;
}

const AlleFilterKomponent: React.FC<AlleFilterKomponentProps> = ({
  children,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className='flex gap-2 aksel-button aksel-button--tertiary aksel-button--medium'>
          <FilterIcon />
          Alle filtre
        </div>
      </SheetTrigger>
      <SheetContent className='flex flex-col'>
        <SheetHeader className='flex-shrink-0'>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <div className='flex-grow overflow-y-auto p-4'>
          <div className='flex flex-col gap-4'>{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AlleFilterKomponent;
