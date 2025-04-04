'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import LeggTilJobbsøkerKnapp from '../LeggTilJobbsøkerKnapp';
import JobbsøkerKort from './components/JobbsøkerKort';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

const Jobbsøkere = () => {
  console.log('[DEBUG] Jobbsøkere kjører som klient – tidspunkt:', new Date());

  React.useEffect(() => {
    console.log('[DEBUG] Jobbsøkere useEffect – kjører kun på klient');
  }, []);

  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const {
    data: jobbsøkere,
    isLoading,
    error,
    refresh,
  } = useJobbsøkere(rekrutteringstreffId);

  if (isLoading) {
    return <BodyShort>Laster jobbsøkere...</BodyShort>;
  }

  if (error) {
    return <BodyShort>Kunne ikke hente jobbsøkere</BodyShort>;
  }

  return (
    <div className='p-4 flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <LeggTilJobbsøkerKnapp onNyJobbsøkerLagtTil={refresh} />
      </div>

      {jobbsøkere && jobbsøkere.length === 0 ? (
        <BodyShort>Ingen jobbsøkere lagt til</BodyShort>
      ) : (
        <ul>
          {jobbsøkere?.map((j, index) => (
            <li key={index}>
              <JobbsøkerKort
                fornavn={j.fornavn}
                etternavn={j.etternavn}
                fødselsnummer={j.fødselsnummer}
                navKontor='Nav Grorud' // TODO: Bytt når backend støtter det
                veileder={{
                  navn: 'Veileder Navn',
                  navIdent: 'Z123456',
                  navKontor: 'Nav Grorud',
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Jobbsøkere;
