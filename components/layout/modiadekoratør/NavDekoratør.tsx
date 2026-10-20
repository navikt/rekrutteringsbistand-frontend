'use client';

import DevDekoratør from './DevDekoratør';
import UtviklerDekoratør from './UtviklerDekoratør';
import SesjonUtløptVarsel from '@/components/feilhåndtering/SesjonUtløptVarsel';
import {
  LinkWithTitle,
  useGenerateLinks,
} from '@/components/modia/genererModiaLenke';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { isLocal, isTestMode } from '@/util/env';
import { getMiljø, Miljø } from '@/util/miljø';
import {
  ChevronDownIcon,
  MenuGridIcon,
  PersonCircleIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Detail,
  Dropdown,
  GlobalAlert,
  InternalHeader,
  Spacer,
} from '@navikt/ds-react';
import { ArrowRight } from 'lucide-react';
import * as React from 'react';

const ModiaKnapper = () => {
  const links = useGenerateLinks();
  const mapLinks = (links: LinkWithTitle[]) => {
    return links?.map((link, index) => {
      return (
        <Dropdown.Menu.GroupedList.Item
          key={link.url + index}
          as='a'
          target='_blank'
          href={link.url + link.subPath}
        >
          {link.title}
        </Dropdown.Menu.GroupedList.Item>
      );
    });
  };

  return (
    <Dropdown>
      <InternalHeader.Button as={Dropdown.Toggle} className='px-2 sm:px-3'>
        <MenuGridIcon style={{ fontSize: '1.5rem' }} title='Modia meny' />
      </InternalHeader.Button>

      <Dropdown.Menu>
        {Object.keys(links).map((key) => {
          const section = links[key as keyof typeof links];
          return (
            <div key={key}>
              <Dropdown.Menu.GroupedList className='mb-2'>
                <Dropdown.Menu.GroupedList.Heading>
                  {section.title}
                </Dropdown.Menu.GroupedList.Heading>
                {mapLinks(section.links)}
              </Dropdown.Menu.GroupedList>
              <hr />
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const NavDekoratør: React.FC = () => {
  const { brukerData, valgtNavKontor, setValgtNavKontor, harRolle } =
    useApplikasjonContext();

  const erUtvikler = harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]);

  const tittel = () => {
    if (isTestMode) {
      return 'Rekrutteringsbistand - Playwright';
    }
    if (isLocal) {
      return 'Rekrutteringsbistand - Lokalt';
    }
    if (getMiljø() === Miljø.DevGcp) {
      return 'Rekrutteringsbistand - Dev';
    }
    return 'Rekrutteringsbistand';
  };

  return (
    <header className='sticky top-0 z-50 w-full'>
      {harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]) &&
        getMiljø() === Miljø.ProdGcp && (
          <GlobalAlert status='warning' className='sticky top-0 z-50'>
            <GlobalAlert.Header>
              <GlobalAlert.Title>
                Du er logget på som utvikler i produksjonsmiljø. Vær forsiktig!
              </GlobalAlert.Title>
            </GlobalAlert.Header>
          </GlobalAlert>
        )}
      <InternalHeader>
        <InternalHeader.Title
          as='h1'
          className='px-3 text-base sm:pr-5 sm:pl-6 sm:text-[length:inherit]'
        >
          {tittel()}
        </InternalHeader.Title>
        {(isLocal || erUtvikler) && (
          <div className='hidden md:flex'>
            {isLocal && <DevDekoratør />}
            {erUtvikler && <UtviklerDekoratør />}
          </div>
        )}
        <Spacer />
        <ModiaKnapper />
        <Dropdown>
          {/* Som InternalHeader.UserButton, men med bare ikon på smale skjermer (WCAG 1.4.10).
              Mobil først: Tailwind genererer ikke max-*-varianter i dette oppsettet. */}
          <InternalHeader.Button
            as={Dropdown.Toggle}
            className='aksel-internalheader__user-button gap-2 px-2 sm:gap-4 sm:pr-3 sm:pl-5'
          >
            <PersonCircleIcon
              aria-hidden
              className='sm:hidden'
              fontSize='1.5rem'
            />
            <div className='sr-only sm:not-sr-only'>
              <BodyShort size='small' as='div'>
                {`${brukerData.fornavn} ${brukerData.etternavn}`}
              </BodyShort>
              <Detail as='div'>{`Enhet: ${valgtNavKontor?.navKontorNavn}`}</Detail>
            </div>
            <ChevronDownIcon aria-hidden />
          </InternalHeader.Button>
          <Dropdown.Menu>
            <Dropdown.Menu.List>
              {brukerData.enheter.map((enhet) => (
                <Dropdown.Menu.List.Item
                  key={enhet.enhetId}
                  onClick={() =>
                    setValgtNavKontor({
                      navKontor: enhet.enhetId,
                      navKontorNavn: enhet.navn,
                    })
                  }
                >
                  {enhet.navn}
                  <Spacer />
                  <ArrowRight aria-hidden fontSize='1.5rem' />
                </Dropdown.Menu.List.Item>
              ))}
            </Dropdown.Menu.List>
          </Dropdown.Menu>
        </Dropdown>
      </InternalHeader>
      <SesjonUtløptVarsel />
    </header>
  );
};

export default NavDekoratør;
