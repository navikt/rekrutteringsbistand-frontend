'use client';

import GiTilbakemelding from './GiTilbakemelding';
import OpprettMeny from '@/components/felles/opprett/OpprettMeny';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { useThemeProvider } from '@/providers/ThemeProvider';
import {
  BriefcaseClockIcon,
  BriefcaseIcon,
  HouseIcon,
  MoonIcon,
  PersonTallShortIcon,
  ReceptionIcon,
  SidebarLeftIcon,
  SunIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { MegaphoneIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    tekst: 'Rekrutteringstreff',
    ikon: <ReceptionIcon />,
    path: '/rekrutteringstreff',
    kreverRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
  },
  {
    tekst: 'Stillingsoppdrag',
    ikon: <BriefcaseIcon />,
    path: '/stilling?brukStandardsok=true',
    kreverRoller: null,
  },
  {
    tekst: 'Etterregistreringer',
    ikon: <BriefcaseClockIcon />,
    path: '/etterregistrering',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
  {
    tekst: 'Jobbsøkere',
    ikon: <PersonTallShortIcon />,
    path: '/kandidat',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
  },
];

const SideLenke = (item: NavigasjonItemProps) => {
  const { open } = useSidebar();
  const pathname = usePathname();

  const basePath = item.path.split('?')[0];
  const aktiv =
    basePath === '/' ? pathname === '/' : pathname?.startsWith(basePath);
  return (
    <TilgangskontrollForInnhold
      key={item.tekst}
      skjulVarsel
      kreverEnAvRollene={item.kreverRoller}
    >
      <Link href={item.path} className={open ? 'w-full' : ''}>
        <Button
          variant={aktiv ? 'secondary-neutral' : 'tertiary-neutral'}
          aria-current={aktiv ? 'page' : undefined}
          aria-label={item.tekst}
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
        aria-label={item.tekst}
        icon={item.ikon}
        className={open ? 'w-full text-left justify-start' : ''}
      >
        {open && item.tekst}
      </Button>
    </TilgangskontrollForInnhold>
  );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { darkMode, setDarkMode } = useThemeProvider();
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar
      collapsible='icon'
      variant='sidebar'
      className='  h-full '
      {...props}
    >
      <SidebarHeader>
        <div className='flex items-baseline pt-4'>
          <Button
            aria-pressed={true}
            size='small'
            onClick={toggleSidebar}
            variant='tertiary-neutral'
            icon={
              <SidebarLeftIcon style={{ color: 'var(--ax-text-accent)' }} />
            }
            className={open ? 'ml-3 mr-4 text-left justify-start' : ''}
          />
          {open && <OpprettMeny />}
        </div>
      </SidebarHeader>
      <SidebarContent className=''>
        <SidebarGroup
          className={`flex flex-col w-full gap-3 ${open ? 'items-start' : 'items-center'}`}
        >
          {/* <SidebarGroupLabel>Deg</SidebarGroupLabel> */}
          {navigasjonListe.map((item) => (
            <SideLenke key={item.tekst} {...item} />
          ))}
        </SidebarGroup>
        <SidebarGroup
          className={`flex flex-col w-full gap-3 mt-auto ${open ? 'items-start' : 'items-center'}`}
        >
          {/* <SidebarGroupLabel>Annet</SidebarGroupLabel> */}
          <div className={open ? ' w-full' : ''}>
            <SideLenke
              tekst={'Nyheter'}
              ikon={<MegaphoneIcon />}
              path={'/nyheter'}
              kreverRoller={null}
            />
            {/* <div
              className={`${antallUlesteNyheter > 0 ? 'absolute  top-5 left-3 h-3 w-3 rounded-full bg-[#0067c5]' : ''}`}
            /> */}
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
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
