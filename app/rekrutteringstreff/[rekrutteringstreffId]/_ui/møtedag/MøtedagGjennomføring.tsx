'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  useMøtedag,
  type MøtedagDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import Interesse from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Interesse';
import Intervjufordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Intervjufordeling';
import Møteoppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Møteoppsett';
import Oppmøte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Oppmøte';
import Oppsummering from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Oppsummering';
import RegistreringAvStatus from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/RegistreringAvStatus';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/RomOgRotasjon';
import {
  erStegTilgjengelig,
  FASE_TIL_STEG,
  nærmesteTilgjengeligeSteg,
  MØTEDAG_STEG_QUERY_PARAM,
  møtedagStegParser,
  stegFor,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/møtedagSteg';
import { useMøtedagFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useMøtedagFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { BodyShort, Box, Heading, Stepper, VStack } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const MøtedagGjennomføring: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { erWorkOp } = useMøtedagFane();
  const møtedagHook = useMøtedag(rekrutteringstreffId);
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const jobbsøkereHook = useJobbsøkere(rekrutteringstreffId);
  // Steget ligger i URL-en, på linje med fanevalget. Da kan et steg deles med
  // en kollega midt under treffet, og en utilsiktet oppfriskning kaster deg
  // ikke tilbake til start.
  const [stegFraUrl, setStegFraUrl] = useQueryState(
    MØTEDAG_STEG_QUERY_PARAM,
    møtedagStegParser.withOptions({ clearOnDefault: true }),
  );
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

  const synligeSteg = stegFor(erWorkOp);
  const møtedag = møtedagHook.data;
  const aktivtSteg = møtedag
    ? nærmesteTilgjengeligeSteg(stegFraUrl, møtedag, erWorkOp)
    : stegFraUrl;
  // Stegene beholder sine egne numre i URL-en, men Stepper teller posisjoner
  // fra 1. Uten oversettelsen ville et vanlig treff – som hopper over
  // WorkOp-stegene – markert feil steg som aktivt.
  const aktivPosisjon =
    Math.max(
      synligeSteg.findIndex((steg) => steg.id === aktivtSteg),
      0,
    ) + 1;

  // Peker URL-en på et steg treffet ikke har kommet til, rettes adressen opp
  // så den viser det man faktisk ser på.
  useEffect(() => {
    if (møtedag && aktivtSteg !== stegFraUrl) {
      void setStegFraUrl(aktivtSteg);
    }
  }, [aktivtSteg, møtedag, setStegFraUrl, stegFraUrl]);

  useLayoutEffect(() => {
    stegstartRef.current?.scrollIntoView({ block: 'start' });
  }, [aktivtSteg]);

  // Hvert steg monteres på nytt når man bytter, og lagringsstatusen tilhører
  // steget man forlater.
  const byttSteg = useCallback(
    (steg: number) => {
      setLagringPågår(false);
      void setStegFraUrl(steg);
    },
    [setStegFraUrl],
  );

  return (
    <SWRLaster hooks={[møtedagHook, arbeidsgivereHook, jobbsøkereHook]}>
      {(møtedag, deltakendeArbeidsgivere, jobbsøkereData) => {
        if (!jobbsøkereData) return null;

        const fremmøtteJobbsøkere = jobbsøkereData.jobbsøkere.filter(
          (jobbsøker) => møtedag.oppmøte.includes(jobbsøker.personTreffId),
        );
        const nåddSteg = FASE_TIL_STEG[møtedag.fase];
        const erInteraktiv = (steg: number) =>
          erStegTilgjengelig(steg, møtedag, erWorkOp);
        const erFullført = (steg: number) =>
          steg < Math.max(nåddSteg, aktivtSteg);

        // Et vanlig treff hopper over WorkOp-stegene, så «neste» er ikke
        // aktivtSteg + 1. Vi navigerer langs de synlige stegene i stedet, og
        // lar knappene si hvor de faktisk fører.
        const naboSteg = (retning: 1 | -1) => {
          const posisjon = synligeSteg.findIndex(
            (steg) => steg.id === aktivtSteg,
          );
          return synligeSteg[posisjon + retning];
        };
        const gåTil = (retning: 1 | -1) => () => {
          const mål = naboSteg(retning);
          if (mål) byttSteg(mål.id);
        };
        const nesteTittel = naboSteg(1)?.tittel ?? '';

        let steginnhold: ReactNode;

        switch (aktivtSteg) {
          case 1:
            steginnhold = (
              <Oppmøte
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onMøtedagOppdatert={oppdaterMøtedag}
                onLagringsstatusEndret={setLagringPågår}
                onNeste={gåTil(1)}
                nesteknappTekst={`Gå til ${nesteTittel.toLowerCase()}`}
              />
            );
            break;
          // Møteoppsettet og romfordelingen er samme steg. Tidene må settes
          // før det finnes rom å vise, så steget bytter innhold av seg selv
          // når møteplanen er opprettet – uten at brukeren flyttes.
          case 2:
            steginnhold =
              møtedag.rom.length === 0 ? (
                <Møteoppsett
                  rekrutteringstreffId={rekrutteringstreffId}
                  møtedag={møtedag}
                  arbeidsgivere={deltakendeArbeidsgivere}
                  onMøtedagOppdatert={oppdaterMøtedag}
                  onLagringsstatusEndret={setLagringPågår}
                  onTilbake={gåTil(-1)}
                />
              ) : (
                <RomOgRotasjon
                  rekrutteringstreffId={rekrutteringstreffId}
                  møtedag={møtedag}
                  arbeidsgivere={deltakendeArbeidsgivere}
                  jobbsøkereData={jobbsøkereData}
                  onMøtedagOppdatert={oppdaterMøtedag}
                  onLagringsstatusEndret={setLagringPågår}
                  onTilbake={gåTil(-1)}
                  onNeste={gåTil(1)}
                />
              );
            break;
          case 3:
            steginnhold = (
              <Interesse
                rekrutteringstreffId={rekrutteringstreffId}
                møtedag={møtedag}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onMøtedagOppdatert={oppdaterMøtedag}
                onLagringsstatusEndret={setLagringPågår}
                onTilbake={gåTil(-1)}
                onNeste={gåTil(1)}
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
                onTilbake={gåTil(-1)}
                onNeste={gåTil(1)}
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
                onTilbake={gåTil(-1)}
                onNeste={gåTil(1)}
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
                onTilbake={gåTil(-1)}
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
                <Heading id='møtedag-stepper-heading' level='2' size='medium'>
                  Møtedag og oppfølging
                </Heading>
                <Box paddingInline='space-12'>
                  <BodyShort size='small'>
                    {møtedag.oppmøte.length} møtt ·{' '}
                    {erWorkOp && `${møtedag.antallRom} rom · `}
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
                aria-labelledby='møtedag-stepper-heading'
                activeStep={aktivPosisjon}
                onStepChange={(posisjon) => {
                  const steg = synligeSteg[posisjon - 1];
                  if (!lagringPågår && steg) byttSteg(steg.id);
                }}
                orientation='horizontal'
              >
                {synligeSteg.map((steg) => (
                  <Stepper.Step
                    as='button'
                    type='button'
                    key={steg.id}
                    completed={erFullført(steg.id)}
                    interactive={!lagringPågår && erInteraktiv(steg.id)}
                  >
                    {steg.tittel}
                  </Stepper.Step>
                ))}
              </Stepper>
            </div>

            {steginnhold}
          </VStack>
        );
      }}
    </SWRLaster>
  );
};

export default MøtedagGjennomføring;
