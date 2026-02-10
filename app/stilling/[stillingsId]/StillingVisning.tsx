'use client';

import LeggKandidatTilKandidatliste from '@/app/kandidat/[kandidatNr]/LeggKandidatTilKandidatliste';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsBanner from '@/app/stilling/[stillingsId]/_ui/StillingsBanner';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import StillingHandlinger from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/StillingHandlinger';
import StillingTabs from '@/app/stilling/[stillingsId]/_ui/tabs/StillingTabs';
import FiltrertKandidatListeVisning from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { SidebarRightIcon } from '@navikt/aksel-icons';
import { Alert, Heading, Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';

enum StillingFane {
  STILLING = 'stilling',
  KANDIDATER = 'kandidater',
}

export interface StillingVisningProps {
  kandidatId?: string;
}

export default function StillingVisning({ kandidatId }: StillingVisningProps) {
  const [fane, setFane] = useQueryState('stillingFane', {
    defaultValue: StillingFane.STILLING,
    clearOnDefault: true,
  });
  const { erEier, kandidatlisteInfo, stillingsData } = useStillingsContext();

  const info = visStillingsDataInfo(stillingsData);
  const ugyldigStilling =
    !info.erUtkast &&
    stillingsData?.stilling?.medium === 'DIR' &&
    (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

  return (
    <div data-testid='stilling-side'>
      <Tabs defaultValue={fane} onChange={(val) => setFane(val)}>
        <SideLayout
          header={
            <PanelHeader
              fullskjermUrl={
                info.erFormidling
                  ? `/etterregistrering/${stillingsData.stilling.uuid}`
                  : `/stilling/${stillingsData.stilling.uuid}`
              }
            >
              <PanelHeader.Section
                tabs={
                  <>
                    <StillingsBanner />
                    <div className='flex'>
                      {kandidatId ? (
                        <>
                          <StillingTabs />
                          <div className='mt-3 ml-auto shrink-0'>
                            <LeggKandidatTilKandidatliste
                              kandidatId={kandidatId}
                              stillingId={stillingsData.stilling.uuid}
                            />
                          </div>
                        </>
                      ) : (
                        <StillingTabs />
                      )}
                      <SidepanelTrigger
                        className='mt-2'
                        icon={<SidebarRightIcon />}
                      >
                        Vis sidepanel
                      </SidepanelTrigger>
                    </div>
                  </>
                }
                actionsRight={<StillingHandlinger />}
              />
            </PanelHeader>
          }
        >
          {ugyldigStilling && (
            <Alert variant='error'>
              <Heading spacing size='small' level='3'>
                Ugyldig stilling
              </Heading>
              <p>
                Denne stillingen er ikke gyldig da det er en intern stilling som
                mangler organisasjonsnummer.
              </p>
              <p> Stillingen er derfor ikke tilgjengelig for rekruttering.</p>
            </Alert>
          )}
          <Tabs.Panel value={StillingFane.STILLING}>
            <OmStillingen />
          </Tabs.Panel>
          {kandidatlisteInfo?.kandidatlisteId && erEier && (
            <SideInnhold utenScroll>
              <Tabs.Panel value={StillingFane.KANDIDATER}>
                <KandidatlisteWrapper>
                  <FiltrertKandidatListeVisning
                    kunVisning={kandidatId !== undefined}
                  />
                </KandidatlisteWrapper>
              </Tabs.Panel>
            </SideInnhold>
          )}
        </SideLayout>
      </Tabs>
    </div>
  );
}
