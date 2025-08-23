import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Radio, RadioGroup } from '@navikt/ds-react';
import * as React from 'react';

export enum StillingsSøkSorteringTyper {
  MestRelevant = 'mestRelevant',
  Publiseringsdato = 'publiseringsdato',
  Utløpsdato = 'utløpsdato',
}

const StillingsSøkSortering: React.FC = () => {
  const filter = useStillingsSøkFilter();
  const handleChange = (value: string) => {
    filter.setSortering(value);
  };
  return (
    <RadioGroup
      legend='Sorter'
      value={filter.sortering}
      onChange={handleChange}
    >
      <Radio value={StillingsSøkSorteringTyper.Publiseringsdato}>
        Publiseringsdato
      </Radio>
      <Radio value={StillingsSøkSorteringTyper.Utløpsdato}>Utløpsdato</Radio>
      <Radio value={StillingsSøkSorteringTyper.MestRelevant}>
        Mest relevant
      </Radio>
    </RadioGroup>
  );
};

export default StillingsSøkSortering;
