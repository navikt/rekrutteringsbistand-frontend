'use client';

import { formidlingKolonner } from './FormidlingRad';
import {
  FormidlingSortering,
  FormidlingSorteringsretning,
} from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import {
  ArrowsUpDownIcon,
  SortDownIcon,
  SortUpIcon,
} from '@navikt/aksel-icons';
import { Button, Label } from '@navikt/ds-react';
import { FC, ReactNode } from 'react';

const sortIkon = (aktiv: boolean, retning: FormidlingSorteringsretning) => {
  if (!aktiv) return <ArrowsUpDownIcon aria-hidden />;
  return retning === 'asc' ? (
    <SortUpIcon aria-hidden />
  ) : (
    <SortDownIcon aria-hidden />
  );
};

interface SortHeaderProps {
  sorteringsfelt: FormidlingSortering;
  sorteringsretning: FormidlingSorteringsretning;
  onSorter: (felt: FormidlingSortering) => void;
}

interface SorteringsKnappProps extends SortHeaderProps {
  felt: FormidlingSortering;
  className: string;
  children: ReactNode;
}

const SorteringsKnapp: FC<SorteringsKnappProps> = ({
  felt,
  className,
  children,
  sorteringsfelt,
  sorteringsretning,
  onSorter,
}) => {
  const aktiv = sorteringsfelt === felt;
  return (
    <Button
      iconPosition='right'
      icon={sortIkon(aktiv, sorteringsretning)}
      className={className}
      variant='tertiary'
      size='small'
      aria-pressed={aktiv}
      onClick={() => onSorter(felt)}
    >
      {children}
    </Button>
  );
};

const FormidlingSortHeader: FC<SortHeaderProps> = (props) => (
  <div className='mx-1 flex items-center gap-3 border-b px-5 pb-2'>
    <div className='w-6 shrink-0' aria-hidden />
    <div className='flex flex-1 flex-wrap items-center gap-3'>
      <SorteringsKnapp
        felt='tidspunkt'
        className={`${formidlingKolonner.formidlet} justify-start p-0`}
        {...props}
      >
        Formidlet
      </SorteringsKnapp>
      <SorteringsKnapp
        felt='jobbsoker'
        className={`${formidlingKolonner.navn} justify-start p-0`}
        {...props}
      >
        Jobbsøker
      </SorteringsKnapp>
      <SorteringsKnapp
        felt='arbeidsgiver'
        className={`${formidlingKolonner.arbeidsgiver} justify-start p-0`}
        {...props}
      >
        Arbeidsgiver
      </SorteringsKnapp>
      <Label as='span' size='small' className={formidlingKolonner.yrkestittel}>
        Yrkestittel
      </Label>
      <span className={formidlingKolonner.handlinger} aria-hidden />
    </div>
  </div>
);

export default FormidlingSortHeader;
