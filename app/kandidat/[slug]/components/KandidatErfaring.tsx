import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatContext } from '../KandidatContext';
import TidslinjeFelt from './TidslinjeFelt';

export interface KandidatErfaringProps {
  children?: React.ReactNode | undefined;
}

const KandidatErfaring: React.FC<KandidatErfaringProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();
  return (
    <>
      <Heading size='large'>Erfaring</Heading>
      <div>
        <Heading size='medium'>Yrkeserfaring</Heading>
        <div className='my-2'>
          {kandidatData.yrkeserfaring && kandidatData.yrkeserfaring.length > 0
            ? kandidatData.yrkeserfaring.map((erfaring) => (
                <TidslinjeFelt
                  key={erfaring?.fraDato}
                  startDate={erfaring?.fraDato}
                  endDate={erfaring?.tilDato}
                  title={erfaring?.stillingstittel}
                  subtitle={erfaring?.beskrivelse}
                />
              ))
            : 'Ingen yrkeserfaring'}
        </div>
        <Heading size='medium'>Annen erfaring</Heading>
      </div>
    </>
  );
};

export default KandidatErfaring;
