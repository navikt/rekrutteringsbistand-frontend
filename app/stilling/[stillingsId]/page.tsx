'use client';
import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Button, Tabs } from '@navikt/ds-react';

import Link from 'next/link';
import { useQueryState } from 'nuqs';
import { Roller } from '../../components/tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../../components/tilgangskontroll/TilgangskontrollForInnhold';
import LeggTilKandidat from './components/LeggTilKandidat';
import StillingsKandidater from './kandidater/StillingsKandidater';
import { StillingsKandidaterFilterProvider } from './kandidater/StillingsKandidaterFilterContext';
import OmStillingen from './omStillingen/OmStillingen';
import { useStillingsContext } from './StillingsContext';

export default function StillingSide() {
  const { erEier, stillingsData, kandidatlisteId, erSlettet } =
    useStillingsContext();

  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: 'stilling',
    clearOnDefault: true,
  });

  return (
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
            <Tabs.Tab value='stilling' label='Om stillingen' />
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              {kandidatlisteId && erEier && (
                <Tabs.Tab value='kandidater' label='Kandidater' />
              )}
            </TilgangskontrollForInnhold>
          </div>
          <div className='items-center flex'>
            <TilgangskontrollForInnhold
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
            </TilgangskontrollForInnhold>
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
          </div>
        </Tabs.List>
        <Tabs.Panel value='stilling'>
          <OmStillingen />
        </Tabs.Panel>
        {kandidatlisteId && erEier && (
          <Tabs.Panel value='kandidater'>
            <StillingsKandidaterFilterProvider>
              <StillingsKandidater />
            </StillingsKandidaterFilterProvider>
          </Tabs.Panel>
        )}
      </Tabs>
    </div>
  );
}
