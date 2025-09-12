'use client';

import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FremdriftspanelStilling from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/FremdriftspanelStilling';
import FremdriftspanelArbeidsplassen from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/arbeidsplassen/FremdriftspanelArbeidsplassen';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import OmStillingenHeader from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingenHeader';
import StillingTabs from '@/app/stilling/[stillingsId]/_ui/tabs/StillingTabs';
import TabKnapper from '@/app/stilling/[stillingsId]/_ui/tabs/TabKnapper';
import FiltrertKandidatListeVisning from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { Alert, Heading, Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { useRef } from 'react';

enum StillingFane {
  STILLING = 'stilling',
  KANDIDATER = 'kandidater',
}

export default function StillingsSidePage() {
  const [fane, setFane] = useQueryState('stillingFane', {
    defaultValue: StillingFane.STILLING,
    clearOnDefault: true,
  });
  const { erEier, kandidatlisteInfo, stillingsData, forhåndsvisData } =
    useStillingsContext();

  const printRef = useRef<HTMLDivElement>(null);

  const ugyldigStilling =
    stillingsData?.stilling?.medium === 'DIR' &&
    (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

  const fremdriftsPanel = (top?: boolean) => {
    if (stillingsData.stillingsinfo === null) {
      return <FremdriftspanelArbeidsplassen />;
    }

    return (
      !forhåndsvisData && erEier && <FremdriftspanelStilling dropDown={top} />
    );
  };

  return (
    <div className='@stilling' data-testid='stilling-side'>
      <Tabs defaultValue={fane} onChange={(val: any) => setFane(val)}>
        <SideLayout
          header={
            <PanelHeader
              fullskjermUrl={`/stilling/${stillingsData.stilling.uuid}`}
            >
              <PanelHeader.Section
                title={'Stillingsoppdrag'}
                back={{
                  fallbackPath: '/stilling',
                }}
                tabs={<StillingTabs />}
                actionsRight={<TabKnapper printRef={printRef} />}
              />
            </PanelHeader>
          }
          fremdriftspanel={fremdriftsPanel()}
          fremdriftspanelTop={fremdriftsPanel(true)}
        >
          <>
            {ugyldigStilling && (
              <Alert variant='error'>
                <Heading spacing size='small' level='3'>
                  Ugyldig stilling
                </Heading>
                <p>
                  Denne stillingen er ikke gyldig da det er en intern stilling
                  som mangler organisasjonsnummer.
                </p>
                <p> Stillingen er derfor ikke tilgjengelig for rekruttering.</p>
              </Alert>
            )}
            <Tabs.Panel value={StillingFane.STILLING}>
              <OmStillingenHeader />
              <OmStillingen printRef={printRef} />
            </Tabs.Panel>
            {kandidatlisteInfo?.kandidatlisteId && erEier && (
              <>
                <Tabs.Panel value={StillingFane.KANDIDATER}>
                  <KandidatlisteWrapper>
                    <FiltrertKandidatListeVisning />
                  </KandidatlisteWrapper>
                </Tabs.Panel>
              </>
            )}
          </>
        </SideLayout>
      </Tabs>
    </div>
  );
}
