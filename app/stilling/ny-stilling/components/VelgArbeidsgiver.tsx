import { Alert, UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  ArbeidsgiverDTO,
  useFinnArbeidsgiver,
} from '../../../api/pam-search/underenhet/useArbeidsgiver';

export interface IVelgArbeidsgiver {
  children?: React.ReactNode | undefined;
  setArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO) => void;
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
              (arbeidsgiver) =>
                `${arbeidsgiver.navn} - ${arbeidsgiver.organisasjonsnummer}`,
            ) ?? []
          }
          shouldAutocomplete={true}
          onChange={(verdi) => setSøkeord(verdi)}
          onToggleSelected={(valg) => {
            const orgnr = valg.split(' - ')[1];
            const selectedArbeidsgiver = data?.find(
              (arbeidsgiver) => arbeidsgiver.organisasjonsnummer === orgnr,
            );
            if (selectedArbeidsgiver) {
              setArbeidsgiver(selectedArbeidsgiver);
            }
          }}
        />
      </form>
      {error && (
        <Alert className='mt-8' variant='error'>
          {JSON.stringify(error)}
        </Alert>
      )}
    </React.Fragment>
  );
};

export default VelgArbeidsgiver;
