'use client';

import WindowFinnKandidater from '@/app/_windows/finn-kandidater-window/WindowFinnKandidater';
import WindowVisKandidat from '@/app/_windows/vis-kandidat-window/WindowVisKandidat';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import RedigerStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/RedigerStillingKnapp';
import FullførStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingKnapp';
import OmStillingen from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingen';
import OmStillingenHeader from '@/app/stilling/[stillingsId]/_ui/om-stillingen/OmStillingenHeader';
import StillingTabs from '@/app/stilling/[stillingsId]/_ui/tabs/StillingTabs';
import TabKnapper from '@/app/stilling/[stillingsId]/_ui/tabs/TabKnapper';
import FiltrertKandidatListeVisning from '@/app/stilling/[stillingsId]/kandidatliste/FiltrertKandidatListeVisning';
import KandidatlisteWrapper from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteWrapper';
import Fremdriftspanel from '@/components/Fremdriftspanel';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { useWindowContext } from '@/components/layout/windows/DynamicWindowContext';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { Alert, Tabs } from '@navikt/ds-react';
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
            erEier && (
              <Fremdriftspanel>
                <TilgangskontrollForInnhold
                  skjulVarsel
                  kreverEnAvRollene={[
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  ]}
                >
                  {/* <AvpubliserStilling />
        <AvsluttStillingKnapp
          kandidatlisteId={kandidatlisteInfo?.kandidatlisteId}
          besatteStillinger={besatteStillinger}
          antallStillinger={antallStillinger}
          kandidatlisteStatus={data?.status}
        /> */}

                  <div className='grid grid-cols-2 gap-2'>
                    <RedigerStillingKnapp />
                    <FullførStillingKnapp />
                  </div>
                </TilgangskontrollForInnhold>
              </Fremdriftspanel>
            )
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
        </SideLayout>
      </Tabs>
    </>
  );
}
