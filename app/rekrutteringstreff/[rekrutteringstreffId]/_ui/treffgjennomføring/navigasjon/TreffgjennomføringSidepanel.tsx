'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useTreffgjennomføringNavigasjon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/TreffgjennomføringNavigasjon';
import {
  erStegTilgjengelig,
  lagStegposisjon,
  hentNåddSteg,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import { useTreffgjennomføringFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/useTreffgjennomføringFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useSideLayoutContext } from '@/components/layout/SideLayoutContext';
import {
  BodyShort,
  Heading,
  ProgressBar,
  Stepper,
  VStack,
} from '@navikt/ds-react';
import { FC } from 'react';

export const TREFFGJENNOMFØRING_SIDEPANEL_TITTEL =
  'Treffgjennomføring og oppfølging';

const TreffgjennomføringSidepanel: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { erWorkOp, treffgjennomføring } = useTreffgjennomføringFane();
  const { data: arbeidsgivere } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const { stegFraUrl, byttSteg, lagringPågår } =
    useTreffgjennomføringNavigasjon();
  const { closeSheet } = useSideLayoutContext();

  if (!treffgjennomføring) return null;

  const { synligeSteg, aktivtSteg, posisjonFor } = lagStegposisjon(
    stegFraUrl,
    treffgjennomføring,
    erWorkOp,
  );
  const aktivPosisjon = posisjonFor(aktivtSteg);
  const nåddSteg = hentNåddSteg(treffgjennomføring);
  const antallNåddeSteg = posisjonFor(nåddSteg);

  return (
    <div className='w-full'>
      <div className='mt-2 w-full'>
        <ProgressBar
          value={(antallNåddeSteg / synligeSteg.length) * 100}
          size='small'
          className='mt-2'
          aria-label='Fremdrift i treffgjennomføringen'
        />
        <div className='mt-1 flex justify-end text-sm tabular-nums'>
          {antallNåddeSteg} / {synligeSteg.length}
        </div>
      </div>
      <div className='mt-4'>
        <VStack gap='space-16'>
          <VStack gap='space-4'>
            <Heading
              id='treffgjennomføring-stepper-heading'
              level='2'
              size='medium'
            >
              {TREFFGJENNOMFØRING_SIDEPANEL_TITTEL}
            </Heading>
            <BodyShort size='small' textColor='subtle'>
              {treffgjennomføring.oppmøte.length} møtt
              {erWorkOp && ` · ${treffgjennomføring.antallRom} rom`} ·{' '}
              {arbeidsgivere?.length ?? 0} arbeidsgivere
            </BodyShort>
          </VStack>
          <Stepper
            aria-labelledby='treffgjennomføring-stepper-heading'
            activeStep={aktivPosisjon}
            onStepChange={(posisjon) => {
              const steg = synligeSteg[posisjon - 1];
              if (!steg || steg.id === aktivtSteg) return;
              if (lagringPågår) return;
              byttSteg(steg.id);
              // Ved smal skjerm ligger panelet i en Sheet over innholdet.
              closeSheet();
            }}
            orientation='vertical'
          >
            {synligeSteg.map((steg) => (
              <Stepper.Step
                as='button'
                type='button'
                key={steg.id}
                completed={steg.id < Math.max(nåddSteg, aktivtSteg)}
                interactive={
                  steg.id === aktivtSteg ||
                  (!lagringPågår &&
                    erStegTilgjengelig(steg.id, treffgjennomføring, erWorkOp))
                }
              >
                {steg.tittel}
              </Stepper.Step>
            ))}
          </Stepper>
        </VStack>
      </div>
    </div>
  );
};

export default TreffgjennomføringSidepanel;
