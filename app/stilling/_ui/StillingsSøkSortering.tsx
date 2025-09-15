import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { Radio, RadioGroup } from '@navikt/ds-react';

export enum StillingsSøkSorteringTyper {
  MestRelevant = 'mestRelevant',
  Publiseringsdato = 'publiseringsdato',
  Utløpsdato = 'utløpsdato',
}

export interface StillingsSøkSorteringProps {
  hideLegend?: boolean;
}

export default function StillingsSøkSortering({
  hideLegend,
}: StillingsSøkSorteringProps) {
  const filter = useStillingsSøkFilter();
  const handleChange = (value: string) => {
    filter.setSortering(value);
  };
  return (
    <RadioGroup
      size='small'
      hideLegend={hideLegend}
      legend='Sorter'
      value={filter.sortering}
      onChange={handleChange}
      className='pb-2'
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
}
