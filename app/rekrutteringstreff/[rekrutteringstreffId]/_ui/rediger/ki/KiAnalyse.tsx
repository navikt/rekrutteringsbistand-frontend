'use client';

import { SparklesIcon, ChatExclamationmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, ReadMore, Box } from '@navikt/ds-react';
import { HandHeartIcon } from 'lucide-react';
import { FC } from 'react';

const KiAnalyse: FC = () => {
  return (
    <div className='space-y-3 ml-2'>
      <Box.New background='neutral-moderate' borderRadius='xlarge' padding='3'>
        <div className='flex items-start gap-2 mb-3'>
          <SparklesIcon
            aria-hidden
            className='h-5 w-5 shrink-0 self-start mt-0.5'
          />
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <BodyShort size='small'>
                Innholdet sjekkes for personopplysninger og diskriminerende
                innhold av kunstig intelligens (KI) ✨
              </BodyShort>
            </div>
          </div>
        </div>

        <div className='flex items-start gap-2 mb-3'>
          <ChatExclamationmarkIcon
            aria-hidden
            className='h-5 w-5 shrink-0 self-start mt-0.5'
          />
          <BodyShort size='small'>
            KI-sjekken tar ikke høyde for retningslinjene for treff.
            Retningslinjene finner du på{' '}
            <a href='#' className='underline'>
              navet
            </a>
            .
          </BodyShort>
        </div>

        <div className='flex items-start gap-2'>
          <HandHeartIcon
            aria-hidden
            className='h-5 w-5 shrink-0 self-start mt-0.5'
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
              <ul className='list-disc ml-5 space-y-1'>
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
              <ul className='list-disc ml-5 space-y-1'>
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

export default KiAnalyse;
