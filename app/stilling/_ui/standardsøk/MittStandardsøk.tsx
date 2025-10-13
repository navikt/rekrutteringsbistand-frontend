import LagreStandardsøk from '@/app/stilling/_ui/standardsøk/LagreStandardsøk';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';

export default function MittStandardsøk() {
  const router = useRouter();

  return (
    <div className='flex flex-nowrap items-center'>
      <div>
        <Button
          size='xsmall'
          style={{ whiteSpace: 'nowrap' }}
          onClick={() => {
            router.push('/stilling?brukStandardsok=true');
          }}
        >
          Bruk standardsøk
        </Button>
      </div>
      <LagreStandardsøk />
    </div>
  );
}
