import { BodyLong, ErrorMessage, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '../../../../components/legg-til-kandidat/LeggTilKandidater';
import StegNavigering from '../../../../stilling/[stillingsId]/rediger/components/StegNavigering';
import { FormidlingFormSchemaDTO } from '../redigerFormidlingFormType';

export interface FormidlingLeggTilKandidatProps {
  nesteSteg: () => void;
  forrigeSteg: () => void;
}

const FormidlingLeggTilKandidat: React.FC<FormidlingLeggTilKandidatProps> = ({
  nesteSteg,
  forrigeSteg,
}) => {
  const [valgteKandidater, setValgteKandidater] = React.useState<
    ValgtKandidatProp[]
  >([]);

  const {
    trigger,
    formState: { errors },
    setValue,
  } = useFormContext<FormidlingFormSchemaDTO>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValue(
      'omKandiatene',
      valgteKandidater?.map((k) => ({
        fnr: k.fødselsnummer,
        navn: {
          fornavn: k.fornavn,
          etternavn: k.etternavn,
          kilde: k.kilde,
        },
      })),
    );
    const isValid = await trigger('omKandiatene', { shouldFocus: true });
    if (isValid) {
      nesteSteg();
    }
  };
  return (
    <React.Fragment>
      <Heading size='large'>Om kandidatene</Heading>
      <BodyLong>Vi må vite hvilke kandidater du ønsker å formidle</BodyLong>
      <form onSubmit={handleStepSubmit}>
        <div className='flex flex-col space-y-8'>
          <LeggTilKandidater
            synlighetSomModal
            måHaAktørId
            callBack={(kandidater) => {
              setValgteKandidater(kandidater);
            }}
          />
          {errors.omKandiatene && (
            <ErrorMessage>{errors.omKandiatene.message}</ErrorMessage>
          )}
          <StegNavigering stegNummer={1} forrigeSteg={forrigeSteg} />
        </div>
      </form>
    </React.Fragment>
  );
};

export default FormidlingLeggTilKandidat;
