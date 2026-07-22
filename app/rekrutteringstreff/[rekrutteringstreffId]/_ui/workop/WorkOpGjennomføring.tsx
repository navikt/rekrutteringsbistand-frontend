'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  useMøtedag,
  type MøtedagFase,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import OppmøteOgOppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/OppmøteOgOppsett';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/RomOgRotasjon';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import {
  BodyShort,
  Box,
  Button,
  HStack,
  Heading,
  LocalAlert,
  Stepper,
  VStack,
} from '@navikt/ds-react';
import { FC, useState } from 'react';

const STEG_TITLER = [
  'Oppmøte og oppsett',
  'Rom og rotasjon',
  'Ønsker',
  'Vurdering',
] as const;

const FASE_TIL_STEG: Record<MøtedagFase, number> = {
  OPPMØTE: 1,
  ROM: 2,
  ØNSKER: 3,
  VURDERING: 4,
};

const KommerSenere: FC<{ tittel: string }> = ({ tittel }) => (
  <LocalAlert status='announcement'>
    <LocalAlert.Header>
      <LocalAlert.Title as='h3'>{tittel}</LocalAlert.Title>
    </LocalAlert.Header>
    <LocalAlert.Content>
      Dette steget bygges i en senere fase. Grunnlaget (rom, rotasjon, ønsker og
      vurderinger) settes opp fra steg 1.
    </LocalAlert.Content>
  </LocalAlert>
);

const WorkOpGjennomføring: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const møtedagHook = useMøtedag(rekrutteringstreffId);
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const jobbsøkereHook = useJobbsøkere(rekrutteringstreffId);
  const [aktivtSteg, setAktivtSteg] = useState(1);

  return (
    <SWRLaster hooks={[møtedagHook, arbeidsgivereHook, jobbsøkereHook]}>
      {(møtedag, deltakendeArbeidsgivere, jobbsøkereData) => {
        if (!jobbsøkereData) return null;

        const nåddSteg = FASE_TIL_STEG[møtedag.fase];
        const erInteraktiv = (steg: number) => steg === 1 || steg <= nåddSteg;
        const erFullført = (steg: number) => steg < nåddSteg;
        const lagStegviser = () => (
          <Stepper
            aria-labelledby='workop-stepper-heading'
            activeStep={aktivtSteg}
            onStepChange={setAktivtSteg}
            orientation='horizontal'
          >
            {STEG_TITLER.map((tittel, i) => {
              const steg = i + 1;
              return (
                <Stepper.Step
                  as='button'
                  type='button'
                  key={tittel}
                  completed={erFullført(steg)}
                  interactive={erInteraktiv(steg)}
                >
                  {tittel}
                </Stepper.Step>
              );
            })}
          </Stepper>
        );

        return (
          <VStack gap='space-24'>
            <VStack gap='space-8'>
              <Heading id='workop-stepper-heading' level='2' size='medium'>
                WorkOp-gjennomføring
              </Heading>
              <Box paddingInline='space-12'>
                <BodyShort size='small'>
                  {møtedag.oppmøte.length} møtt · {møtedag.antallRom} rom ·{' '}
                  {deltakendeArbeidsgivere.length} arbeidsgivere
                </BodyShort>
              </Box>
            </VStack>

            {lagStegviser()}

            {aktivtSteg === 1 ? (
              <OppmøteOgOppsett
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onMutate={() => møtedagHook.mutate()}
                onOppsettLagret={() => setAktivtSteg(2)}
              />
            ) : aktivtSteg === 2 ? (
              <RomOgRotasjon
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onTilbake={() => setAktivtSteg(1)}
                onNeste={() => setAktivtSteg(3)}
              />
            ) : (
              <VStack gap='space-16'>
                <KommerSenere tittel={STEG_TITLER[aktivtSteg - 1]} />
                <HStack gap='space-8'>
                  <Button
                    type='button'
                    variant='secondary'
                    onClick={() => setAktivtSteg((s) => Math.max(1, s - 1))}
                  >
                    Tilbake
                  </Button>
                  {aktivtSteg < STEG_TITLER.length &&
                    erInteraktiv(aktivtSteg + 1) && (
                      <Button
                        type='button'
                        onClick={() =>
                          setAktivtSteg((s) =>
                            Math.min(STEG_TITLER.length, s + 1),
                          )
                        }
                      >
                        Neste
                      </Button>
                    )}
                </HStack>
              </VStack>
            )}
          </VStack>
        );
      }}
    </SWRLaster>
  );
};

export default WorkOpGjennomføring;
