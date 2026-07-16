'use client';

import { useJobbsøkerSøkContext } from './filter/JobbsøkerSøkContext';
import {
  JobbsøkerSorteringsfelt,
  JobbsøkerSorteringsretning,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import {
  ArrowsUpDownIcon,
  SortDownIcon,
  SortUpIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

const sortIcon = (asc: boolean, desc: boolean) => {
  if (asc) return <SortUpIcon />;
  if (desc) return <SortDownIcon />;
  return <ArrowsUpDownIcon />;
};

interface SortKnappProps {
  felt: JobbsøkerSorteringsfelt;
  className?: string;
  children: React.ReactNode;
}

function SortKnapp({ felt, className, children }: SortKnappProps) {
  const { sorteringsfelt, sorteringsretning, setSortering } =
    useJobbsøkerSøkContext();
  const aktiv = sorteringsfelt === felt;
  return (
    <Button
      iconPosition='right'
      icon={sortIcon(
        aktiv && sorteringsretning === JobbsøkerSorteringsretning.ASC,
        aktiv && sorteringsretning === JobbsøkerSorteringsretning.DESC,
      )}
      className={className}
      variant='tertiary'
      size='small'
      onClick={() => {
        if (aktiv) {
          setSortering(
            felt,
            sorteringsretning === JobbsøkerSorteringsretning.ASC
              ? JobbsøkerSorteringsretning.DESC
              : JobbsøkerSorteringsretning.ASC,
          );
        } else {
          setSortering(felt);
        }
      }}
    >
      {children}
    </Button>
  );
}

export default function JobbsøkerSortHeader() {
  return (
    <div className='flex w-full flex-row px-6 pb-1'>
      <SortKnapp
        felt={JobbsøkerSorteringsfelt.NAVN}
        className={'flex basis-1/4 justify-start'}
      >
        Navn
      </SortKnapp>
      <SortKnapp felt={JobbsøkerSorteringsfelt.ALDER} className={'basis-1/4'}>
        Alder
      </SortKnapp>
      <SortKnapp
        felt={JobbsøkerSorteringsfelt.LAGT_TIL}
        className={'basis-1/4'}
      >
        Lagt til
      </SortKnapp>
      <SortKnapp
        felt={JobbsøkerSorteringsfelt.STATUS}
        className={'flex basis-1/4 justify-end'}
      >
        Status
      </SortKnapp>
    </div>
  );
}
