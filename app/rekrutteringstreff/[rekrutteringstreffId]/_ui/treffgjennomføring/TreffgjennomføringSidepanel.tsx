'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useTreffgjennomføringNavigasjon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/TreffgjennomføringNavigasjon';
import {
  erStegTilgjengelig,
  GJELDENDE_STEG_TIL_STEGNUMMER,
  nærmesteTilgjengeligeSteg,
  stegFor,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringSteg';
import { useTreffgjennomføringFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
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

  if (!treffgjennomføring) return null;

  const synligeSteg = stegFor(erWorkOp);
  const aktivtSteg = nærmesteTilgjengeligeSteg(
    stegFraUrl,
    treffgjennomføring,
    erWorkOp,
  );
  const posisjonFor = (steg: number) =>
    Math.max(
      synligeSteg.findIndex((synlig) => synlig.id === steg),
      0,
    ) + 1;

  const aktivPosisjon = posisjonFor(aktivtSteg);
  const nåddSteg =
    GJELDENDE_STEG_TIL_STEGNUMMER[treffgjennomføring.gjeldendeSteg];
  const antallNåddeSteg = posisjonFor(nåddSteg);

  return (
    <VStack gap='space-16'>
      <div>
        <ProgressBar
          value={(antallNåddeSteg / synligeSteg.length) * 100}
          size='small'
          aria-label='Fremdrift i treffgjennomføringen'
        />
        <div className='mt-1 flex justify-end text-sm tabular-nums'>
          {antallNåddeSteg} / {synligeSteg.length}
        </div>
      </div>
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
          if (!lagringPågår) byttSteg(steg.id);
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
  );
};

export default TreffgjennomføringSidepanel;
