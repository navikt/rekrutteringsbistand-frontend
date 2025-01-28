import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const StandardsøkKnapp: React.FC = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Button
        variant='secondary'
        className='w-full'
        onClick={() => {
          router.replace('?brukStandard=true', { scroll: false });
        }}
      >
        Bruk mitt standardsøk
      </Button>
    </React.Fragment>
  );
};

export default StandardsøkKnapp;
