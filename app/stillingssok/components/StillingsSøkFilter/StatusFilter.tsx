'use client';

import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { storForbokstav } from '../../../kandidatsok/util';
import { parseAsArray, serializeArray } from '../../../../util/array';

export enum StillingsStatus {
  Publisert = 'publisert',
  Utløpt = 'utløpt',
  Stoppet = 'stoppet',
}

const StatusFilter: React.FC = () => {
  const [status, setStatus] = useQueryState('status', {
    parse: parseAsArray,
    serialize: serializeArray,
  });

  const setFilter = (v: string[]) => {
    if (v.length === 0) {
      setStatus(null);
    }
    setStatus(v);
  };
  return (
    <React.Fragment>
      <CheckboxGroup
        legend='Status'
        hideLegend={false}
        onChange={setFilter}
        value={status || []}
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
