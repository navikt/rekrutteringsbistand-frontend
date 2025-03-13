import LeggTilArbeidsgiverModal from '../LeggTilArbeidsgiverModal';
import ArbeidsgiverKort from './components/ArbeidsgiverKort';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

export interface ArbeidsgivereProps {
  handleLeggTilArbeidsgiver: (arbeidsgiver: ArbeidsgiverDTO | null) => void;
  arbeidsgivere: ArbeidsgiverDTO[];
}

const Arbeidsgivere: React.FC<ArbeidsgivereProps> = ({
  handleLeggTilArbeidsgiver,
  arbeidsgivere,
}) => {
  return (
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
              {<ArbeidsgiverKort navn={a.navn} adresse={a.adresse} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Arbeidsgivere;
