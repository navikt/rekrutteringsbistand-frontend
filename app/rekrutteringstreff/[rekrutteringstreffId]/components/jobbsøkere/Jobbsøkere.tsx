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
import * as React from 'react';

const Jobbsøkere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);

  const jobbsøkerstatus = ({ hendelser }: JobbsøkerDTO) =>
    hendelser.some(({ hendelsestype }) => hendelsestype === 'LEGG_TIL')
      ? 'Lagt til'
      : undefined;

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
              {jobbsøkere.map((j, index) => (
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
                    datoLagtTil='20.mai.2025'
                    lagtTilAv='Kari Nordmann'
                    status={jobbsøkerstatus(j)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default Jobbsøkere;
