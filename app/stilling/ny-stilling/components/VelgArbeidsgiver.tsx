import { Alert, UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  FinnArbeidsgiverDTO,
  useFinnArbeidsgiver,
} from '../../../api/stilling/finn-arbeidsgiver/useFinnArbeidsgiver';

export interface IVelgArbeidsgiver {
  children?: React.ReactNode | undefined;
  setArbeidsgiver: (arbeidsgiver: FinnArbeidsgiverDTO) => void;
}

const VelgArbeidsgiver: React.FC<IVelgArbeidsgiver> = ({ setArbeidsgiver }) => {
  const [søkeOrd, setSøkeord] = React.useState<string>('');
  const { isLoading, error, data } = useFinnArbeidsgiver(søkeOrd);

  return (
    <React.Fragment>
      <form role='search'>
        <UNSAFE_Combobox
          isLoading={isLoading}
          label='Arbeidsgivers navn eller organisasjonsnummer'
          options={
            data?.map(
              (arbeidsgiver) => `${arbeidsgiver.name} - ${arbeidsgiver.orgnr}`,
            ) ?? []
          }
          shouldAutocomplete={true}
          onChange={(verdi) => setSøkeord(verdi)}
          onToggleSelected={(valg) => {
            const orgnr = valg.split(' - ')[1];
            const selectedArbeidsgiver = data?.find(
              (arbeidsgiver) => arbeidsgiver.orgnr === orgnr,
            );
            if (selectedArbeidsgiver) {
              setArbeidsgiver(selectedArbeidsgiver);
            }
          }}
        />
      </form>
      {error && <Alert variant='error'>{JSON.stringify(error)}</Alert>}
    </React.Fragment>
  );
};

export default VelgArbeidsgiver;
