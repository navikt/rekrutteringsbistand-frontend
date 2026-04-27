'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import LeggTilArbeidsgiverKnapp from './LeggTilArbeidsgiverKnapp';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import { slettArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { useArbeidsgiverHendelser } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import {
  ArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort } from '@navikt/ds-react';
import { FC, useState } from 'react';

const ArbeidsgivereSeksjon: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const hendelseHook = useArbeidsgiverHendelser(rekrutteringstreffId);

  const [sletter, setSletter] = useState(false);

  const bekreftSlett = async (a: ArbeidsgiverDTO) => {
    try {
      setSletter(true);
      await slettArbeidsgiver(
        rekrutteringstreffId,
        (a as any).arbeidsgiverTreffId ?? a.organisasjonsnummer,
      );
      hendelseHook.mutate();
    } finally {
      setSletter(false);
    }
  };

  return (
    <SWRLaster hooks={[arbeidsgivereHook]}>
      {(arbeidsgivere) => (
        <div className='space-y-4'>
          {Array.isArray(arbeidsgivere) && arbeidsgivere.length > 0 ? (
            <ul>
              {arbeidsgivere.map((a, index) => (
                <li key={index}>
                  <div className='relative'>
                    <ArbeidsgiverKort
                      navn={a.navn}
                      organisasjonsnummer={a.organisasjonsnummer}
                      gateadresse={a.gateadresse}
                      postnummer={a.postnummer}
                      poststed={a.poststed}
                    />
                    <div className='absolute top-2 right-2'>
                      <SlettArbeidsgiverModal
                        navn={a.navn}
                        loading={sletter}
                        disabled={sletter}
                        onConfirm={() => bekreftSlett(a)}
                        arbeidsgivereHook={arbeidsgivereHook}
                        variant='cross'
                        triggerAriaLabel={`Fjern ${a.navn}`}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
          )}

          <LeggTilArbeidsgiverKnapp />
        </div>
      )}
    </SWRLaster>
  );
};

export default ArbeidsgivereSeksjon;
