'use client';

import {
  ChatExclamationmarkIcon,
  ExclamationmarkTriangleIcon,
  HandHeartIcon,
  SparklesIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Heading,
  Popover,
  ReadMore,
  Tag,
} from '@navikt/ds-react';
import { useState } from 'react';

interface KiAnalyseIntroProps {
  title?: string;
}

export default function KiAnalyseIntro({ title }: KiAnalyseIntroProps) {
  const [personopplysningerOpen, setPersonopplysningerOpen] = useState(false);
  const [diskriminerendeOpen, setDiskriminerendeOpen] = useState(false);

  const [personopplysningerAnchor, setPersonopplysningerAnchor] =
    useState<HTMLElement | null>(null);
  const [diskriminerendeAnchor, setDiskriminerendeAnchor] =
    useState<HTMLElement | null>(null);

  return (
    <div className='ml-2 space-y-3'>
      {title && (
        <>
          <div className='flex items-center gap-2'>
            <Heading level='2' size='medium'>
              {title}
            </Heading>
            <Tag data-color='meta-purple' variant='outline' size='medium'>
              KI-støtte
            </Tag>
          </div>
        </>
      )}
      <Box borderRadius='12' padding='space-12'>
        <div className='mb-3 flex items-start gap-2'>
          <ExclamationmarkTriangleIcon aria-hidden />
          <BodyShort size='small'>
            Ikke skriv personopplysninger og diskriminerende innhold.
          </BodyShort>
        </div>
        <div className='mb-3 flex items-start gap-2'>
          <SparklesIcon aria-hidden />
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <BodyShort size='small'>
                Innholdet sjekkes for{' '}
                <span
                  className='cursor-pointer underline'
                  onMouseEnter={(event) => {
                    setPersonopplysningerAnchor(event.currentTarget);
                    setPersonopplysningerOpen(true);
                  }}
                  onMouseLeave={() => {
                    setPersonopplysningerOpen(false);
                    setPersonopplysningerAnchor(null);
                  }}
                >
                  personopplysninger
                </span>{' '}
                og{' '}
                <span
                  className='cursor-pointer underline'
                  onMouseEnter={(event) => {
                    setDiskriminerendeAnchor(event.currentTarget);
                    setDiskriminerendeOpen(true);
                  }}
                  onMouseLeave={() => {
                    setDiskriminerendeOpen(false);
                    setDiskriminerendeAnchor(null);
                  }}
                >
                  diskriminerende
                </span>{' '}
                innhold av kunstig intelligens (KI) ✨
              </BodyShort>
            </div>
          </div>
        </div>

        <Popover
          open={personopplysningerOpen}
          onClose={() => {
            setPersonopplysningerOpen(false);
            setPersonopplysningerAnchor(null);
          }}
          anchorEl={personopplysningerAnchor}
        >
          <Popover.Content>
            <div className='space-y-3'>
              <BodyShort weight='semibold'>
                Eksempler på personopplysninger
              </BodyShort>
              <ul className='ml-5 list-disc space-y-1'>
                <li>
                  <BodyShort size='small'>Fullt navn</BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>Fødselsnummer</BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>
                    Adresse, telefonnummer, e-post
                  </BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>Etnisk opprinnelse</BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>Politisk oppfatning</BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>
                    Religion, eller filosofisk overbevisning
                  </BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>Fagforeningsmedlemskap</BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>Helseopplysninger</BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>
                    Seksuelle forhold, eller legning
                  </BodyShort>
                </li>
              </ul>
            </div>
          </Popover.Content>
        </Popover>

        {/* Popover for diskriminerende */}
        <Popover
          open={diskriminerendeOpen}
          onClose={() => {
            setDiskriminerendeOpen(false);
            setDiskriminerendeAnchor(null);
          }}
          anchorEl={diskriminerendeAnchor}
          className='max-w-md'
        >
          <Popover.Content>
            <div className='space-y-3'>
              <BodyShort weight='semibold'>
                Eksempler på diskriminerende innhold
              </BodyShort>
              <div>
                <BodyShort size='small' weight='semibold'>
                  Indirekte diskriminering
                </BodyShort>
                <ul className='mt-1 ml-5 list-disc space-y-1'>
                  <li>
                    <BodyShort size='small'>
                      Formuleringer som ekskluderer eller hindrer inkludering
                    </BodyShort>
                  </li>
                </ul>
              </div>
              <div>
                <BodyShort size='small' weight='semibold'>
                  Direkte diskriminering
                </BodyShort>
                <BodyShort size='small'>
                  Formuleringer som fører til usaklig forskjellsbehandling
                  basert på:
                </BodyShort>
                <ul className='mt-1 ml-5 list-disc space-y-1'>
                  <li>
                    <BodyShort size='small'>
                      kjønn, kjønnsidentitet eller kjønnsuttrykk
                    </BodyShort>
                  </li>
                  <li>
                    <BodyShort size='small'>
                      etnisitet, nasjonalitet eller hudfarge
                    </BodyShort>
                  </li>
                  <li>
                    <BodyShort size='small'>religion eller livssyn</BodyShort>
                  </li>
                  <li>
                    <BodyShort size='small'>funksjonsnedsettelse</BodyShort>
                  </li>
                  <li>
                    <BodyShort size='small'>seksuell orientering</BodyShort>
                  </li>
                  <li>
                    <BodyShort size='small'>alder</BodyShort>
                  </li>
                </ul>
              </div>
            </div>
          </Popover.Content>
        </Popover>

        <div className='mb-3 flex items-start gap-2'>
          <ChatExclamationmarkIcon aria-hidden />
          <BodyShort size='small'>
            KI-sjekken tar ikke høyde for retningslinjene for treff.
            Retningslinjene finner du på Navet.
          </BodyShort>
        </div>

        <div className='flex items-start gap-2'>
          <HandHeartIcon aria-hidden />
          <BodyShort size='small'>
            KI-sjekken hjelper deg med å vurdere innholdet. Du er ansvarlig for
            teksten.
          </BodyShort>
        </div>
      </Box>
      <div>
        <ReadMore header='KI-sjekken og konsekvenser'>
          <div className='space-y-2'>
            <Heading size='small' className='mb-1'>
              Hvordan fungerer KI-sjekken?
            </Heading>
            <div className='mb-6'>
              <ul className='list-none pl-0'>
                <li className="before:mr-1 before:content-['-']">
                  Dette er en testversjon. Husk, du kan ikke stole på
                  KI-sjekken.
                </li>
                <li className="before:mr-1 before:content-['-']">
                  KI-sjekken vil kunne overse ord og kontekst den burde reagere
                  på.
                </li>
                <li className="before:mr-1 before:content-['-']">
                  Den som oppretter rekrutteringstreffet er ansvarlig for
                  innholdet.
                </li>
              </ul>
            </div>
            <div className='mb-6'>
              KI sjekker:
              <ul className='list-none pl-0'>
                <li className="before:mr-1 before:content-['-']">
                  Diskriminerende uttrykk og språk som kan avsløre Nav-relasjon
                  eller sensitive personopplysninger.
                </li>
              </ul>
            </div>
            <div className='mb-6'>
              KI sjekker ikke:
              <ul className='list-none pl-0'>
                <li className="before:mr-1 before:content-['-']">
                  Om innholdet i rekrutteringstreffet er innenfor alle
                  retningslinjer.
                </li>
                <li className="before:mr-1 before:content-['-']">
                  Om det bryter med formålet til KI-sjekken og derfor kan være
                  et personvernbrudd.
                </li>
              </ul>
            </div>
            <Heading size='small' className='mb-1'>
              Konsekvenser
            </Heading>
            <div>
              Personopplysninger skal ikke skrives inn i felt som behandles av
              KI-sjekken. Dersom personopplysninger behandles av KI-sjekken, er
              det et avvik selv om opplysningene oppdages og fjernes
              umiddelbart, og uavhengig om rekrutteringstreffet var publisert
              med den teksten eller ikke. Ved avvik skal det meldes i
              avvikssystemet{' '}
              <a
                href='https://navno.sharepoint.com/sites/intranett-avvik'
                target='_blank'
                rel='noreferrer noopener'
                className='cursor-pointer underline'
              >
                Asys
              </a>{' '}
              når det skjer. <br />
              <br />
              Dersom innmelder er usikker på hvilke opplysninger som ble
              behandlet, kan det digitale utviklingsteamet for
              Rekrutteringsbistand kontaktes ved å opprette en sak i Porten for
              bistand til å avklare dette.
            </div>
          </div>
        </ReadMore>
      </div>
    </div>
  );
}
