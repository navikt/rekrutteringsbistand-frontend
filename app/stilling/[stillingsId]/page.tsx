'use client';

import { UmamiEvent } from '../../../util/umamiEvents';
import { Kandidatlistestatus } from '../../api/kandidat/schema.zod';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../components/tilgangskontroll/roller';
import { KandidatSøkMarkerteContextProvider } from '../../kandidat/KandidatSøkMarkerteContext';
import { useUmami } from '../../providers/UmamiContext';
import { useStillingsContext } from './StillingsContext';
import LeggTilKandidatTilStilling from './components/LeggTilKandidatTilStilling';
import FinnKandidaterFane from './finn-kandidater/FinnKandidaterFane';
import StillingsKandidater from './kandidater/StillingsKandidater';
import { StillingsKandidaterFilterProvider } from './kandidater/StillingsKandidaterFilterContext';
import OmStillingen from './omStillingen/OmStillingen';
import { Alert, Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';

enum StillingFane {
  STILLING = 'stilling',
  KANDIDATER = 'kandidater',
  FINN_KANDIDATER = 'finn-kandidater',
}

export default function StillingSide() {
  const { erEier, stillingsData, kandidatlisteInfo, erSlettet } =
    useStillingsContext();
  const { track } = useUmami();

  const kandidatlistenErLukket =
    kandidatlisteInfo?.kandidatlisteStatus === Kandidatlistestatus.Lukket;

  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: StillingFane.STILLING,
    clearOnDefault: true,
  });

  return (
    <KandidatSøkMarkerteContextProvider>
      <div
        data-testid='stilling-side'
        className={
          stillingsData?.stilling?.status === 'DELETED'
            ? 'pointer-events-none relative opacity-50'
            : ''
        }
      >
        {erSlettet && (
          <div className='pointer-events-none absolute inset-0 flex justify-center bg-white/60 pt-2'>
            <span className='text-5xl font-bold text-red-500'>
              Stillingen er slettet
            </span>
          </div>
        )}
        <Tabs defaultValue={fane} onChange={(val: any) => setFane(val)}>
          <Tabs.List className='flex w-full justify-between'>
            <div>
              <Tabs.Tab value={StillingFane.STILLING} label='Om stillingen' />
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                ]}
              >
                {kandidatlisteInfo?.kandidatlisteId && erEier && (
                  <Tabs.Tab
                    value={StillingFane.KANDIDATER}
                    label='Kandidater'
                  />
                )}
              </TilgangskontrollForInnhold>
              <TilgangskontrollForInnhold
                skjulVarsel
                kreverEnAvRollene={[
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                  Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                ]}
              >
                <Tabs.Tab
                  value={StillingFane.FINN_KANDIDATER}
                  label='Finn kandidater'
                  onClick={() => track(UmamiEvent.Stilling.tab_finn_kandidater)}
                />
              </TilgangskontrollForInnhold>
            </div>
            <div className='flex items-center'>
              {kandidatlistenErLukket ? (
                <Alert variant={'info'}>
                  Oppdraget er ferdigstilt og kandidatlisten er lukket
                </Alert>
              ) : (
                <div>
                  {kandidatlisteInfo?.kandidatlisteId && (
                    <TilgangskontrollForInnhold
                      skjulVarsel
                      kreverEnAvRollene={[
                        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                      ]}
                    >
                      <LeggTilKandidatTilStilling
                        stillingsId={stillingsData.stilling.uuid}
                        stillingsTittel={stillingsData.stilling.title}
                      />
                    </TilgangskontrollForInnhold>
                  )}
                </div>
              )}
            </div>
          </Tabs.List>
          <Tabs.Panel value={StillingFane.STILLING}>
            <OmStillingen />
          </Tabs.Panel>
          {kandidatlisteInfo?.kandidatlisteId && erEier && (
            <>
              <Tabs.Panel value={StillingFane.KANDIDATER}>
                <StillingsKandidaterFilterProvider>
                  <StillingsKandidater />
                </StillingsKandidaterFilterProvider>
              </Tabs.Panel>
            </>
          )}
          <TilgangskontrollForInnhold
            skjulVarsel
            kreverEnAvRollene={[
              Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
            ]}
          >
            <Tabs.Panel value={StillingFane.FINN_KANDIDATER}>
              <FinnKandidaterFane stillingsId={stillingsData.stilling.uuid} />
            </Tabs.Panel>
          </TilgangskontrollForInnhold>
        </Tabs>
      </div>
    </KandidatSøkMarkerteContextProvider>
  );
}
