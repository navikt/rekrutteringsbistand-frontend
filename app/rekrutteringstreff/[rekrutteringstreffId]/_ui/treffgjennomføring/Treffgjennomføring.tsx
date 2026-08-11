'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  useTreffgjennomføring,
  type TreffgjennomføringDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import Interesse from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Interesse';
import Intervjufordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Intervjufordeling';
import Møteoppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Møteoppsett';
import Oppmøte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Oppmøte';
import Oppsummering from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/Oppsummering';
import RegistreringAvStatus from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/RegistreringAvStatus';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/RomOgRotasjon';
import {
  erStegTilgjengelig,
  FASE_TIL_STEG,
  nærmesteTilgjengeligeSteg,
  TREFFGJENNOMFØRING_STEG_QUERY_PARAM,
  treffgjennomføringStegParser,
  stegFor,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/treffgjennomføringSteg';
import { useTreffgjennomføringFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/useTreffgjennomføringFane';
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

const Treffgjennomføring: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { erWorkOp } = useTreffgjennomføringFane();
  const treffgjennomføringHook = useTreffgjennomføring(rekrutteringstreffId);
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const jobbsøkereHook = useJobbsøkere(rekrutteringstreffId);
  const [stegFraUrl, setStegFraUrl] = useQueryState(
    TREFFGJENNOMFØRING_STEG_QUERY_PARAM,
    treffgjennomføringStegParser.withOptions({ clearOnDefault: true }),
  );
  const [lagringPågår, setLagringPågår] = useState(false);
  const stegstartRef = useRef<HTMLDivElement>(null);
  const { mutate: mutateTreffgjennomføring } = treffgjennomføringHook;
  const oppdaterTreffgjennomføring = useCallback(
    async (oppdatertTreffgjennomføring?: TreffgjennomføringDTO) => {
      await (oppdatertTreffgjennomføring
        ? mutateTreffgjennomføring(oppdatertTreffgjennomføring, {
            revalidate: false,
          })
        : mutateTreffgjennomføring());
    },
    [mutateTreffgjennomføring],
  );

  const synligeSteg = stegFor(erWorkOp);
  const treffgjennomføring = treffgjennomføringHook.data;
  const aktivtSteg = treffgjennomføring
    ? nærmesteTilgjengeligeSteg(stegFraUrl, treffgjennomføring, erWorkOp)
    : stegFraUrl;
  const aktivPosisjon =
    Math.max(
      synligeSteg.findIndex((steg) => steg.id === aktivtSteg),
      0,
    ) + 1;

  useEffect(() => {
    if (treffgjennomføring && aktivtSteg !== stegFraUrl) {
      void setStegFraUrl(aktivtSteg);
    }
  }, [aktivtSteg, treffgjennomføring, setStegFraUrl, stegFraUrl]);

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
      hooks={[treffgjennomføringHook, arbeidsgivereHook, jobbsøkereHook]}
    >
      {(treffgjennomføring, deltakendeArbeidsgivere, jobbsøkereData) => {
        if (!jobbsøkereData) return null;

        const fremmøtteJobbsøkere = jobbsøkereData.jobbsøkere.filter(
          (jobbsøker) =>
            treffgjennomføring.oppmøte.includes(jobbsøker.personTreffId),
        );
        const nåddSteg = FASE_TIL_STEG[treffgjennomføring.fase];
        const erInteraktiv = (steg: number) =>
          erStegTilgjengelig(steg, treffgjennomføring, erWorkOp);
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
                treffgjennomføring={treffgjennomføring}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onTreffgjennomføringOppdatert={oppdaterTreffgjennomføring}
                onLagringsstatusEndret={setLagringPågår}
                onNeste={gåTil(1)}
                nesteknappTekst={`Gå til ${nesteTittel.toLowerCase()}`}
              />
            );
            break;
          case 2:
            steginnhold =
              treffgjennomføring.rom.length === 0 ? (
                <Møteoppsett
                  rekrutteringstreffId={rekrutteringstreffId}
                  treffgjennomføring={treffgjennomføring}
                  arbeidsgivere={deltakendeArbeidsgivere}
                  onTreffgjennomføringOppdatert={oppdaterTreffgjennomføring}
                  onLagringsstatusEndret={setLagringPågår}
                  onTilbake={gåTil(-1)}
                />
              ) : (
                <RomOgRotasjon
                  rekrutteringstreffId={rekrutteringstreffId}
                  treffgjennomføring={treffgjennomføring}
                  arbeidsgivere={deltakendeArbeidsgivere}
                  jobbsøkereData={jobbsøkereData}
                  onTreffgjennomføringOppdatert={oppdaterTreffgjennomføring}
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
                treffgjennomføring={treffgjennomføring}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onTreffgjennomføringOppdatert={oppdaterTreffgjennomføring}
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
                treffgjennomføring={treffgjennomføring}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onMutate={() => treffgjennomføringHook.mutate()}
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
                treffgjennomføring={treffgjennomføring}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkere={fremmøtteJobbsøkere}
                onTilbake={gåTil(-1)}
                onNeste={gåTil(1)}
                onTreffgjennomføringOppdatert={oppdaterTreffgjennomføring}
                onLagringsstatusEndret={setLagringPågår}
              />
            );
            break;
          default:
            steginnhold = (
              <Oppsummering
                rekrutteringstreffId={rekrutteringstreffId}
                treffgjennomføring={treffgjennomføring}
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
                  id='treffgjennomføring-stepper-heading'
                  level='2'
                  size='medium'
                >
                  Treffgjennomføring og oppfølging
                </Heading>
                <Box paddingInline='space-12'>
                  <BodyShort size='small'>
                    {treffgjennomføring.oppmøte.length} møtt ·{' '}
                    {erWorkOp && `${treffgjennomføring.antallRom} rom · `}
                    {deltakendeArbeidsgivere.length} arbeidsgivere
                  </BodyShort>
                </Box>
              </VStack>
            </div>
            <div className='overflow-x-auto'>
              <Stepper
                className='xl:[&_.aksel-stepper\_\_content]:max-w-none xl:[&_.aksel-stepper\_\_content]:whitespace-nowrap'
                aria-labelledby='treffgjennomføring-stepper-heading'
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

export default Treffgjennomføring;
