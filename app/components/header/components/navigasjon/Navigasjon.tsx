import { TilgangskontrollForInnhold } from '../../../tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../tilgangskontroll/roller';
import Nyheter from '../nyheter/Nyheter';
import { Tabs } from '@navikt/ds-react/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';

const tabs = [
  {
    tittel: 'Oversikt',
    path: '/',
  },
  {
    tittel: 'Stillinger',
    path: '/stilling?brukStandardsok=true',
  },
  {
    tittel: 'Kandidatsøk',
    path: '/kandidat',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
  {
    tittel: 'Rekrutteringstreff',
    path: '/rekrutteringstreff-sok',
    kreverRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
    // kreverRoller: [
    //   Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    //   Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    // ],
  },
  {
    tittel: 'Etterregistrering',
    path: '/formidling',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
];

export const Navigeringsmeny: FunctionComponent = () => {
  const pathname = usePathname();
  const tabPath = `/${pathname.split('/')[1]}`;

  console.log('🎺 tabPath', tabPath);
  // const getActiveTabValue = () => {
  //   // First check if pathname exactly matches a tab path
  //   if (tabPath === '/') return '/';

  //   // Then check for tabs with visAktivPaths
  //   for (const tab of tabs) {
  //     // If tab has visAktivPaths property
  //     if (tab.visAktivPaths) {
  //       // Check if current pathname starts with any path in visAktivPaths
  //       if (
  //         tab.visAktivPaths.some((activePath) =>
  //           pathname.startsWith(activePath),
  //         )
  //       ) {
  //         return tab.path;
  //       }
  //     }
  //   }

  //   // Default to the tabPath (first segment)
  //   return tabPath;
  // };

  // const activeTabValue = getActiveTabValue();
  return (
    <div className='border-border-divider border-b'>
      <div className='mx-auto flex w-[var(--ax-breakpoint-2xl)] items-center justify-between p-4 pb-0'>
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
                <Link href={tab.path}>
                  <Tabs.Tab
                    key={tab.path}
                    label={tab.tittel}
                    // remove query from path
                    value={tab.path.split('?')[0]}
                  />
                </Link>
              </TilgangskontrollForInnhold>
            ))}
          </Tabs.List>
        </Tabs>
        <Nyheter />
      </div>
    </div>
  );
};
