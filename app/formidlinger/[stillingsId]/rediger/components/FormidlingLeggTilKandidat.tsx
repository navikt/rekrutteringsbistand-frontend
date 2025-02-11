import { BodyLong, ErrorMessage, Heading } from '@navikt/ds-react';
import * as React from 'react';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '../../../../components/legg-til-kandidat/LeggTilKandidater';
import StegNavigering from '../../../../stilling/[stillingsId]/rediger/components/StegNavigering';

export interface FormidlingLeggTilKandidatProps {
  children?: React.ReactNode | undefined;
}

const FormidlingLeggTilKandidat: React.FC<FormidlingLeggTilKandidatProps> = ({
  children,
}) => {
  const [feilmelding, setFeilmelding] = React.useState('');
  const [valgteKandidater, setValgteKandidater] = React.useState<
    ValgtKandidatProp[]
  >([]);

  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (valgteKandidater.length === 0) {
      setFeilmelding('Du må velge minst en kandidat');
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
          {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
          <StegNavigering stegNummer={1} forrigeSteg={() => {}} />
        </div>
      </form>
    </React.Fragment>
  );
};

export default FormidlingLeggTilKandidat;
