'use client';

import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { getMiljø, Miljø } from '../../../util/miljø';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { useThemeProvider } from '../../providers/ThemeProvider';
import { TilgangskontrollForInnhold } from '../tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '../tilgangskontroll/roller';
import GiTilbakemelding from './components/GiTilbakemelding';
import OpprettKnapp from './components/OpprettKnapp';
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
  BriefcaseClockIcon,
  BriefcaseIcon,
  HouseIcon,
  MoonIcon,
  PersonTallShortIcon,
  ReceptionIcon,
  SidebarLeftIcon,
  SunIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Button } from '@navikt/ds-react';
import { MegaphoneIcon } from 'lucide-react';
import Link from 'next/link';

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
    // path: '/stilling?brukStandardsok=true',
    path: '/stilling',
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

  return (
    <Box.New
      borderRadius='xlarge'
      borderColor='info-subtleA'
      background='default'
      className='mt-3 h-[95vh] mb-3 ml-3'
    >
      <Sidebar collapsible='icon' variant='inset'>
        <SidebarHeader>
          <div className='flex items-baseline'>
            <Button
              size='small'
              onClick={toggleSidebar}
              variant='tertiary-neutral'
              icon={
                <SidebarLeftIcon style={{ color: 'var(--ax-text-accent)' }} />
              }
              className={open ? 'ml-3 mr-4 text-left justify-start' : ''}
            />
            {open && <OpprettKnapp />}
          </div>
        </SidebarHeader>
        <SidebarContent className='py-3'>
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
    </Box.New>
  );
}
