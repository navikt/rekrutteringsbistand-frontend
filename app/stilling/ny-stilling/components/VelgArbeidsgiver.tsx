import { Alert, FormSummary, UNSAFE_Combobox } from '@navikt/ds-react';
import * as React from 'react';
import {
  ArbeidsgiverDTO,
  useFinnArbeidsgiver,
} from '../../../api/pam-search/underenhet/useArbeidsgiver';

export interface IVelgArbeidsgiver {
  children?: React.ReactNode | undefined;
  arbeidsgiverCallback: (arbeidsgiver: ArbeidsgiverDTO) => void;
}

const VelgArbeidsgiver: React.FC<IVelgArbeidsgiver> = ({
  arbeidsgiverCallback,
}) => {
  const [søkeOrd, setSøkeord] = React.useState<string>('');
  const { isLoading, error, data } = useFinnArbeidsgiver(søkeOrd);
  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  React.useEffect(() => {
    if (arbeidsgiver) {
      arbeidsgiverCallback(arbeidsgiver);
    }
  }, [arbeidsgiver, arbeidsgiverCallback]);

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
        {arbeidsgiver && (
          <FormSummary className='mt-4'>
            <FormSummary.Header>
              <FormSummary.Heading level='2'>
                Valgt arbeidsgiver
              </FormSummary.Heading>
            </FormSummary.Header>

            <FormSummary.Answers>
              <FormSummary.Answer>
                <FormSummary.Label>Navn</FormSummary.Label>
                <FormSummary.Value>{arbeidsgiver?.navn}</FormSummary.Value>
              </FormSummary.Answer>

              <FormSummary.Answer>
                <FormSummary.Label>Organisasjonsnummer</FormSummary.Label>
                <FormSummary.Value>
                  {arbeidsgiver?.organisasjonsnummer}
                </FormSummary.Value>
              </FormSummary.Answer>

              <FormSummary.Answer>
                <FormSummary.Label>Adresse</FormSummary.Label>
                <FormSummary.Value>
                  {arbeidsgiver.adresse.adresse}
                </FormSummary.Value>
                <FormSummary.Value>
                  {arbeidsgiver?.adresse.postnummer ?? '-'},{' '}
                  {arbeidsgiver?.adresse.poststed ?? '-'}
                </FormSummary.Value>

                <FormSummary.Value>
                  {arbeidsgiver.adresse.kommune}
                </FormSummary.Value>
              </FormSummary.Answer>
            </FormSummary.Answers>
          </FormSummary>
        )}
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
