import { Tabs } from '@navikt/ds-react/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { Rolle } from '../../../../types/Roller';
import { TilgangskontrollForInnhold } from '../../../tilgangskontroll/TilgangskontrollForInnhold';
import Nyheter from '../nyheter/Nyheter';

const tabs = [
  {
    tittel: 'Oversikt',
    path: '/',
  },
  {
    tittel: 'Stillinger',
    path: '/stillingssok',
    queryParam: '?brukStandardsok=true',
  },
  {
    tittel: 'Kandidatsøk',
    path: '/kandidatsok',
    kreverRoller: [
      Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
  {
    tittel: 'Etterregistrering formidlinger',
    path: '/formidlinger',
    kreverRoller: [
      Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Rolle.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
];

export const Navigeringsmeny: FunctionComponent = () => {
  const pathname = usePathname();
  const tabPath = `/${pathname.split('/')[1]}`;

  return (
    <div className='max-w-screen-xl pt-2 mx-auto flex justify-between border-b items-center'>
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
                <Tabs.Tab key={tab.path} value={tab.path} label={tab.tittel} />
              </Link>
            </TilgangskontrollForInnhold>
          ))}
        </Tabs.List>
      </Tabs>
      <Nyheter />
    </div>
  );
};
