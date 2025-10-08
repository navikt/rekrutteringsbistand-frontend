'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import HeaderActions from './HeaderActions';
import TabsNav from './TabsNav';
import {
  RekrutteringstreffBreadcrumbItem,
  RekrutteringstreffBreadcrumbs,
} from '@/app/rekrutteringstreff/_ui/RekrutteringstreffBreadcrumbs';
import PanelHeader from '@/components/layout/PanelHeader';
import { Loader, Tabs } from '@navikt/ds-react';
import { forwardRef } from 'react';

export interface RekrutteringstreffHeaderProps {
  skalViseHeader: boolean;
  breadcrumbs: RekrutteringstreffBreadcrumbItem[];
  erIForhåndsvisning: boolean;
  viserFullskjermForhåndsvisning?: boolean;
  jobbsøkereAntall: number;
  arbeidsgivereAntall: number;
  lagrerNoe: boolean;
  lagretTekst?: string;
  erPubliseringklar: boolean;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvbrytRedigering: () => void;
  onPublisert?: () => void;
  onRepubliser?: () => Promise<void>;
  republiserDisabled?: boolean;
  inTabsContext?: boolean;
}

const RekrutteringstreffHeader = forwardRef<
  HTMLDivElement,
  RekrutteringstreffHeaderProps
>(
  (
    {
      skalViseHeader,
      breadcrumbs,
      erIForhåndsvisning,
      viserFullskjermForhåndsvisning,
      jobbsøkereAntall,
      arbeidsgivereAntall,
      lagrerNoe,
      lagretTekst,
      erPubliseringklar,
      onToggleForhåndsvisning,
      onBekreftRedigerPublisert,
      onAvbrytRedigering,
      onPublisert,
      onRepubliser,
      republiserDisabled,
      inTabsContext = false,
    },
    ref,
  ) => {
    if (!skalViseHeader) return null;

    return (
      <div ref={ref} className='sticky top-0 z-40 bg-[var(--ax-bg-default)]'>
        <PanelHeader className='bg-transparent'>
          <PanelHeader.Section
            actionsLeft={<RekrutteringstreffBreadcrumbs items={breadcrumbs} />}
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
              <div className='flex items-center gap-2'>
                {lagrerNoe && (
                  <span className='inline-flex items-center gap-1 text-xs text-muted-foreground'>
                    <Loader size='xsmall' title='Lagrer' />
                    Lagrer…
                  </span>
                )}
                {!lagrerNoe && lagretTekst}
              </div>
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
                onRepubliser={onRepubliser}
                republiserDisabled={republiserDisabled}
              />
            }
          ></PanelHeader.Section>
        </PanelHeader>
      </div>
    );
  },
);

RekrutteringstreffHeader.displayName = 'RekrutteringstreffHeader';

export default RekrutteringstreffHeader;
