import { Tabs } from '@navikt/ds-react/Tabs';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

import Link from 'next/link';
import { Roller } from '../../../tilgangskontroll/roller';
import { TilgangskontrollForInnhold } from '../../../tilgangskontroll/TilgangskontrollForInnhold';
import Nyheter from '../nyheter/Nyheter';

const tabs = [
  {
    tittel: 'Oversikt',
    path: '/',
  },
  {
    tittel: 'Stillinger',
    path: '/stillings-sok',
  },
  {
    tittel: 'Kandidatsøk',
    path: '/kandidat-sok',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
  {
    tittel: 'Rekrutteringstreff',
    path: '/rekrutteringstreff-sok',
    // kreverRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
  {
    tittel: 'Etterregistrering',
    path: '/formidlinger',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
];

export const Navigeringsmeny: FunctionComponent = () => {
  const pathname = usePathname();
  const tabPath = `/${pathname.split('/')[1].split('?')[0]}`;

  return (
    <div className='border-b border-border-divider'>
      <div className='max-w-screen-xl pt-2 mx-auto flex justify-between items-center'>
        <Tabs
          defaultValue={tabPath === '/' ? 'Oversikt' : tabPath}
          value={tabPath}
        >
          <Tabs.List>
            {tabs.map((tab, index) => (
              <TilgangskontrollForInnhold
                key={index}
                skjulVarsel
                kreverEnAvRollene={tab.kreverRoller}
              >
                <Tabs.Tab
                  key={tab.path}
                  label={tab.tittel}
                  value={tab.path}
                  as={Link}
                  href={
                    tab.path === '/stillings-sok'
                      ? '/stillings-sok?brukStandardsok=true'
                      : tab.path
                  }
                />
              </TilgangskontrollForInnhold>
            ))}
          </Tabs.List>
        </Tabs>
        <Nyheter />
      </div>
    </div>
  );
};
