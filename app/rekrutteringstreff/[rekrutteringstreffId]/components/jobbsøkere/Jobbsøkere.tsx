'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import LeggTilJobbsøkerKnapp from '../LeggTilJobbsøkerKnapp';
import JobbsøkerKort from './components/JobbsøkerKort';
import {
  JobbsøkerDTO,
  useJobbsøkere,
} from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import SWRLaster from '@/app/components/SWRLaster';
import { BodyShort } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);

  const getLagtTilData = (jobbsøker: JobbsøkerDTO) => {
    const leggTilHendelse = jobbsøker.hendelser.find(
      ({ hendelsestype }) => hendelsestype === 'LEGG_TIL',
    );
    if (leggTilHendelse) {
      return {
        status: 'Lagt til',
        datoLagtTil: leggTilHendelse.tidspunkt,
        lagtTilAv: leggTilHendelse.aktørIdentifikasjon,
      };
    }
    return {
      status: undefined,
      datoLagtTil: 'Ukjent dato',
      lagtTilAv: 'Ukjent',
    };
  };

  return (
    <SWRLaster hooks={[jobbsøkerHook]}>
      {(jobbsøkere) => (
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <LeggTilJobbsøkerKnapp />
          </div>

          {jobbsøkere.length === 0 ? (
            <BodyShort>Ingen jobbsøkere lagt til</BodyShort>
          ) : (
            <ul>
              {jobbsøkere.map((j, index) => {
                const { status, datoLagtTil, lagtTilAv } = getLagtTilData(j);
                return (
                  <li key={index}>
                    <JobbsøkerKort
                      fornavn={j.fornavn}
                      etternavn={j.etternavn}
                      kandidatnummer={j.kandidatnummer}
                      fødselsnummer={j.fødselsnummer}
                      navKontor={j.navkontor}
                      veileder={{
                        navn: j.veilederNavn,
                        navIdent: j.veilederNavIdent,
                      }}
                      datoLagtTil={format(datoLagtTil, 'dd.MM.yyyy')}
                      lagtTilAv={lagtTilAv}
                      status={status}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default Jobbsøkere;
