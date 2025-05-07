'use client';

import { isLocal } from '../../../util/env';
import { nyheter } from '../../nyheter';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { useThemeProvider } from '../../providers/ThemeProvider';
import DevSidebar from '../dev/DevSidebar';
import Nyheter from '../nyheter/Nyheter';
import useAntallUlesteNyheter from '../nyheter/useAntallUlesteNyheter';
import { TilgangskontrollForInnhold } from '../tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../tilgangskontroll/roller';
import ModiaKnapp from './components/ModiaKnapp';
import OpprettKnapp from './components/OpprettKnapp';
import VelgKontor from './components/VelgKontor';
import {
  MenySidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BriefcaseIcon,
  HouseIcon,
  MoonIcon,
  PersonTallShortIcon,
  ReceptionIcon,
  SunIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavigasjonItemProps {
  tekst: string;
  ikon: React.ReactNode;
  path: string;
  kreverRoller: Roller[] | null;
}

interface NavigasjonHandlingProps {
  tekst: string;
  ikon: React.ReactNode;
  onClick: () => void;
  kreverRoller: Roller[] | null;
}
const navigasjonListe: NavigasjonItemProps[] = [
  { tekst: 'Oversikt', ikon: <HouseIcon />, path: '/', kreverRoller: null },

  {
    tekst: 'Stillinger',
    ikon: <BriefcaseIcon />,
    path: '/stilling?brukStandardsok=true',
    kreverRoller: null,
  },
  {
    tekst: 'Kandidater',
    ikon: <PersonTallShortIcon />,
    path: '/kandidat',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
  {
    tekst: 'Rekrutteringstreff',
    ikon: <ReceptionIcon />,
    path: '/rekrutteringstreff',
    kreverRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
  },
  {
    tekst: 'Etterregistrering',
    ikon: <BriefcaseIcon />,
    path: '/etterregistrering',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
];

const SideLenke = (item: NavigasjonItemProps) => {
  const { open } = useSidebar();
  return (
    <TilgangskontrollForInnhold
      key={item.tekst}
      skjulVarsel
      kreverEnAvRollene={item.kreverRoller}
    >
      <Link href={item.path}>
        <Button variant='tertiary-neutral' icon={item.ikon}>
          {open && item.tekst}
        </Button>
      </Link>
    </TilgangskontrollForInnhold>
  );
};

const SideHandling = (item: NavigasjonHandlingProps) => {
  const { open } = useSidebar();
  return (
    <TilgangskontrollForInnhold
      key={item.tekst}
      skjulVarsel
      kreverEnAvRollene={item.kreverRoller}
    >
      <Button
        onClick={item.onClick}
        variant='tertiary-neutral'
        icon={item.ikon}
      >
        {open && item.tekst}
      </Button>
    </TilgangskontrollForInnhold>
  );
};

export function AppNavigasjon() {
  const { brukerData } = useApplikasjonContext();
  const { darkMode, setDarkMode } = useThemeProvider();
  const { open } = useSidebar();
  const [åpenNyheter, setÅpenNyheter] = useState<boolean>(false);

  const onFørsteBesøk = () => {
    setÅpenNyheter(true);
  };

  const [antallUlesteNyheter, , markerSomLest] = useAntallUlesteNyheter(
    nyheter,
    onFørsteBesøk,
  );

  useEffect(() => {
    if (åpenNyheter) {
      markerSomLest();
    }
  }, [åpenNyheter, markerSomLest]);

  return (
    <Sidebar collapsible='icon'>
      <div
        className={`flex justify-between py-2 ${open ? 'items-start px-4 ' : 'items-base px-2 '}`}
      >
        {open && (
          <BodyShort className='truncate '>
            {brukerData.fornavn} {brukerData.etternavn}
          </BodyShort>
        )}
        <MenySidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <OpprettKnapp />
        </SidebarGroup>
        <SidebarGroup
          className={`flex flex-col w-full gap-3 ${open ? 'items-start' : 'items-center'}`}
        >
          {navigasjonListe.map((item) => (
            <SideLenke key={item.tekst} {...item} />
          ))}
        </SidebarGroup>

        {isLocal && (
          <SidebarGroup>
            <DevSidebar />
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup
          className={`flex flex-col w-full gap-3 ${open ? 'items-start' : 'items-center'}`}
        >
          <div className='flex'>
            <Nyheter />
            <div
              className={`${antallUlesteNyheter > 0 ? '  top-1 right-0 h-3 w-3 rounded-full bg-[#0067c5]' : ''}`}
            />
          </div>
          {darkMode ? (
            <SideHandling
              onClick={() => setDarkMode(!darkMode)}
              tekst='Lys modus'
              ikon={<SunIcon />}
              kreverRoller={null}
            />
          ) : (
            <SideHandling
              kreverRoller={null}
              onClick={() => setDarkMode(!darkMode)}
              ikon={<MoonIcon />}
              tekst={'Mørk modus'}
            />
          )}

          <VelgKontor />
          <ModiaKnapp />
        </SidebarGroup>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
