'use client';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';
import { storForbokstav } from '../../../kandidatsok/util';
import { useStillingsSøk } from '../../StillingsSøkContext';

export enum StillingsStatus {
  Publisert = 'publisert',
  Utløpt = 'utløpt',
  Stoppet = 'stoppet',
}

const StatusFilter: React.FC = () => {
  const { statuser, setStatuser } = useStillingsSøk();

  return (
    <React.Fragment>
      <CheckboxGroup
        legend='Status'
        hideLegend={false}
        onChange={setStatuser}
        value={statuser ? statuser : undefined}
      >
        <Checkbox value={StillingsStatus.Publisert}>
          {storForbokstav(StillingsStatus.Publisert)}
        </Checkbox>
        <Checkbox value={StillingsStatus.Utløpt}>
          {storForbokstav(StillingsStatus.Utløpt)}
        </Checkbox>
        <Checkbox value={StillingsStatus.Stoppet}>
          {storForbokstav(StillingsStatus.Stoppet)}
        </Checkbox>
      </CheckboxGroup>
    </React.Fragment>
  );
};

export default StatusFilter;
