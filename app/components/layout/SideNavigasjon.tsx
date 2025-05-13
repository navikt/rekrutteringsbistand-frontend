import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface SideNavigasjonProps {
  tilbakeurl?: string;
}

const SideNavigasjon: React.FC<SideNavigasjonProps> = ({ tilbakeurl }) => {
  const router = useRouter();
  return (
    <div className='w-full items-center justify-between  pt-2  sticky top-0 z-10 bg-[var(--ax-bg-default)]'>
      <Button
        size='small'
        icon={<ArrowLeftIcon />}
        onClick={
          tilbakeurl ? () => router.push(tilbakeurl) : () => router.back()
        }
        variant='tertiary'
      >
        Tilbake
      </Button>
    </div>
  );
};

export default SideNavigasjon;
