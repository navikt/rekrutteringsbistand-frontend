'use client';
import { Chips } from '@navikt/ds-react';
import { useRouter, useSearchParams } from 'next/navigation';
const TømFiltre = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  // Ignore portefolje parameter
  const params = new URLSearchParams(searchParams.toString());
  params.delete('portefolje');
  const harFiltre = params.toString();
  // const harFiltre = searchParams.toString();

  const handleClearAll = () => {
    const newSearchParams = new URLSearchParams();
    if (searchParams.has('portefolje')) {
      newSearchParams.set('portefolje', searchParams.get('portefolje')!);
    }
    router.push(`?${newSearchParams.toString()}`);
  };

  //TODO Tøm filtre

  return (
    <Chips.Removable
      className='text-nowrap'
      disabled={!harFiltre}
      onClick={handleClearAll}
    >
      Tøm filtre
    </Chips.Removable>
  );
};

export default TømFiltre;
