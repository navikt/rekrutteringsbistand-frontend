import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatContext } from '../../KandidatContext';
import TidslinjeFelt from './TidslinjeFelt';

export interface KandidatErfaringProps {
  children?: React.ReactNode | undefined;
}

const KandidatErfaring: React.FC<KandidatErfaringProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();
  return (
    <>
      <Heading size='medium'>Erfaring</Heading>
      <div>
        {kandidatData.yrkeserfaring &&
          kandidatData.yrkeserfaring.length > 0 && (
            <>
              <Heading size='small' textColor='subtle'>
                Yrkeserfaring
              </Heading>
              <div className='my-2'>
                {kandidatData.yrkeserfaring.map((erfaring) => (
                  <TidslinjeFelt
                    key={erfaring?.fraDato}
                    startDate={erfaring?.fraDato}
                    endDate={erfaring?.tilDato}
                    title={erfaring?.stillingstittel}
                    subtitle={erfaring?.beskrivelse}
                  />
                ))}
              </div>
            </>
          )}
        {kandidatData.annenerfaringObj &&
          kandidatData.annenerfaringObj.length > 0 && (
            <>
              <Heading size='small' textColor='subtle'>
                Annen erfaring
              </Heading>
              <div className='my-2'>
                {/* {kandidatData.annenerfaringObj.map((erfaring) => (
                  <TidslinjeFelt
                    key={erfaring?.fraDato}
                    startDate={erfaring?.fraDato}
                    endDate={erfaring?.tilDato}
                    title={erfaring?.stillingstittel}
                    subtitle={erfaring?.beskrivelse}
                  />
                ))} */}
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default KandidatErfaring;
