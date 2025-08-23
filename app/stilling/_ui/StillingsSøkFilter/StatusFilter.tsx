'use client';

import { storForbokstav } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';

export enum StillingsStatusTyper {
  Publisert = 'publisert',
  Utløpt = 'utløpt',
  Stoppet = 'stoppet',
}

const StatusFilter: React.FC = () => {
  const { statuser, setStatuser } = useStillingsSøkFilter();
  return (
    <CheckboxGroup
      legend='Status'
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
};

export default StatusFilter;
