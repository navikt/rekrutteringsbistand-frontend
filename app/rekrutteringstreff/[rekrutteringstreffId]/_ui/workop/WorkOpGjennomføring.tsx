'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  useMøtedag,
  type MøtedagFase,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import Intervjufordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/Intervjufordeling';
import OppmøteOgOppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/OppmøteOgOppsett';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/RomOgRotasjon';
import StatusOgOppfølging from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/StatusOgOppfølging';
import Ønsker from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/Ønsker';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Box, Heading, Stepper, VStack } from '@navikt/ds-react';
import { FC, useState } from 'react';

const STEG_TITLER = [
  'Oppmøte og oppsett',
  'Rom og rotasjon',
  'Ønsker',
  'Intervjufordeling',
  'Status og oppfølging',
] as const;

const FASE_TIL_STEG: Record<MøtedagFase, number> = {
  OPPMØTE: 1,
  ROM: 2,
  ØNSKER: 3,
  FORDELING: 4,
  VURDERING: 5,
};

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

        const fremmøtteJobbsøkere = jobbsøkereData.jobbsøkere.filter(
          (jobbsøker) => møtedag.oppmøte.includes(jobbsøker.personTreffId),
        );
        const nåddSteg = FASE_TIL_STEG[møtedag.fase];
        const erInteraktiv = (steg: number) =>
          steg === 1 ||
          steg <= nåddSteg ||
          (steg === 2 && møtedag.rom.length > 0) ||
          (steg === 3 && møtedag.rom.length > 0) ||
          (steg === 4 && møtedag.ønsker.length > 0) ||
          (steg === 5 &&
            møtedag.intervjufordelinger.some(
              (fordeling) => fordeling.inkludertePersonTreffIder.length > 0,
            ));
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
            ) : aktivtSteg === 3 ? (
              <Ønsker
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onMøtedagOppdatert={async (oppdatertMøtedag) => {
                  await møtedagHook.mutate(oppdatertMøtedag, {
                    revalidate: false,
                  });
                }}
                onTilbake={() => setAktivtSteg(2)}
                onNeste={() => setAktivtSteg(4)}
              />
            ) : aktivtSteg === 4 ? (
              <Intervjufordeling
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onMutate={() => møtedagHook.mutate()}
                onTilbake={() => setAktivtSteg(3)}
                onNeste={() => setAktivtSteg(5)}
              />
            ) : (
              <StatusOgOppfølging
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onTilbake={() => setAktivtSteg(4)}
                onMøtedagOppdatert={async (oppdatertMøtedag) => {
                  await møtedagHook.mutate(oppdatertMøtedag, {
                    revalidate: false,
                  });
                }}
              />
            )}
          </VStack>
        );
      }}
    </SWRLaster>
  );
};

export default WorkOpGjennomføring;
