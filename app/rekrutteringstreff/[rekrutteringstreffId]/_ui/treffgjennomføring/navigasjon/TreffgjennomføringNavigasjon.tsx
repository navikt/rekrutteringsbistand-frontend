'use client';

import {
  TREFFGJENNOMFØRING_STEG_QUERY_PARAM,
  erStegTilgjengelig,
  treffgjennomføringStegParser,
} from './treffgjennomføringSteg';
import { useTreffgjennomføringFane } from './useTreffgjennomføringFane';
import { åpneSteg } from './åpneSteg';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { useQueryState } from 'nuqs';
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { ZodError } from 'zod';

const useNavigasjon = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treffgjennomføring, erWorkOp, mutate } = useTreffgjennomføringFane();
  const [lagrerInnhold, setLagringPågår] = useState(false);
  const [lagrerSteg, setLagrerSteg] = useState(false);
  const [navigasjonsfeil, setNavigasjonsfeil] = useState<{
    steg: number;
    melding: string;
  } | null>(null);
  const stegbyttePågår = useRef(false);
  const [stegFraUrl, setStegFraUrl] = useQueryState(
    TREFFGJENNOMFØRING_STEG_QUERY_PARAM,
    treffgjennomføringStegParser.withOptions({ clearOnDefault: true }),
  );

  const byttSteg = useCallback(
    async (steg: number) => {
      if (lagrerInnhold || stegbyttePågår.current) return;
      if (
        !treffgjennomføring ||
        !erStegTilgjengelig(steg, treffgjennomføring, erWorkOp)
      ) {
        setNavigasjonsfeil({
          steg,
          melding: 'Steget er ikke tilgjengelig ennå.',
        });
        return;
      }
      stegbyttePågår.current = true;
      setLagrerSteg(true);
      setNavigasjonsfeil(null);
      try {
        await åpneSteg(
          rekrutteringstreffId,
          steg,
          treffgjennomføring,
          erWorkOp,
          async (oppdatert) => {
            await mutate(oppdatert, { revalidate: false });
          },
        );
        await setStegFraUrl(steg);
      } catch (error) {
        if (!(error instanceof RekbisError || error instanceof ZodError))
          throw error;
        setNavigasjonsfeil({
          steg,
          melding: 'Kunne ikke åpne steget. Prøv igjen.',
        });
      } finally {
        stegbyttePågår.current = false;
        setLagrerSteg(false);
      }
    },
    [
      lagrerInnhold,
      treffgjennomføring,
      erWorkOp,
      rekrutteringstreffId,
      mutate,
      setStegFraUrl,
    ],
  );

  return {
    stegFraUrl,
    setStegFraUrl,
    byttSteg,
    lagringPågår: lagrerInnhold || lagrerSteg,
    lagrerSteg,
    navigasjonsfeil,
    setLagringPågår,
  };
};

const NavigasjonContext = createContext<
  ReturnType<typeof useNavigasjon> | undefined
>(undefined);

export const TreffgjennomføringNavigasjonProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const navigasjon = useNavigasjon();
  return (
    <NavigasjonContext.Provider value={navigasjon}>
      {children}
    </NavigasjonContext.Provider>
  );
};

export const useTreffgjennomføringNavigasjon = () => {
  const navigasjon = useContext(NavigasjonContext);
  if (!navigasjon) {
    throw new Error(
      'useTreffgjennomføringNavigasjon må brukes innenfor TreffgjennomføringNavigasjonProvider',
    );
  }
  return navigasjon;
};
