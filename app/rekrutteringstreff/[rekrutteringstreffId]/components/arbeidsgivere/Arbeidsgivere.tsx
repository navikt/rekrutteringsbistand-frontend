'use client';

import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import LeggTilArbeidsgiverModal from '../LeggTilArbeidsgiverModal';
import ArbeidsgiverKort from './components/ArbeidsgiverKort';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import SWRLaster from '@/app/components/SWRLaster';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

const RekrutteringstreffArbeidsgivere = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const getLagtTilData = (arbeidsgiver: ArbeidsgiverDTO) => {
    const leggTilHendelse = arbeidsgiver.hendelser.find(
      ({ hendelsestype }) => hendelsestype === 'LEGG_TIL',
    );
    if (leggTilHendelse) {
      return {
        status: 'Lagt til',
      };
    }
    return {
      status: undefined,
    };
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <LeggTilArbeidsgiverModal
              leggTilKnappTekst='Legg til arbeidsgiver'
              onLagtTil={arbeidsgivereHook.mutate}
            />
          </div>
          {arbeidsgivere.length === 0 ? (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          ) : (
            <ul>
              {arbeidsgivere.map((a, index) => {
                const { status } = getLagtTilData(a);
                return (
                  <li key={index}>
                    <ArbeidsgiverKort
                      navn={a.navn}
                      adresse={{ adresse: 'Kirkeveien 50, 0368 Oslo' }} //TODO: Byttes ut når vi får implemetert adresse
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

export default RekrutteringstreffArbeidsgivere;
