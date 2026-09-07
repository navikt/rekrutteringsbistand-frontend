'use client';

import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { type TreffgjennomføringDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/treffgjennomføringSchema';
import { useTreffgjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import Steginnhold from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Steginnhold';
import { useTreffgjennomføringNavigasjon } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/TreffgjennomføringNavigasjon';
import {
  finnNærmesteTilgjengeligeSteg,
  hentSynligeSteg,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import { useTreffgjennomføringFane } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/useTreffgjennomføringFane';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { VStack } from '@navikt/ds-react';
import { FC, useCallback, useEffect, useLayoutEffect, useRef } from 'react';

const Treffgjennomføring: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { erWorkOp } = useTreffgjennomføringFane();
  const treffgjennomføringHook = useTreffgjennomføring(rekrutteringstreffId);
  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const jobbsøkereHook = useJobbsøkere(rekrutteringstreffId);
  const { stegFraUrl, setStegFraUrl, byttSteg, setLagringPågår } =
    useTreffgjennomføringNavigasjon();
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

  const synligeSteg = hentSynligeSteg(erWorkOp);
  const treffgjennomføring = treffgjennomføringHook.data;
  const aktivtSteg = treffgjennomføring
    ? finnNærmesteTilgjengeligeSteg(stegFraUrl, treffgjennomføring, erWorkOp)
    : stegFraUrl;
  const stegposisjon = synligeSteg.findIndex((steg) => steg.id === aktivtSteg);
  const forrigeSteg = synligeSteg[stegposisjon - 1];
  const nesteSteg = synligeSteg[stegposisjon + 1];

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
      hooks={[treffgjennomføringHook, arbeidsgivereHook, jobbsøkereHook]}
    >
      {(treffgjennomføring, deltakendeArbeidsgivere, jobbsøkereData) => {
        if (!jobbsøkereData) return null;

        return (
          <div
            ref={stegstartRef}
            style={{ scrollMarginBlockStart: 'var(--ax-space-20)' }}
          >
            <VStack gap='space-24'>
              <Steginnhold
                aktivtSteg={aktivtSteg}
                erWorkOp={erWorkOp}
                rekrutteringstreffId={rekrutteringstreffId}
                treffgjennomføring={treffgjennomføring}
                arbeidsgivere={deltakendeArbeidsgivere}
                jobbsøkereData={jobbsøkereData}
                onTreffgjennomføringOppdatert={oppdaterTreffgjennomføring}
                onLagringsstatusEndret={setLagringPågår}
                onTilbake={() => {
                  if (forrigeSteg) byttSteg(forrigeSteg.id);
                }}
                onNeste={() => {
                  if (nesteSteg) byttSteg(nesteSteg.id);
                }}
                nesteknappTekst={`Gå til ${nesteSteg?.tittel.toLowerCase() ?? ''}`}
              />
            </VStack>
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default Treffgjennomføring;
