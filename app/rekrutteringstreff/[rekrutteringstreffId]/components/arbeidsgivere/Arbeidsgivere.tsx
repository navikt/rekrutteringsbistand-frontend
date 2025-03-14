import { useRekrutteringstreffContext } from '../../RekrutteringstreffContext';
import LeggTilArbeidsgiverModal from '../LeggTilArbeidsgiverModal';
import ArbeidsgiverKort from './components/ArbeidsgiverKort';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import SWRLaster from '@/app/components/SWRLaster';
import { rekbisError } from '@/util/rekbisError';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

export interface ArbeidsgivereProps {
  handleLeggTilArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO | null) => void;
  arbeidsgivere: ArbeidsgiverDTO[];
}

const RekrutteringstreffArbeidsgivere: React.FC<ArbeidsgivereProps> = ({
  handleLeggTilArbeidsgiver,
}) => {
  const context = useRekrutteringstreffContext();
  if (!context.rekrutteringstreffId) {
    throw new rekbisError({
      beskrivelse: 'RekrutteringstreffId mangler i konteksten!',
    });
  }
  const rekrutteringstreffId = context.rekrutteringstreffId;
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  console.log('arbeidsgivereHook', arbeidsgivereHook);

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <LeggTilArbeidsgiverModal
              onLeggTilArbeidsgiver={handleLeggTilArbeidsgiver}
              onCloseModal={() => {}}
              leggTilKnappTekst='Legg til arbeidsgiver'
            />
          </div>
          {arbeidsgivere.length === 0 ? (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          ) : (
            <ul>
              {arbeidsgivere.map((a, index) => (
                <li key={index}>
                  {
                    <ArbeidsgiverKort
                      navn={a.navn}
                      adresse={{ adresse: 'Kirkeveien 50, 0368 Oslo' }}
                    />
                  }
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </SWRLaster>
  );
};

export default RekrutteringstreffArbeidsgivere;
