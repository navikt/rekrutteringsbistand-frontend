'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import HeaderActions from './HeaderActions';
import TabsNav from './TabsNav';
import { RekrutteringstreffFormValues } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/RekrutteringstreffForm';
import { useLagreInnlegg } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/hooks/lagring/useLagreInnlegg';
import { useLagreRekrutteringstreff } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/hooks/lagring/useLagreRekrutteringstreff';
import { useRekrutteringstreffValidering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/rediger/_ui/hooks/validering/useRekrutteringstreffValidering';
import AutoLagre from '@/components/autolagre/AutoLagre';
import PanelHeader from '@/components/layout/PanelHeader';
import { Tabs } from '@navikt/ds-react';
import { forwardRef, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

export interface RekrutteringstreffHeaderProps {
  skalViseHeader: boolean;
  erstattPath?: [originalSegment: string, nyLabel: string];
  erIForhåndsvisning: boolean;
  viserFullskjermForhåndsvisning?: boolean;
  jobbsøkereAntall: number;
  arbeidsgivereAntall: number;
  lagrerNoe: boolean;
  sisteLagret?: Date | null;
  skalViseAutoLagre?: boolean;
  erPubliseringklar: boolean;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvbrytRedigering: () => void;
  onPublisert?: () => void;
  inTabsContext?: boolean;
  treffEierVisning?: boolean;
}

const RekrutteringstreffHeader = forwardRef<
  HTMLDivElement,
  RekrutteringstreffHeaderProps
>(
  (
    {
      skalViseHeader,
      erstattPath,
      erIForhåndsvisning,
      viserFullskjermForhåndsvisning,
      jobbsøkereAntall,
      arbeidsgivereAntall,
      sisteLagret,
      skalViseAutoLagre = false,
      erPubliseringklar,
      onToggleForhåndsvisning,
      onBekreftRedigerPublisert,
      onAvbrytRedigering,
      onPublisert,
      inTabsContext = false,
      treffEierVisning,
    },
    ref,
  ) => {
    if (!skalViseHeader) return null;

    return (
      <div ref={ref} className='sticky top-0 z-40 bg-[var(--ax-bg-default)]'>
        <PanelHeader className='bg-transparent'>
          <PanelHeader.Section
            erstattPath={erstattPath}
            tabs={
              // Vis tabs kun i lesemodus (ikke i forhåndsvisning eller edit)
              erIForhåndsvisning && !viserFullskjermForhåndsvisning ? (
                inTabsContext ? (
                  <TabsNav
                    jobbsøkereAntall={jobbsøkereAntall}
                    arbeidsgivereAntall={arbeidsgivereAntall}
                  />
                ) : (
                  <Tabs defaultValue={RekrutteringstreffTabs.OM_TREFFET}>
                    <Tabs.List>
                      <TabsNav
                        jobbsøkereAntall={jobbsøkereAntall}
                        arbeidsgivereAntall={arbeidsgivereAntall}
                      />
                    </Tabs.List>
                  </Tabs>
                )
              ) : undefined
            }
            meta={
              skalViseAutoLagre ? (
                <RekrutteringstreffAutoLagre sisteLagret={sisteLagret} />
              ) : undefined
            }
            actionsRight={
              <HeaderActions
                erIForhåndsvisning={erIForhåndsvisning}
                viserFullskjermForhåndsvisning={viserFullskjermForhåndsvisning}
                erPubliseringklar={erPubliseringklar}
                onToggleForhåndsvisning={onToggleForhåndsvisning}
                onBekreftRedigerPublisert={onBekreftRedigerPublisert}
                onAvbrytRedigering={onAvbrytRedigering}
                onPublisert={onPublisert}
              />
            }
          ></PanelHeader.Section>
        </PanelHeader>
      </div>
    );
  },
);

interface RekrutteringstreffAutoLagreProps {
  sisteLagret?: Date | null;
}

const RekrutteringstreffAutoLagre = ({
  sisteLagret,
}: RekrutteringstreffAutoLagreProps) => {
  const form = useFormContext<RekrutteringstreffFormValues>();
  const {
    lagreMedValidering: lagreRekrutteringstreff,
    kanAutoLagre: kanAutoLagreRekrutteringstreff,
  } = useLagreRekrutteringstreff();
  const {
    lagreMedValidering: lagreInnlegg,
    kanAutoLagre: kanAutoLagreInnlegg,
  } = useLagreInnlegg();
  const { harKiFeil, tittelKiSjekket, innleggKiSjekket } =
    useRekrutteringstreffValidering();
  const alleKiSjekket = Boolean(
    (tittelKiSjekket ?? true) && (innleggKiSjekket ?? true),
  );

  const lagreAlt = useCallback(async () => {
    await lagreRekrutteringstreff();
    await lagreInnlegg();
  }, [lagreRekrutteringstreff, lagreInnlegg]);

  return (
    <AutoLagre
      form={form}
      onLagre={lagreAlt}
      autoLagringAktiv={Boolean(
        kanAutoLagreRekrutteringstreff && kanAutoLagreInnlegg,
      )}
      sisteLagretInitialt={sisteLagret ?? null}
      harKiFeil={harKiFeil}
      kiSjekket={alleKiSjekket}
    />
  );
};

RekrutteringstreffHeader.displayName = 'RekrutteringstreffHeader';

export default RekrutteringstreffHeader;
