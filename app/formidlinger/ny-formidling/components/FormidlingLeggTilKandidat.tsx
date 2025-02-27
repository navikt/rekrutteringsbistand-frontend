import { BodyLong, Box, ErrorMessage, Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '../../../components/legg-til-kandidat/LeggTilKandidater';
import StegNavigering from '../../../stilling/[stillingsId]/rediger/components/StegNavigering';
import { FormidlingDataForm } from '../redigerFormidlingFormType';

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
    getValues,
  } = useFormContext<FormidlingDataForm>();

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValue(
      'omKandidatene',
      valgteKandidater?.map((k) => ({
        fnr: k.fødselsnummer,
        navn: {
          fornavn: k.fornavn,
          etternavn: k.etternavn,
          kilde: k.kilde,
        },
      })),
    );
    const isValid = await trigger('omKandidatene', { shouldFocus: true });
    if (isValid) {
      nesteSteg();
    }
  };

  const omKandidatene = getValues('omKandidatene');
  const initielValgt = omKandidatene?.map((k) => ({
    fødselsnummer: k.fnr,
    fornavn: k.navn.fornavn || '',
    etternavn: k.navn.etternavn || '',
    kilde: k.navn.kilde,
  }));

  return (
    <Box.New className='space-y-4'>
      <Heading size='large'>Legg til kandidater</Heading>
      <BodyLong>Vi må vite hvilke kandidater du ønsker å formidle</BodyLong>
      <form onSubmit={handleStepSubmit}>
        <div className='flex flex-col space-y-8'>
          <LeggTilKandidater
            initielleKandidater={initielValgt}
            synlighetSomModal
            callBack={(kandidater) => {
              setValgteKandidater(kandidater);
            }}
          />
          {errors.omKandidatene && (
            <ErrorMessage>{errors.omKandidatene.message}</ErrorMessage>
          )}
          <StegNavigering stegNummer={1} forrigeSteg={forrigeSteg} />
        </div>
      </form>
    </Box.New>
  );
};

export default FormidlingLeggTilKandidat;
