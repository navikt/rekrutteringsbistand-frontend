'use client';

import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { isLocal } from '../../../util/env';
import { getMiljø, Miljø } from '../../../util/miljø';
import { nyheter } from '../../nyheter';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { useThemeProvider } from '../../providers/ThemeProvider';
import DevSidebar from '../dev/DevSidebar';
import useAntallUlesteNyheter from '../nyheter/useAntallUlesteNyheter';
import { TilgangskontrollForInnhold } from '../tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../tilgangskontroll/roller';
import GiTilbakemelding from './components/GiTilbakemelding';
import ModiaKnapp from './components/ModiaKnapp';
import OpprettKnapp from './components/OpprettKnapp';
import VelgKontor from './components/VelgKontor';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  ArrowsSquarepathIcon,
  BriefcaseIcon,
  HouseIcon,
  MoonIcon,
  PersonTallShortIcon,
  ReceptionIcon,
  SidebarLeftIcon,
  SunIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { MegaphoneIcon } from 'lucide-react';
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
      <Link href={item.path} className={open ? 'w-full' : ''}>
        <Button
          variant='tertiary-neutral'
          icon={item.ikon}
          className={open ? 'w-full text-left justify-start' : ''}
        >
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
        className={open ? 'w-full text-left justify-start' : ''}
      >
        {open && item.tekst}
      </Button>
    </TilgangskontrollForInnhold>
  );
};

export function AppNavigasjon() {
  const { brukerData } = useApplikasjonContext();
  const { darkMode, setDarkMode } = useThemeProvider();
  const { open, toggleSidebar } = useSidebar();
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
      <SidebarHeader>
        <SideHandling
          kreverRoller={null}
          onClick={toggleSidebar}
          tekst='Rekrutteringsbistand'
          ikon={<SidebarLeftIcon style={{ color: 'var(--ax-text-accent)' }} />}
        />
      </SidebarHeader>
      <SidebarContent className='py-3'>
        <SidebarGroup className='py-8'>
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

        <SidebarGroup
          className={`flex flex-col w-full gap-3 mt-auto ${open ? 'items-start' : 'items-center'}`}
        >
          <div className={open ? ' w-full' : ''}>
            <SideLenke
              tekst={'Nyheter'}
              ikon={<MegaphoneIcon />}
              path={'/nyheter'}
              kreverRoller={null}
            />
            <div
              className={`${antallUlesteNyheter > 0 ? 'absolute  top-5 left-3 h-3 w-3 rounded-full bg-[#0067c5]' : ''}`}
            />
          </div>
          <GiTilbakemelding />
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

          <SideLenke
            tekst={'Til gammel løsning'}
            ikon={<ArrowsSquarepathIcon />}
            path={
              getMiljø() === Miljø.ProdGcp
                ? 'https://rekrutteringsbistand.intern.nav.no/'
                : 'https://rekrutteringsbistand.intern.dev.nav.no/'
            }
            kreverRoller={null}
          />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className='flex items-baseline w-full justify-center'>
          <Avatar className='pt-4 mr-2'>
            <AvatarFallback>
              {brukerData.fornavn.charAt(0)}
              {brukerData.etternavn.charAt(0)}
            </AvatarFallback>
          </Avatar>
          {open && (
            <BodyShort className='truncate max-w-[80%]'>
              {brukerData.fornavn} {brukerData.etternavn}
            </BodyShort>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
