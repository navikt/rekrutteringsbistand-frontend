import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';

export default function MittStandardsøk() {
  const router = useRouter();

  return (
    <Button
      size='small'
      onClick={() => {
        router.push('/stilling?brukStandardsok=true');
      }}
    >
      Bruk standardsøk
    </Button>
  );
}
