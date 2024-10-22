'use client';
import { TrashIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter, useSearchParams } from 'next/navigation';
const TømFiltre = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  // Ignore portefolje parameter
  // const params = new URLSearchParams(searchParams.toString());
  // params.delete('portefolje');
  // const harFiltre = params.toString();
  const harFiltre = searchParams.toString();

  const handleClearAll = () => {
    const newSearchParams = new URLSearchParams();
    // if (searchParams.has('portefolje')) {
    //   newSearchParams.set('portefolje', searchParams.get('portefolje')!);
    // }
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div>
      <Button
        disabled={!harFiltre}
        icon={<TrashIcon aria-hidden />}
        variant='tertiary'
        onClick={handleClearAll}
      >
        Tøm filtre
      </Button>
    </div>
  );
};

export default TømFiltre;
