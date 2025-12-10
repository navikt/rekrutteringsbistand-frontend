'use client';

import {
  ChatExclamationmarkIcon,
  HandHeartIcon,
  SparklesIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Box,
  Detail,
  Heading,
  Popover,
  ReadMore,
  Tag,
} from '@navikt/ds-react';
import { FC, useState } from 'react';

interface KiAnalyseIntroProps {
  title?: string;
}

const KiAnalyseIntro: FC<KiAnalyseIntroProps> = ({ title }) => {
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
            <Tag variant='alt1' size='medium'>
              KI-støtte
            </Tag>
          </div>
          <Detail className='text-[var(--ax-text-neutral-subtle)]'>
            Ikke skriv <u>personopplysninger</u> og <u>diskriminerende</u>{' '}
            innhold.
          </Detail>
        </>
      )}
      <Box.New background='neutral-moderate' borderRadius='xlarge' padding='3'>
        <div className='mb-3 flex items-start gap-2'>
          <SparklesIcon
            aria-hidden
            className='mt-0.5 h-5 w-5 shrink-0 self-start'
          />
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
                      Formuleringer som ekskluderer, hindrer inkludering eller
                      begrenser tilgang på grunnlag av kategoriene over (f.eks.
                      «Kun for menn under 30»).
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
          <ChatExclamationmarkIcon
            aria-hidden
            className='mt-0.5 h-5 w-5 shrink-0 self-start'
          />
          <BodyShort size='small'>
            KI-sjekken tar ikke høyde for retningslinjene for treff.
            Retningslinjene finner du på{' '}
            <a
              href='https://www.nav.no'
              target='_blank'
              className='cursor-pointer underline'
            >
              navet
            </a>
            .
          </BodyShort>
        </div>

        <div className='flex items-start gap-2'>
          <HandHeartIcon
            aria-hidden
            className='mt-0.5 h-5 w-5 shrink-0 self-start'
          />
          <BodyShort size='small'>
            KI-sjekken hjelper deg med å vurdere innholdet. Du er ansvarlig for
            teksten.
          </BodyShort>
        </div>
      </Box.New>

      <div>
        <ReadMore header='Hvordan fungerer KI-sjekken?'>
          <div className='space-y-3'>
            <BodyShort size='small'>
              KI-sjekken er en testversjon. Det betyr at du kan ikke stole på
              den. Den vil kunne overse ord og kontekst den burde reagere på.
            </BodyShort>

            <div>
              <br />
              <BodyShort size='small'>Den sjekker:</BodyShort>
              <br />
              <ul className='ml-5 list-disc space-y-1'>
                <li>
                  <BodyShort size='small'>Diskriminerende ord</BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>
                    Ord og kontekst som kan avsløre personens relasjon til Nav
                  </BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>
                    Ord og kontekst som kan være personopplysninger eller
                    opplysninger av særlig karakter
                  </BodyShort>
                </li>
              </ul>
            </div>

            <div>
              <br />
              <BodyShort size='small'>Den sjekker ikke:</BodyShort>
              <br />
              <ul className='ml-5 list-disc space-y-1'>
                <li>
                  <BodyShort size='small'>
                    Om innholdet i rekrutteringstreffet er innenfor alle
                    retningslinjer
                  </BodyShort>
                </li>
                <li>
                  <BodyShort size='small'>
                    Om det bryter med den juridiske formålsbegrensningen og
                    derfor kan være et personvernbrudd
                  </BodyShort>
                </li>
              </ul>
            </div>
          </div>
        </ReadMore>
      </div>
    </div>
  );
};

export default KiAnalyseIntro;
