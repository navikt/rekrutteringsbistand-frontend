import {
  ArbeidsgiverDTO,
  useFinnArbeidsgiver,
} from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import Feilmelding from '@/components/feilhåndtering/Feilmelding';
import { UNSAFE_Combobox } from '@navikt/ds-react';
import { FC, Fragment, useEffect, useState, type ReactNode } from 'react';

export interface IVelgArbeidsgiver {
  children?: ReactNode | undefined;
  arbeidsgiverCallback: (arbeidsgiver: ArbeidsgiverDTO) => void;
  valgtArbeidsgiver?: ArbeidsgiverDTO | null;
  labelText?: string;
  placeholder?: string;
}
const VelgArbeidsgiver: FC<IVelgArbeidsgiver> = ({
  arbeidsgiverCallback,
  valgtArbeidsgiver,
  labelText,
  placeholder,
}) => {
  const [søkeOrd, setSøkeord] = useState<string>('');
  const { isLoading, error, data } = useFinnArbeidsgiver(søkeOrd);
  const [arbeidsgiver, setArbeidsgiver] = useState<ArbeidsgiverDTO | null>(
    valgtArbeidsgiver ?? null,
  );
  useEffect(() => {
    if (arbeidsgiver) {
      arbeidsgiverCallback(arbeidsgiver);
    }
  }, [arbeidsgiver, arbeidsgiverCallback]);

  return (
    <Fragment>
      <div role='search'>
        <UNSAFE_Combobox
          isLoading={isLoading}
          label={labelText ?? 'Arbeidsgivers navn eller organisasjonsnummer'}
          options={
            data?.map(
              (arbeidsgiver) =>
                `${arbeidsgiver.navn} - ${arbeidsgiver.organisasjonsnummer}`,
            ) ?? []
          }
          shouldAutocomplete={true}
          toggleListButton={false}
          onChange={(verdi) => setSøkeord(verdi)}
          onToggleSelected={(valg) => {
            const orgnr = valg.split(' - ').at(-1);
            const selectedArbeidsgiver = data?.find(
              (arbeidsgiver) => arbeidsgiver.organisasjonsnummer === orgnr,
            );
            if (selectedArbeidsgiver) {
              setArbeidsgiver(selectedArbeidsgiver);
            }
          }}
          placeholder={placeholder}
          shouldShowSelectedOptions={false}
        />
      </div>
      {error && (
        <div className='mt-16' onMouseDown={(e) => e.preventDefault()}>
          <Feilmelding error={error} />
        </div>
      )}
    </Fragment>
  );
};

export default VelgArbeidsgiver;
