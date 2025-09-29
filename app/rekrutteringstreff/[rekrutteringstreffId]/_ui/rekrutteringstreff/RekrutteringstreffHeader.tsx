'use client';

import HeaderActions from './HeaderActions';
import TabsNav from './TabsNav';
import PanelHeader from '@/components/layout/PanelHeader';
import { Loader } from '@navikt/ds-react';
import { forwardRef } from 'react';

export interface RekrutteringstreffHeaderProps {
  skalViseHeader: boolean;
  headerTittel: string;
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
  onÅpneForhåndsvisning: () => void;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvlyst: () => void;
}

const RekrutteringstreffHeader = forwardRef<
  HTMLDivElement,
  RekrutteringstreffHeaderProps
>(
  (
    {
      skalViseHeader,
      headerTittel,
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
      onÅpneForhåndsvisning,
      onToggleForhåndsvisning,
      onBekreftRedigerPublisert,
      onAvlyst,
    },
    ref,
  ) => {
    if (!skalViseHeader) return null;

    return (
      <div ref={ref} className='sticky top-0 z-40 bg-[var(--ax-bg-default)]'>
        <PanelHeader className='bg-transparent'>
          <PanelHeader.Section
            title={headerTittel}
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
                onÅpneForhåndsvisning={onÅpneForhåndsvisning}
                onToggleForhåndsvisning={onToggleForhåndsvisning}
                onBekreftRedigerPublisert={onBekreftRedigerPublisert}
                onAvlyst={onAvlyst}
              />
            }
          />
        </PanelHeader>
      </div>
    );
  },
);

RekrutteringstreffHeader.displayName = 'RekrutteringstreffHeader';

export default RekrutteringstreffHeader;
