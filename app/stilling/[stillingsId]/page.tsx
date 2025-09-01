'use client';

import WindowFinnKandidater from '@/app/_windows/finn-kandidater-window/WindowFinnKandidater';
import WindowVisKandidat from '@/app/_windows/vis-kandidat-window/WindowVisKandidat';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FremdriftspanelStilling from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/FremdriftspanelStilling';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import OmStillingenHeader from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingenHeader';
import StillingTabs from '@/app/stilling/[stillingsId]/_ui/tabs/StillingTabs';
import TabKnapper from '@/app/stilling/[stillingsId]/_ui/tabs/TabKnapper';
import FiltrertKandidatListeVisning from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { useWindowContext } from '@/components/layout/windows/DynamicWindowContext';
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
  const windowContext = useWindowContext();
  const {
    erEier,
    kandidatlisteInfo,
    stillingsData,
    kandidatlisteLaster,
    forhåndsvisData,
  } = useStillingsContext();

  const kandidatlistenErLukket =
    kandidatlisteInfo?.kandidatlisteStatus === Kandidatlistestatus.Lukket;

  const printRef = useRef<HTMLDivElement>(null);

  const ugyldigStilling =
    stillingsData?.stilling?.medium === 'DIR' &&
    (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

  const manglerOrgnummerVisning = (
    <Alert variant='error'>
      <Heading spacing size='small' level='3'>
        Ugyldig stilling
      </Heading>
      <p>
        Denne stillingen er ikke gyldig da det er en intern stilling som mangler
        organisasjonsnummer.
      </p>
      <p> Stillingen er derfor ikke tilgjengelig for rekruttering.</p>
    </Alert>
  );

  return (
    <>
      <WindowFinnKandidater stillingsId={stillingsData.stilling.uuid} />
      <WindowVisKandidat />
      <Tabs defaultValue={fane} onChange={(val: any) => setFane(val)}>
        <SideLayout
          header={
            <PanelHeader>
              <PanelHeader.Section
                title={stillingsData.stilling.title ?? ''}
                back={{
                  fallbackPath: '/stilling',
                }}
                tabs={<StillingTabs />}
                actionsRight={<TabKnapper printRef={printRef} />}
              />
            </PanelHeader>
          }
          sidepanel={
            windowContext?.isDynamic === false &&
            !forhåndsvisData &&
            erEier && <FremdriftspanelStilling />
          }
        >
          {!kandidatlisteLaster && kandidatlisteInfo === null && (
            <Alert variant='warning'>
              Det er ikke opprettet kandidatliste for denne stillingen.
            </Alert>
          )}

          {kandidatlistenErLukket && (
            <Alert variant={'info'}>
              Oppdraget er ferdigstilt og kandidatlisten er lukket
            </Alert>
          )}

          {ugyldigStilling ? (
            manglerOrgnummerVisning
          ) : (
            <>
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
          )}
        </SideLayout>
      </Tabs>
    </>
  );
}
