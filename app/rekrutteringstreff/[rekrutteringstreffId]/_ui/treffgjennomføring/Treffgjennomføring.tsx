'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import DatagrunnlagFeil from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/DatagrunnlagFeil';
import { useTreffgjennomføringOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useTreffgjennomføringOppdatering';
import Steginnhold from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Steginnhold';
import { useTreffgjennomføringNavigasjon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/TreffgjennomføringNavigasjon';
import { lagStegposisjon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import { useTreffgjennomføringFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/useTreffgjennomføringFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { VStack } from '@navikt/ds-react';
import { FC, useEffect, useLayoutEffect, useRef } from 'react';

const Treffgjennomføring: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { erWorkOp } = useTreffgjennomføringFane();
  const treffgjennomføringHook = useTreffgjennomføring(rekrutteringstreffId);
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const { stegFraUrl, setStegFraUrl, byttSteg, setLagringPågår } =
    useTreffgjennomføringNavigasjon();
  const stegstartRef = useRef<HTMLDivElement>(null);
  const { oppdatering, tilstandErUbekreftet, henterPåNytt, prøvHentingPåNytt } =
    useTreffgjennomføringOppdatering(
      rekrutteringstreffId,
      treffgjennomføringHook.mutate,
    );

  const treffgjennomføring = treffgjennomføringHook.data;
  const { aktivtSteg, forrigeSteg, nesteSteg } = lagStegposisjon(
    stegFraUrl,
    treffgjennomføring,
    erWorkOp,
  );

  useEffect(() => {
    if (treffgjennomføring && aktivtSteg !== stegFraUrl) {
      void setStegFraUrl(aktivtSteg);
    }
  }, [aktivtSteg, treffgjennomføring, setStegFraUrl, stegFraUrl]);

  useLayoutEffect(() => {
    stegstartRef.current?.scrollIntoView({ block: 'start' });
  }, [aktivtSteg]);

  return (
    <SWRLaster
      hooks={[treffgjennomføringHook, arbeidsgivereHook]}
      egenFeilmelding={() => (
        <DatagrunnlagFeil
          henter={
            treffgjennomføringHook.isValidating ||
            arbeidsgivereHook.isValidating
          }
          onHentPåNytt={() =>
            void Promise.all([
              treffgjennomføringHook.mutate(),
              arbeidsgivereHook.mutate(),
            ])
          }
        />
      )}
    >
      {(treffgjennomføring, deltakendeArbeidsgivere) => (
        <div
          ref={stegstartRef}
          style={{ scrollMarginBlockStart: 'var(--ax-space-20)' }}
        >
          <VStack gap='space-24'>
            {tilstandErUbekreftet && (
              <DatagrunnlagFeil
                henter={henterPåNytt}
                onHentPåNytt={prøvHentingPåNytt}
                tittel='Tilstanden er ubekreftet'
                beskrivelse='Vi kunne ikke hente oppdatert gjennomføring. Endringene kan være lagret. Hent på nytt før du fortsetter.'
              />
            )}
            <fieldset disabled={tilstandErUbekreftet} className='min-w-0'>
              <Steginnhold
                aktivtSteg={aktivtSteg}
                erWorkOp={erWorkOp}
                rekrutteringstreffId={rekrutteringstreffId}
                treffgjennomføring={treffgjennomføring}
                arbeidsgivere={deltakendeArbeidsgivere}
                oppdatering={oppdatering}
                onLagringsstatusEndret={setLagringPågår}
                onTilbake={() => {
                  if (forrigeSteg) byttSteg(forrigeSteg.id);
                }}
                onNeste={() => {
                  if (nesteSteg) byttSteg(nesteSteg.id);
                }}
                nesteknappTekst={`Gå til ${nesteSteg?.tittel.toLowerCase() ?? ''}`}
              />
            </fieldset>
          </VStack>
        </div>
      )}
    </SWRLaster>
  );
};

export default Treffgjennomføring;
