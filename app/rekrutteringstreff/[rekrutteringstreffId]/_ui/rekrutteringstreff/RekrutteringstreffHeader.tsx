'use client';

import HeaderActions from './HeaderActions';
import TabsNav from './TabsNav';
import {
  RekrutteringstreffBreadcrumbItem,
  RekrutteringstreffBreadcrumbs,
} from '@/app/rekrutteringstreff/_ui/RekrutteringstreffBreadcrumbs';
import PanelHeader from '@/components/layout/PanelHeader';
import { Loader } from '@navikt/ds-react';
import { forwardRef } from 'react';

export interface RekrutteringstreffHeaderProps {
  skalViseHeader: boolean;
  breadcrumbs: RekrutteringstreffBreadcrumbItem[];
  erIForhåndsvisning: boolean;
  jobbsøkereAntall: number;
  arbeidsgivereAntall: number;
  lagrerNoe: boolean;
  lagretTekst?: string;
  avlyst: boolean;
  activeStep: string;
  erPubliseringklar: boolean;
  harInvitert: boolean;
  tiltidspunktHarPassert: boolean;
  rekrutteringstreffId: string;
  oppdaterData: () => Promise<void>;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvlyst: () => void;
  onAvbrytRedigering: () => void;
  treff?: any;
  innleggHtmlFraBackend?: string | null;
  onRepubliser?: () => Promise<void>;
  republiserDisabled?: boolean;
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
      jobbsøkereAntall,
      arbeidsgivereAntall,
      lagrerNoe,
      lagretTekst,
      avlyst,
      activeStep,
      erPubliseringklar,
      harInvitert,
      tiltidspunktHarPassert,
      rekrutteringstreffId,
      oppdaterData,
      onToggleForhåndsvisning,
      onBekreftRedigerPublisert,
      onAvlyst,
      onAvbrytRedigering,
      treff,
      innleggHtmlFraBackend,
      onRepubliser,
      republiserDisabled,
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
              erIForhåndsvisning ? (
                <TabsNav
                  jobbsøkereAntall={jobbsøkereAntall}
                  arbeidsgivereAntall={arbeidsgivereAntall}
                />
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
                avlyst={avlyst}
                activeStep={activeStep as any}
                erIForhåndsvisning={erIForhåndsvisning}
                erPubliseringklar={erPubliseringklar}
                harInvitert={harInvitert}
                tiltidspunktHarPassert={tiltidspunktHarPassert}
                rekrutteringstreffId={rekrutteringstreffId}
                oppdaterData={oppdaterData}
                onToggleForhåndsvisning={onToggleForhåndsvisning}
                onBekreftRedigerPublisert={onBekreftRedigerPublisert}
                onAvlyst={onAvlyst}
                onAvbrytRedigering={onAvbrytRedigering}
                treff={treff}
                innleggHtmlFraBackend={innleggHtmlFraBackend}
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
