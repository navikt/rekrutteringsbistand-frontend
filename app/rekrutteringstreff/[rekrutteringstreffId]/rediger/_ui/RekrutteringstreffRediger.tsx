'use client';

import RekrutteringstreffHeader from '../../_ui/header/RekrutteringstreffHeader';
import { useRekrutteringstreffData } from '../../_ui/useRekrutteringstreffData';
import RekrutteringstreffRedigering from './RekrutteringstreffRedigering';
import {
  RekrutteringstreffAutoLagreProvider,
  RekrutteringstreffAutoLagreStatus,
} from './autolagring/RekrutteringstreffAutoLagringProvider';
import RekrutteringstreffForhåndsvisning from './forhåndsvisning/RekrutteringstreffForhåndsvisning';
import { useRepubliser } from './hooks/republiser/useRepubliser';
import Stegviser from './stegviser/Stegviser';
import { ManglendeTreffFeilmelding } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/ManglendeTreffFeilmelding';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const RekrutteringstreffRediger: FC = () => {
  const router = useRouter();
  const [visForhåndsvisning, setVisForhåndsvisning] = useState(false);
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const { treff, rekrutteringstreffHook } = useRekrutteringstreffData();

  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() =>
        window.scrollTo({ top: 0, behavior: 'smooth' }),
      );
    }
  }, []);

  const navigerTilVisning = useCallback(() => {
    router.push(`/rekrutteringstreff/${rekrutteringstreffId}`);
    scrollToTop();
  }, [router, rekrutteringstreffId, scrollToTop]);

  const handleToggleForhåndsvisning = (nyForhåndsvisning: boolean) => {
    setVisForhåndsvisning(nyForhåndsvisning);
    scrollToTop();
  };

  const onBekreftRedigerPublisert = () => {
    setVisForhåndsvisning(false);
    scrollToTop();
  };

  const onAvbrytRedigering = () => {
    navigerTilVisning();
  };

  const onPublisert = useCallback(() => {
    navigerTilVisning();
  }, [navigerTilVisning]);

  const { onRepubliser } = useRepubliser(navigerTilVisning, treff);

  const { handleSubmit } = useFormContext();
  const onSubmit = handleSubmit(async () => {
    await onRepubliser();
  });

  return (
    <SWRLaster
      hooks={[rekrutteringstreffHook]}
      egenFeilmelding={() => <ManglendeTreffFeilmelding />}
    >
      {(rekrutteringstreff) => {
        const stegviserInnhold = (
          <Stegviser
            onToggleForhåndsvisning={handleToggleForhåndsvisning}
            erIForhåndsvisning={false}
            rekrutteringstreffStatus={rekrutteringstreff.status}
          />
        );

        if (visForhåndsvisning) {
          return (
            <RekrutteringstreffAutoLagreProvider erIEditModus={true}>
              <SideLayout
                header={
                  <RekrutteringstreffHeader
                    erIForhåndsvisning={false}
                    viserFullskjermForhåndsvisning={true}
                    autolagreStatus={<RekrutteringstreffAutoLagreStatus />}
                    onToggleForhåndsvisning={handleToggleForhåndsvisning}
                    onBekreftRedigerPublisert={onBekreftRedigerPublisert}
                    onAvbrytRedigering={onAvbrytRedigering}
                    onPublisert={onPublisert}
                  />
                }
              >
                <SideInnhold>
                  <RekrutteringstreffForhåndsvisning />
                </SideInnhold>
              </SideLayout>
            </RekrutteringstreffAutoLagreProvider>
          );
        }

        return (
          <RekrutteringstreffAutoLagreProvider erIEditModus={true}>
            <form id='rekrutteringstreff-form' onSubmit={onSubmit} noValidate>
              <SideLayout
                sidepanel={stegviserInnhold}
                sidepanelBredde='320px'
                header={
                  <RekrutteringstreffHeader
                    erIForhåndsvisning={false}
                    autolagreStatus={<RekrutteringstreffAutoLagreStatus />}
                    onToggleForhåndsvisning={handleToggleForhåndsvisning}
                    onBekreftRedigerPublisert={onBekreftRedigerPublisert}
                    onAvbrytRedigering={onAvbrytRedigering}
                    onPublisert={onPublisert}
                  />
                }
              >
                <SideInnhold>
                  <RekrutteringstreffRedigering
                    onUpdated={rekrutteringstreffHook.mutate}
                  />
                </SideInnhold>
              </SideLayout>
            </form>
          </RekrutteringstreffAutoLagreProvider>
        );
      }}
    </SWRLaster>
  );
};

export default RekrutteringstreffRediger;
