import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { byggStandardsokQuery } from '@/app/stilling/_ui/standardsøk/standardSokUtils';
import { Switch } from '@navikt/ds-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function MittStandardsøk() {
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { query: searchString } = byggStandardsokQuery(searchParams);
  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  return (
    <div>
      <Switch
        checked={brukerStandardSøk}
        size='small'
        onChange={(e) => {
          if (!brukerStandardSøk) {
            router.push('/stilling?brukStandardsok=true');
          }
        }}
      >
        Mitt standardsøk
      </Switch>
    </div>
  );
}
