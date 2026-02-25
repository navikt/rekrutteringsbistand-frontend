'use client';

import { SjekklisteInfo } from './Sjekkliste';
import { useAlleHendelser } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import { EyeSlashIcon, TableIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, HStack, Loader, VStack } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale/nb';
import { useMemo } from 'react';

const FullføreSteg = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { rekrutteringstreffHook } = useRekrutteringstreffData();
  const alleHendelserHook = useAlleHendelser(rekrutteringstreffId);
  const hendelser = alleHendelserHook.data;

  const fullførHendelse = useMemo(() => {
    if (!hendelser?.length) {
      return undefined;
    }

    return [...hendelser]
      .filter((h) => h.hendelsestype === 'FULLFØRT')
      .sort(
        (a, b) =>
          new Date(b.tidspunkt).getTime() - new Date(a.tidspunkt).getTime(),
      )[0];
  }, [hendelser]);

  const fullførtAvTekst = useMemo(() => {
    const navn = fullførHendelse?.aktørIdentifikasjon ?? 'Ukjent bruker';
    const tidspunkt = fullførHendelse?.tidspunkt
      ? format(new Date(fullførHendelse.tidspunkt), 'd. MMMM yyyy', {
          locale: nb,
        })
      : undefined;

    if (tidspunkt) {
      return `av ${navn} den ${tidspunkt}`;
    }

    return `av ${navn}`;
  }, [fullførHendelse]);

  const harFullførHendelse = !!fullførHendelse;

  return (
    <SWRLaster
      hooks={[rekrutteringstreffHook, alleHendelserHook]}
      skeleton={
        <div className='flex justify-center py-8'>
          <Loader size='large' title='Laster informasjon om fullføring...' />
        </div>
      }
    >
      {() => (
        <div className='flex-1 space-y-6'>
          <div className='flex flex-wrap items-baseline justify-between'>
            <Heading level='2' size='medium'>
              Treffet er fullført
            </Heading>
            {harFullførHendelse && (
              <BodyShort textColor='subtle'>{fullførtAvTekst}</BodyShort>
            )}
          </div>
          <SjekklisteInfo>
            <VStack gap='space-12'>
              <Heading level='3' size='small'>
                Hva som skjedde bak kulissene
              </Heading>
              <VStack gap='space-12'>
                <HStack gap='space-12' align='start'>
                  <div className='mt-[2px] w-6 flex-none'>
                    <TableIcon
                      fontSize='1.5rem'
                      aria-hidden
                      color='var(--ax-text-neutral-subtle)'
                    />
                  </div>
                  <BodyShort className='flex-1' textColor='subtle'>
                    Aktivitetskortet til alle som svarte ja ble flyttet til
                    &quot;Fullført&quot;-kolonnen i aktivitetsplanen.
                  </BodyShort>
                </HStack>
                <HStack gap='space-12' align='start'>
                  <div className='mt-[2px] w-6 flex-none'>
                    <EyeSlashIcon
                      fontSize='1.5rem'
                      aria-hidden
                      color='var(--ax-text-neutral-subtle)'
                    />
                  </div>
                  <BodyShort className='flex-1' textColor='subtle'>
                    Treffet vises ikke lenger som aktivt.
                  </BodyShort>
                </HStack>
              </VStack>
            </VStack>
          </SjekklisteInfo>
        </div>
      )}
    </SWRLaster>
  );
};

export default FullføreSteg;
