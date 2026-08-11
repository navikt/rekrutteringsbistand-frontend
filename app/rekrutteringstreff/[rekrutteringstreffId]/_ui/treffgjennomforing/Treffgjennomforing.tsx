'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  useTreffgjennomforing,
  type TreffgjennomforingDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import Interesse from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Interesse';
import Intervjufordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Intervjufordeling';
import Møteoppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Møteoppsett';
import Oppmøte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Oppmøte';
import Oppsummering from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Oppsummering';
import RegistreringAvStatus from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/RegistreringAvStatus';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/RomOgRotasjon';
import {
  erStegTilgjengelig,
  FASE_TIL_STEG,
  nærmesteTilgjengeligeSteg,
  TREFFGJENNOMFORING_STEG_QUERY_PARAM,
  treffgjennomforingStegParser,
  stegFor,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/treffgjennomforingSteg';
import { useTreffgjennomforingFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useTreffgjennomforingFane';
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

const Treffgjennomforing: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { erWorkOp } = useTreffgjennomforingFane();
  const treffgjennomforingHook = useTreffgjennomforing(rekrutteringstreffId);
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const jobbsøkereHook = useJobbsøkere(rekrutteringstreffId);
  const [stegFraUrl, setStegFraUrl] = useQueryState(
    TREFFGJENNOMFORING_STEG_QUERY_PARAM,
    treffgjennomforingStegParser.withOptions({ clearOnDefault: true }),
  );
  const [lagringPågår, setLagringPågår] = useState(false);
  const stegstartRef = useRef<HTMLDivElement>(null);
  const { mutate: mutateTreffgjennomforing } = treffgjennomforingHook;
  const oppdaterTreffgjennomforing = useCallback(
    async (oppdatertTreffgjennomforing?: TreffgjennomforingDTO) => {
      await (oppdatertTreffgjennomforing
        ? mutateTreffgjennomforing(oppdatertTreffgjennomforing, {
            revalidate: false,
          })
        : mutateTreffgjennomforing());
    },
    [mutateTreffgjennomforing],
  );

  const synligeSteg = stegFor(erWorkOp);
  const treffgjennomforing = treffgjennomforingHook.data;
  const aktivtSteg = treffgjennomforing
    ? nærmesteTilgjengeligeSteg(stegFraUrl, treffgjennomforing, erWorkOp)
    : stegFraUrl;
  const aktivPosisjon =
    Math.max(
      synligeSteg.findIndex((steg) => steg.id === aktivtSteg),
      0,
    ) + 1;

  useEffect(() => {
    if (treffgjennomforing && aktivtSteg !== stegFraUrl) {
      void setStegFraUrl(aktivtSteg);
    }
  }, [aktivtSteg, treffgjennomforing, setStegFraUrl, stegFraUrl]);

  useLayoutEffect(() => {
    stegstartRef.current?.scrollIntoView({ block: 'start' });
  }, [aktivtSteg]);

  const byttSteg = useCallback(
    (steg: number) => {
      setLagringPågår(false);
      void setStegFraUrl(steg);
    },
    [setStegFraUrl],
  );

  return (
    <SWRLaster
      hooks={[treffgjennomforingHook, arbeidsgivereHook, jobbsøkereHook]}
    >
      {(treffgjennomforing, deltakendeArbeidsgivere, jobbsøkereData) => {
        if (!jobbsøkereData) return null;

        const fremmøtteJobbsøkere = jobbsøkereData.jobbsøkere.filter(
          (jobbsøker) =>
            treffgjennomforing.oppmøte.includes(jobbsøker.personTreffId),
        );
        const nåddSteg = FASE_TIL_STEG[treffgjennomforing.fase];
        const erInteraktiv = (steg: number) =>
          erStegTilgjengelig(steg, treffgjennomforing, erWorkOp);
        const erFullført = (steg: number) =>
          steg < Math.max(nåddSteg, aktivtSteg);

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
                treffgjennomforing={treffgjennomforing}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onTreffgjennomforingOppdatert={oppdaterTreffgjennomforing}
                onLagringsstatusEndret={setLagringPågår}
                onNeste={gåTil(1)}
                nesteknappTekst={`Gå til ${nesteTittel.toLowerCase()}`}
              />
            );
            break;
          case 2:
            steginnhold =
              treffgjennomforing.rom.length === 0 ? (
                <Møteoppsett
                  rekrutteringstreffId={rekrutteringstreffId}
                  treffgjennomforing={treffgjennomforing}
                  arbeidsgivere={deltakendeArbeidsgivere}
                  onTreffgjennomforingOppdatert={oppdaterTreffgjennomforing}
                  onLagringsstatusEndret={setLagringPågår}
                  onTilbake={gåTil(-1)}
                />
              ) : (
                <RomOgRotasjon
                  rekrutteringstreffId={rekrutteringstreffId}
                  treffgjennomforing={treffgjennomforing}
                  arbeidsgivere={deltakendeArbeidsgivere}
                  jobbsøkereData={jobbsøkereData}
                  onTreffgjennomforingOppdatert={oppdaterTreffgjennomforing}
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
                treffgjennomforing={treffgjennomforing}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onTreffgjennomforingOppdatert={oppdaterTreffgjennomforing}
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
                treffgjennomforing={treffgjennomforing}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onMutate={() => treffgjennomforingHook.mutate()}
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
                treffgjennomforing={treffgjennomforing}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onTilbake={gåTil(-1)}
                onNeste={gåTil(1)}
                onTreffgjennomforingOppdatert={oppdaterTreffgjennomforing}
                onLagringsstatusEndret={setLagringPågår}
              />
            );
            break;
          default:
            steginnhold = (
              <Oppsummering
                rekrutteringstreffId={rekrutteringstreffId}
                treffgjennomforing={treffgjennomforing}
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
                <Heading
                  id='treffgjennomforing-stepper-heading'
                  level='2'
                  size='medium'
                >
                  Treffgjennomføring og oppfølging
                </Heading>
                <Box paddingInline='space-12'>
                  <BodyShort size='small'>
                    {treffgjennomforing.oppmøte.length} møtt ·{' '}
                    {erWorkOp && `${treffgjennomforing.antallRom} rom · `}
                    {deltakendeArbeidsgivere.length} arbeidsgivere
                  </BodyShort>
                </Box>
              </VStack>
            </div>
            <div className='overflow-x-auto'>
              <Stepper
                className='xl:[&_.aksel-stepper\_\_content]:max-w-none xl:[&_.aksel-stepper\_\_content]:whitespace-nowrap'
                aria-labelledby='treffgjennomforing-stepper-heading'
                activeStep={aktivPosisjon}
                onStepChange={(posisjon) => {
                  const steg = synligeSteg[posisjon - 1];
                  if (!steg || steg.id === aktivtSteg) return;
                  if (!lagringPågår) byttSteg(steg.id);
                }}
                orientation='horizontal'
              >
                {synligeSteg.map((steg) => (
                  <Stepper.Step
                    as='button'
                    type='button'
                    key={steg.id}
                    completed={erFullført(steg.id)}
                    interactive={
                      steg.id === aktivtSteg ||
                      (!lagringPågår && erInteraktiv(steg.id))
                    }
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

export default Treffgjennomforing;
