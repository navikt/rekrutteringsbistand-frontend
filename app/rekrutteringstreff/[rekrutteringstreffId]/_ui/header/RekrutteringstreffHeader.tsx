'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import { useErTreffEier } from '../useErTreffEier';
import { useRekrutteringstreffData } from '../useRekrutteringstreffData';
import { useRekrutteringstreffNavn } from '../useRekrutteringstreffNavn';
import HeaderActions from './HeaderActions';
import TabsNav from './TabsNav';
import { erEierAvTreff } from '@/app/rekrutteringstreff/_utils/eiere';
import PanelHeader from '@/components/layout/PanelHeader';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
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
  visKunOmTreffetOgFormidlinger?: boolean;
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
  visKunOmTreffetOgFormidlinger = false,
}) => {
  const { rekrutteringstreffId, treff } = useRekrutteringstreffData();
  const rekrutteringstreffNavn = useRekrutteringstreffNavn();
  const erTreffEier = useErTreffEier();
  const { harRolle, brukerData } = useApplikasjonContext();
  const erstattPath: [string, string] = [
    rekrutteringstreffId,
    rekrutteringstreffNavn,
  ];

  const erRegistrertEier =
    !!treff && erEierAvTreff(treff.eierOgKontor, brukerData.ident);

  const kanBliEier =
    !!treff &&
    !erRegistrertEier &&
    harRolle([
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
    ]);

  const handlinger = (
    <HeaderActions
      erTreffEier={erTreffEier}
      erRegistrertEier={erRegistrertEier}
      kanBliEier={kanBliEier}
      erIForhåndsvisning={erIForhåndsvisning}
      viserFullskjermForhåndsvisning={viserFullskjermForhåndsvisning}
      onToggleForhåndsvisning={onToggleForhåndsvisning}
      onBekreftRedigerPublisert={onBekreftRedigerPublisert}
      onAvbrytRedigering={onAvbrytRedigering}
      onPublisert={onPublisert}
    />
  );

  return (
    <div>
      {erTreffEier && (
        <PanelHeader
          fullskjermUrl={`/rekrutteringstreff/${rekrutteringstreffId}`}
        >
          <PanelHeader.Section
            erstattPath={erstattPath}
            tabs={
              visTabs &&
              erIForhåndsvisning &&
              !viserFullskjermForhåndsvisning ? (
                inTabsContext ? (
                  <Tabs.List>
                    <TabsNav
                      visKunOmTreffetOgFormidlinger={
                        visKunOmTreffetOgFormidlinger
                      }
                    />
                  </Tabs.List>
                ) : (
                  <Tabs defaultValue={RekrutteringstreffTabs.OM_TREFFET}>
                    <Tabs.List>
                      <TabsNav
                        visKunOmTreffetOgFormidlinger={
                          visKunOmTreffetOgFormidlinger
                        }
                      />
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
            actionsRight={handlinger}
          ></PanelHeader.Section>
        </PanelHeader>
      )}
      {!erTreffEier && (
        <PanelHeader
          className='bg-transparent'
          fullskjermUrl={`/rekrutteringstreff/${rekrutteringstreffId}`}
        >
          <PanelHeader.Section
            erstattPath={erstattPath}
            tabs={
              visTabs &&
              visKunOmTreffetOgFormidlinger &&
              !viserFullskjermForhåndsvisning ? (
                inTabsContext ? (
                  <Tabs.List>
                    <TabsNav visKunOmTreffetOgFormidlinger={true} />
                  </Tabs.List>
                ) : (
                  <Tabs defaultValue={RekrutteringstreffTabs.OM_TREFFET}>
                    <Tabs.List>
                      <TabsNav visKunOmTreffetOgFormidlinger={true} />
                    </Tabs.List>
                  </Tabs>
                )
              ) : undefined
            }
            actionsRight={handlinger}
          ></PanelHeader.Section>
        </PanelHeader>
      )}
    </div>
  );
};

export default RekrutteringstreffHeader;
