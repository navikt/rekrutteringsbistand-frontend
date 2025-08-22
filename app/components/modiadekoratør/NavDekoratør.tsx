'use client';

import { getMiljø, Miljø } from '../../../util/miljø';
import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { LinkWithTitle, useGenerateLinks } from '../modia/genererModiaLenke';
import { Roller } from '../tilgangskontroll/roller';
import DevDekoratør from './DevDekoratør';
import UtviklerDekoratør from './UtviklerDekoratør';
import { MenuGridIcon } from '@navikt/aksel-icons';
import { Dropdown, InternalHeader, Spacer } from '@navikt/ds-react';
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
      <InternalHeader.Button as={Dropdown.Toggle}>
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

  const erLokal = process.env.NODE_ENV === 'development';
  const erUtvikler = harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]);

  const tittel = () => {
    if (process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE) {
      return 'Rekrutteringsbistand - Playwright';
    }
    if (erLokal) {
      return 'Rekrutteringsbistand - Lokalt';
    }
    if (getMiljø() === Miljø.DevGcp) {
      return 'Rekrutteringsbistand - Dev';
    }
    return 'Rekrutteringsbistand';
  };

  return (
    <div>
      <InternalHeader>
        <InternalHeader.Title as='h1'>{tittel()}</InternalHeader.Title>
        {erLokal && <DevDekoratør />}
        {erUtvikler && <UtviklerDekoratør />}
        <Spacer />
        <ModiaKnapper />
        <Dropdown>
          <InternalHeader.UserButton
            as={Dropdown.Toggle}
            name={`${brukerData.fornavn} ${brukerData.etternavn}`}
            description={`Enhet: ${valgtNavKontor?.navKontorNavn}`}
          />
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
    </div>
  );
};

export default NavDekoratør;
