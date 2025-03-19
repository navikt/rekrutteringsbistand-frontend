import { TilgangskontrollForInnhold } from '../../../tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../../../tilgangskontroll/roller';
import NavigasjonKnapper from '../nyheter/NavigasjonKnapper';
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
    path: '/rekrutteringstreff',
    kreverRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
    // kreverRoller: [
    //   Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    //   Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    // ],
  },
  {
    tittel: 'Etterregistrering',
    path: '/etterregistrering',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
];

export const Navigeringsmeny: FunctionComponent = () => {
  const pathname = usePathname();
  const tabPath = `/${pathname.split('/')[1]}`;

  return (
    <div className='border-border-divider border-b'>
      <div className='mx-auto w-full max-w-[1440px] pl-8  pt-2 pr-8 pb-0'>
        <div className='mb-4 w-full flex justify-end lg:hidden'>
          <NavigasjonKnapper />
        </div>

        <div className='flex w-full flex-row items-center justify-between gap-4 md:gap-6'>
          <div className='w-full md:flex-grow'>
            <Tabs
              defaultValue={tabPath === '/' ? 'Oversikt' : tabPath}
              value={tabPath}
              className='w-full'
            >
              <Tabs.List className='flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible'>
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
                        value={tab.path.split('?')[0]}
                        className='whitespace-nowrap md:whitespace-normal text-sm md:text-base'
                      />
                    </Link>
                  </TilgangskontrollForInnhold>
                ))}
              </Tabs.List>
            </Tabs>
          </div>
          <div className='hidden lg:block'>
            <NavigasjonKnapper />
          </div>
        </div>
      </div>
    </div>
  );
};
