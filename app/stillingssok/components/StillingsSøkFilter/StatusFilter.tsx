'use client';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';
import { storForbokstav } from '../../../kandidatsok/util';
import { useStillingsSøkFilter } from '../../StillingsSøkContext';

export enum StillingsStatusTyper {
  Publisert = 'publisert',
  Utløpt = 'utløpt',
  Stoppet = 'stoppet',
}

const StatusFilter: React.FC = () => {
  const { statuser, setStatuser } = useStillingsSøkFilter();

  return (
    <React.Fragment>
      <CheckboxGroup
        legend='Status'
        hideLegend={false}
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
    </React.Fragment>
  );
};

export default StatusFilter;
