import {
  MagnifyingGlassIcon,
  SortDownIcon,
  SortUpIcon,
} from '@navikt/aksel-icons';
import { ToggleGroup } from '@navikt/ds-react';
import * as React from 'react';
import { useStillingsSøkFilter } from '../StillingsSøkContext';

export enum StillingsSøkSorteringTyper {
  MestRelevant = 'mestRelevant',
  Publiseringsdato = 'publiseringsdato',
  Utløpsdato = 'utløpsdato',
}

const StillingsSøkSortering: React.FC = () => {
  const filter = useStillingsSøkFilter();
  return (
    <ToggleGroup defaultValue={filter.sortering} onChange={filter.setSortering}>
      <ToggleGroup.Item
        value={StillingsSøkSorteringTyper.Publiseringsdato}
        icon={<SortDownIcon aria-hidden />}
        label='Publiseringsdato'
      />
      <ToggleGroup.Item
        value={StillingsSøkSorteringTyper.Utløpsdato}
        icon={<SortUpIcon aria-hidden />}
        label='Utløpsdato'
      />
      <ToggleGroup.Item
        value={StillingsSøkSorteringTyper.MestRelevant}
        icon={<MagnifyingGlassIcon aria-hidden />}
        label='Mest relevant'
      />
    </ToggleGroup>
  );
  {
    /* <Select
        label='Sorter'
        onChange={(e) => filter.setSortering(e.target.value)}
      >
        <option value={StillingsSøkSorteringTyper.Publiseringsdato}>
          Publiseringsdato
        </option>
        <option value={StillingsSøkSorteringTyper.Utløpsdato}>
          Utløpsdato
        </option>
        <option value={StillingsSøkSorteringTyper.MestRelevant}>
          Mest relevant
        </option>
      </Select> */
  }
};

export default StillingsSøkSortering;
