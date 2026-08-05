'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  useMøtedag,
  type MøtedagDTO,
  type MøtedagFase,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import Intervjufordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/Intervjufordeling';
import OppmøteOgOppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/OppmøteOgOppsett';
import Oppsummering from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/Oppsummering';
import RegistreringAvStatus from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/RegistreringAvStatus';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/RomOgRotasjon';
import Ønsker from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/workop/Ønsker';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Box, Heading, Stepper, VStack } from '@navikt/ds-react';
import {
  FC,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const STEG_TITLER = [
  'Oppmøte og oppsett',
  'Rom og rotasjon',
  'Ønsker',
  'Intervjufordeling',
  'Registrering av status',
  'Oppsummering',
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
  // Bare ett steg er montert om gangen, så én felles status er nok. Den hindrer
  // at Stepper river bort steget – og feilmeldingene – midt i en lagring.
  const [lagringPågår, setLagringPågår] = useState(false);
  const stegstartRef = useRef<HTMLDivElement>(null);
  const { mutate: mutateMøtedag } = møtedagHook;
  const oppdaterMøtedag = useCallback(
    async (oppdatertMøtedag?: MøtedagDTO) => {
      await (oppdatertMøtedag
        ? mutateMøtedag(oppdatertMøtedag, { revalidate: false })
        : mutateMøtedag());
    },
    [mutateMøtedag],
  );

  useLayoutEffect(() => {
    stegstartRef.current?.scrollIntoView({ block: 'start' });
  }, [aktivtSteg]);

  // Hvert steg monteres på nytt når man bytter, og lagringsstatusen tilhører
  // steget man forlater.
  const byttSteg = useCallback((steg: number) => {
    setLagringPågår(false);
    setAktivtSteg(steg);
  }, []);

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
          ((steg === 5 || steg === 6) &&
            møtedag.intervjufordelinger.some(
              (fordeling) => fordeling.inkludertePersonTreffIder.length > 0,
            ));
        const erFullført = (steg: number) =>
          steg < Math.max(nåddSteg, aktivtSteg);
        let steginnhold: ReactNode;

        switch (aktivtSteg) {
          case 1:
            steginnhold = (
              <OppmøteOgOppsett
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onMøtedagOppdatert={oppdaterMøtedag}
                onLagringsstatusEndret={setLagringPågår}
                onOppsettLagret={() => byttSteg(2)}
              />
            );
            break;
          case 2:
            steginnhold = (
              <RomOgRotasjon
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onMøtedagOppdatert={oppdaterMøtedag}
                onLagringsstatusEndret={setLagringPågår}
                onTilbake={() => byttSteg(1)}
                onNeste={() => byttSteg(3)}
              />
            );
            break;
          case 3:
            steginnhold = (
              <Ønsker
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onMøtedagOppdatert={oppdaterMøtedag}
                onLagringsstatusEndret={setLagringPågår}
                onTilbake={() => byttSteg(2)}
                onNeste={() => byttSteg(4)}
              />
            );
            break;
          case 4:
            steginnhold = (
              <Intervjufordeling
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onMutate={() => møtedagHook.mutate()}
                onLagringsstatusEndret={setLagringPågår}
                onTilbake={() => byttSteg(3)}
                onNeste={() => byttSteg(5)}
              />
            );
            break;
          case 5:
            steginnhold = (
              <RegistreringAvStatus
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onTilbake={() => byttSteg(4)}
                onNeste={() => byttSteg(6)}
                onMøtedagOppdatert={oppdaterMøtedag}
                onLagringsstatusEndret={setLagringPågår}
              />
            );
            break;
          default:
            steginnhold = (
              <Oppsummering
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                antallPåmeldte={jobbsøkereData.jobbsøkere.length}
                onTilbake={() => byttSteg(5)}
              />
            );
        }

        return (
          <VStack gap='space-24'>
            <div
              ref={stegstartRef}
              style={{ scrollMarginBlockStart: 'var(--ax-space-20)' }}
            >
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
            </div>
            <div className='overflow-x-auto'>
              <Stepper
                // Aksel lar hvert stegnavn krympe til sitt lengste ord, så
                // flerordstitler brytes over to linjer selv når raden har god
                // plass. Fra `xl` er det plass til alle stegnavnene på én
                // linje. Under det beholder vi Aksels bryting.
                className='xl:[&_.aksel-stepper\_\_content]:max-w-none xl:[&_.aksel-stepper\_\_content]:whitespace-nowrap'
                aria-labelledby='workop-stepper-heading'
                activeStep={aktivtSteg}
                onStepChange={(steg) => {
                  if (!lagringPågår) byttSteg(steg);
                }}
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
                      interactive={!lagringPågår && erInteraktiv(steg)}
                    >
                      {tittel}
                    </Stepper.Step>
                  );
                })}
              </Stepper>
            </div>

            {steginnhold}
          </VStack>
        );
      }}
    </SWRLaster>
  );
};

export default WorkOpGjennomføring;
