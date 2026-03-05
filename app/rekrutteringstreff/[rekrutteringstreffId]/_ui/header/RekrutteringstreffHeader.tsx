'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import { useErTreffEier } from '../useErTreffEier';
import { useRekrutteringstreffNavn } from '../useRekrutteringstreffNavn';
import HeaderActions from './HeaderActions';
import TabsNav from './TabsNav';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import PanelHeader from '@/components/layout/PanelHeader';
import { Tabs } from '@navikt/ds-react';
import { FC } from 'react';

export interface RekrutteringstreffHeaderProps {
  erIForhåndsvisning: boolean;
  viserFullskjermForhåndsvisning?: boolean;
  autolagreStatus?: React.ReactNode;
  onToggleForhåndsvisning: (ny: boolean) => void;
  onBekreftRedigerPublisert: () => void;
  onAvbrytRedigering?: () => void;
  onPublisert?: () => void;
  inTabsContext?: boolean;
  visTabs?: boolean;
}

const RekrutteringstreffHeader: FC<RekrutteringstreffHeaderProps> = ({
  erIForhåndsvisning,
  viserFullskjermForhåndsvisning,
  autolagreStatus,
  onToggleForhåndsvisning,
  onBekreftRedigerPublisert,
  onAvbrytRedigering,
  onPublisert,
  inTabsContext = false,
  visTabs = true,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const rekrutteringstreffNavn = useRekrutteringstreffNavn();
  const erTreffEier = useErTreffEier();
  const erstattPath: [string, string] = [
    rekrutteringstreffId,
    rekrutteringstreffNavn,
  ];

  return (
    <div>
      {erTreffEier && (
        <PanelHeader>
          <PanelHeader.Section
            erstattPath={erstattPath}
            tabs={
              visTabs &&
              erIForhåndsvisning &&
              !viserFullskjermForhåndsvisning ? (
                inTabsContext ? (
                  <TabsNav />
                ) : (
                  <Tabs defaultValue={RekrutteringstreffTabs.OM_TREFFET}>
                    <Tabs.List>
                      <TabsNav />
                    </Tabs.List>
                  </Tabs>
                )
              ) : undefined
            }
            meta={
              autolagreStatus ? (
                <div className='flex items-center gap-2'>{autolagreStatus}</div>
              ) : undefined
            }
            actionsRight={
              <HeaderActions
                erIForhåndsvisning={erIForhåndsvisning}
                viserFullskjermForhåndsvisning={viserFullskjermForhåndsvisning}
                onToggleForhåndsvisning={onToggleForhåndsvisning}
                onBekreftRedigerPublisert={onBekreftRedigerPublisert}
                onAvbrytRedigering={onAvbrytRedigering}
                onPublisert={onPublisert}
              />
            }
          ></PanelHeader.Section>
        </PanelHeader>
      )}
      {!erTreffEier && (
        <PanelHeader className='bg-transparent'>
          <PanelHeader.Section erstattPath={erstattPath}></PanelHeader.Section>
        </PanelHeader>
      )}
    </div>
  );
};

export default RekrutteringstreffHeader;
