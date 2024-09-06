import { UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import { useFinnArbeidsgiver } from '../../../api/stilling/finn-arbeidsgiver/useFinnArbeidsgiver';

export interface IVelgArbeidsgiver {
  children?: React.ReactNode | undefined;
  setArbeidsgiver: (arbeidsgiver: string) => void;
}

const VelgArbeidsgiver: React.FC<IVelgArbeidsgiver> = ({ children }) => {
  const [muligeValg, setMuligeValg] = React.useState<string[]>([]);
  const [søkeOrd, setSøkeord] = React.useState<string>('');
  const { isLoading, error, data } = useFinnArbeidsgiver(søkeOrd);
  return (
    <React.Fragment>
      <form role='search'>
        <UNSAFE_Combobox
          isLoading={isLoading}
          label='Arbeidsgivers navn eller virksomhetsnummer'
          options={muligeValg}
          shouldAutocomplete={true}
          onChange={(e) => setSøkeord(e?.target.value ?? '')}
          onSelect={(valg) => console.log(valg)}
        />
      </form>
    </React.Fragment>
  );
};

export default VelgArbeidsgiver;
