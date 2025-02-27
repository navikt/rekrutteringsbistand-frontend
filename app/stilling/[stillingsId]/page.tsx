'use client';
import { Alert, Tabs } from '@navikt/ds-react';

import { useQueryState } from 'nuqs';
import { Kandidatlistestatus } from '../../api/kandidat/schema.zod';
import { Roller } from '../../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import { KandidatSøkMarkerteContextProvider } from '../../kandidat-sok/KandidatSøkMarkerteContext';
import LeggTilKandidat from './components/LeggTilKandidatTilStilling';
import FinnKandidaterFane from './finn-kandidater/FinnKandidaterFane';
import StillingsKandidater from './kandidater/StillingsKandidater';
import { StillingsKandidaterFilterProvider } from './kandidater/StillingsKandidaterFilterContext';
import OmStillingen from './omStillingen/OmStillingen';
import { useStillingsContext } from './StillingsContext';

enum StillingFane {
  STILLING = 'stilling',
  KANDIDATER = 'kandidater',
  FINN_KANDIDATER = 'finn-kandidater',
}

export default function StillingSide() {
  const { erEier, stillingsData, kandidatlisteInfo, erSlettet } =
    useStillingsContext();

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
            ? 'relative opacity-50 pointer-events-none'
            : ''
        }
      >
        {erSlettet && (
          <div className='absolute inset-0 flex justify-center bg-white/60 pointer-events-none pt-2'>
            <span className='text-red-500 font-bold text-5xl'>
              Stillingen er slettet
            </span>
          </div>
        )}
        <Tabs defaultValue={fane} onChange={(val: any) => setFane(val)}>
          <Tabs.List className='flex mb-2 w-full justify-between'>
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
                />
              </TilgangskontrollForInnhold>
            </div>
            <div className='items-center flex'>
              {kandidatlistenErLukket ? (
                <Alert variant={'info'}>
                  Oppgradet er ferdigstilt og kandidatlisten er lukket
                </Alert>
              ) : (
                <>
                  {/* <TilgangskontrollForInnhold
                  skjulVarsel
                  kreverEnAvRollene={[
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                  ]}
                >
                  <Link
                    href={`/kandidat-sok/stilling/${stillingsData.stilling.uuid}`}
                  >
                    <Button
                      className='mr-2'
                      variant='secondary'
                      icon={<ArrowForwardIcon aria-hidden />}
                    >
                      Finn kandidater
                    </Button>
                  </Link>
                </TilgangskontrollForInnhold> */}
                  <TilgangskontrollForInnhold
                    skjulVarsel
                    kreverEnAvRollene={[
                      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
                      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
                    ]}
                  >
                    <LeggTilKandidat
                      stillingsId={stillingsData.stilling.uuid}
                      stillingsTittel={stillingsData.stilling.title}
                    />
                  </TilgangskontrollForInnhold>
                </>
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
