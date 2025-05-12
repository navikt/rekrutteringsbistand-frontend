import { useKandidatContext } from '../../KandidatContext';
import TidslinjeFelt from './TidslinjeFelt';
import { Heading } from '@navikt/ds-react';
import * as React from 'react';

const KandidatErfaring: React.FC = () => {
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
                {kandidatData.yrkeserfaring
                  .slice() // Create a copy of the array to avoid mutating the original
                  .sort((a, b) => {
                    const dateA = a.fraDato ? new Date(a.fraDato).getTime() : 0;
                    const dateB = b.fraDato ? new Date(b.fraDato).getTime() : 0;
                    return dateB - dateA;
                  })
                  ?.map((erfaring, index) => (
                    <TidslinjeFelt
                      key={index}
                      startDate={erfaring?.fraDato}
                      endDate={erfaring?.tilDato}
                      title={
                        erfaring?.stillingstittel ??
                        erfaring?.styrkKodeStillingstittel ??
                        erfaring.alternativStillingstittel
                      }
                      subtitle={erfaring?.arbeidsgiver}
                      description={erfaring?.beskrivelse}
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
                {kandidatData.annenerfaringObj
                  .slice() // Create a copy of the array to avoid mutating the original
                  .sort((a, b) => {
                    const dateA = a.fraDato ? new Date(a.fraDato).getTime() : 0;
                    const dateB = b.fraDato ? new Date(b.fraDato).getTime() : 0;
                    return dateB - dateA; // Descending order (newest first)
                  })
                  ?.map((erfaring, index) => (
                    <TidslinjeFelt
                      key={index}
                      startDate={erfaring?.fraDato}
                      endDate={erfaring?.tilDato}
                      subtitle={erfaring?.beskrivelse}
                    />
                  ))}
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default KandidatErfaring;
