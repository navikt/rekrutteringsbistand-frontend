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
  id?: string;
  labelText?: string;
  description?: string;
  error?: ReactNode;
}
const VelgArbeidsgiver: FC<IVelgArbeidsgiver> = ({
  arbeidsgiverCallback,
  valgtArbeidsgiver,
  id,
  labelText,
  description,
  error,
}) => {
  const [søkeOrd, setSøkeord] = useState<string>('');
  const { isLoading, error: søkefeil, data } = useFinnArbeidsgiver(søkeOrd);
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
          id={id}
          isLoading={isLoading}
          label={labelText ?? 'Arbeidsgivers navn eller organisasjonsnummer'}
          description={description}
          options={
            data?.map(
              (arbeidsgiver) =>
                `${arbeidsgiver.navn} - ${arbeidsgiver.organisasjonsnummer}`,
            ) ?? []
          }
          shouldAutocomplete={true}
          toggleListButton={false}
          onChange={(verdi) => setSøkeord(verdi ?? '')}
          onToggleSelected={(valg) => {
            const orgnr = valg.split(' - ').at(-1);
            const selectedArbeidsgiver = data?.find(
              (arbeidsgiver) => arbeidsgiver.organisasjonsnummer === orgnr,
            );
            if (selectedArbeidsgiver) {
              setArbeidsgiver(selectedArbeidsgiver);
            }
          }}
          shouldShowSelectedOptions={false}
          error={error}
        />
      </div>
      {søkefeil && (
        <div className='mt-16' onMouseDown={(e) => e.preventDefault()}>
          <Feilmelding error={søkefeil} />
        </div>
      )}
    </Fragment>
  );
};

export default VelgArbeidsgiver;
