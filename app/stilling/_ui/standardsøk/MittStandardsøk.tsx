import { useUseBrukerStandardSøk } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { byggStandardsokQuery } from '@/app/stilling/_ui/standardsøk/standardSokUtils';
import { Switch } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';

export default function MittStandardsøk() {
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchParams = useSearchParams();

  const { query: searchString } = byggStandardsokQuery(searchParams);
  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  return (
    <div>
      <Switch checked={brukerStandardSøk} disabled size='small'>
        Mitt standardsøk
      </Switch>
    </div>
  );
}
