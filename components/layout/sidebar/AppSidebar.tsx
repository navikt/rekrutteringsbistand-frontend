'use client';

import GiTilbakemelding from './GiTilbakemelding';
import RekrutteringstreffPilotTilgang from '@/app/rekrutteringstreff/RekrutteringstreffPilotTilgang';
import UlesteNyheterWrapper from '@/components/layout/sidebar/UlesteNyheterWrapper';
import OpprettMeny from '@/components/opprett/OpprettMeny';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  BriefcaseClockIcon,
  BriefcaseIcon,
  CogIcon,
  HouseIcon,
  MegaphoneSpeakingIcon,
  PersonTallShortIcon,
  ReceptionIcon,
  SidebarLeftIcon,
} from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigasjonItemProps {
  tekst: string;
  ikon: React.ReactNode;
  path: string;
  kreverRoller: Roller[] | null;
}

const navigasjonListe: NavigasjonItemProps[] = [
  { tekst: 'Oversikt', ikon: <HouseIcon />, path: '/', kreverRoller: null },
  {
    tekst: 'Rekrutteringstreff',
    ikon: <ReceptionIcon />,
    path: '/rekrutteringstreff',
    kreverRoller: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
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
          size='small'
          variant={aktiv ? 'secondary-neutral' : 'tertiary-neutral'}
          aria-current={aktiv ? 'page' : undefined}
          aria-label={item.tekst}
          icon={item.ikon}
          className={open ? 'w-full justify-start text-left' : ''}
        >
          {open && item.tekst}
        </Button>
      </Link>
    </TilgangskontrollForInnhold>
  );
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible='icon' variant='sidebar' className='h-full' {...props}>
      <SidebarHeader>
        <div className='flex items-baseline pt-4'>
          <Button
            aria-pressed={true}
            size='small'
            onClick={toggleSidebar}
            variant='tertiary-neutral'
            aria-label={open ? 'Lukk meny' : 'Åpne meny'}
            icon={
              <SidebarLeftIcon style={{ color: 'var(--ax-text-accent)' }} />
            }
            className={open ? 'mr-4 ml-3 justify-start text-left' : ''}
          />
          {open && <OpprettMeny />}
        </div>
      </SidebarHeader>
      <SidebarContent className=''>
        <SidebarGroup
          className={`flex w-full flex-col gap-3 ${open ? 'items-start' : 'items-center'}`}
        >
          {/* <SidebarGroupLabel>Deg</SidebarGroupLabel> */}
          {navigasjonListe.map((item) => {
            if (item.tekst === 'Rekrutteringstreff') {
              return (
                <RekrutteringstreffPilotTilgang skjulInnhold key={item.tekst}>
                  <SideLenke {...item} />
                </RekrutteringstreffPilotTilgang>
              );
            }
            return <SideLenke key={item.tekst} {...item} />;
          })}
        </SidebarGroup>
        <SidebarGroup
          className={`mt-auto flex w-full flex-col gap-3 ${open ? 'items-start' : 'items-center'}`}
        >
          {/* <SidebarGroupLabel>Annet</SidebarGroupLabel> */}
          <div className={open ? 'w-full' : ''}>
            <UlesteNyheterWrapper>
              <SideLenke
                tekst={'Nyheter'}
                ikon={<MegaphoneSpeakingIcon />}
                path={'/nyheter'}
                kreverRoller={null}
              />
            </UlesteNyheterWrapper>
            {/* <div
              className={`${antallUlesteNyheter > 0 ? 'absolute  top-5 left-3 h-3 w-3 rounded-full bg-[#0067c5]' : ''}`}
            /> */}
          </div>
          <GiTilbakemelding />

          <SideLenke
            path={'/instillinger'}
            tekst='Instillinger'
            ikon={<CogIcon />}
            kreverRoller={null}
          />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
