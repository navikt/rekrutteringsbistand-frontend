import { Tabs } from '@navikt/ds-react/Tabs';
import { FunctionComponent } from 'react';
// import Nyheter from '../nyheter/Nyheter';
import Link from 'next/link';
import { Rolle } from '../tilgangskontroll/Roller';
import { TilgangskontrollForInnhold } from '../tilgangskontroll/TilgangskontrollForInnhold';

const tabs = [
  {
    tittel: 'Oversikt',
    path: '/',
  },
  {
    tittel: 'Stillinger',
    path: '/stillinger/stillingssok',
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
  // const { pathname }: any = useLocation();
  const pathname = '/';

  return (
    <Tabs>
      <Tabs.List>
        {tabs.map((tab, index) => (
          <TilgangskontrollForInnhold
            key={index}
            skjulVarsel
            kreverEnAvRollene={tab.kreverRoller}
          >
            <Link href={tab.path}>
              <Tabs.Tab key={tab.path} value={tab.tittel} label={tab.tittel} />
            </Link>
          </TilgangskontrollForInnhold>
        ))}
      </Tabs.List>
    </Tabs>
  );
};
