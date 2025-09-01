'use client';

import { storForbokstav } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export enum StillingsStatusTyper {
  Publisert = 'publisert',
  Utløpt = 'utløpt',
  Stoppet = 'stoppet',
}

export interface StatusFilterProps {
  hideLegend?: boolean;
}

export default function StatusFilter({ hideLegend }: StatusFilterProps) {
  const { statuser, setStatuser } = useStillingsSøkFilter();
  return (
    <CheckboxGroup
      hideLegend={hideLegend}
      legend='Status'
      size='small'
      onChange={setStatuser}
      value={statuser ? statuser : undefined}
    >
      <Checkbox value={StillingsStatusTyper.Publisert}>
        {storForbokstav(StillingsStatusTyper.Publisert)}
      </Checkbox>
      <Checkbox value={StillingsStatusTyper.Utløpt}>
        {storForbokstav(StillingsStatusTyper.Utløpt)}
      </Checkbox>
      <Checkbox value={StillingsStatusTyper.Stoppet}>
        {storForbokstav(StillingsStatusTyper.Stoppet)}
      </Checkbox>
    </CheckboxGroup>
  );
}
