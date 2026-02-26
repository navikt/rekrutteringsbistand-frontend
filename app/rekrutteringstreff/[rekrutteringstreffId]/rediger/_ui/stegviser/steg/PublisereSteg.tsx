'use client';

import {
  SjekklisteContainer,
  SjekklisteInfo,
  SjekklisteRad,
} from './Sjekkliste';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import SWRLaster from '@/components/SWRLaster';
import {
  BellIcon,
  EyeIcon,
  PersonGroupIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import {
  BodyShort,
  Detail,
  Heading,
  HStack,
  Loader,
  VStack,
} from '@navikt/ds-react';
import { startOfDay } from 'date-fns';
import { FC, Fragment } from 'react';
import { useFormContext } from 'react-hook-form';

const DEFAULT_TITTEL = 'Treff uten navn';

const sjekklisteData = [
  { id: 'navn', label: 'Navn' },
  { id: 'tidspunkt', label: 'Tidspunkt' },
  { id: 'svarfrist', label: 'Svarfrist' },
  { id: 'sted', label: 'Sted' },
  { id: 'omtreffet', label: 'Introduksjon' },
  { id: 'arbeidsgiver', label: 'Minst 1 arbeidsgiver' },
] as const;

const PublisereSteg: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const {
    treff: rekrutteringstreffData,
    innlegg: innleggData,
    rekrutteringstreffHook,
  } = useRekrutteringstreffData();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const { watch } = useFormContext();
  const tittelKiSjekket = Boolean(watch('tittelKiSjekket'));
  const tittelKiFeil = Boolean(watch('tittelKiFeil'));
  const innleggKiSjekket = Boolean(watch('htmlContentKiSjekket'));
  const innleggKiFeil = Boolean(watch('htmlContentKiFeil'));

  const fraDato = watch('fraDato') as Date | null | undefined;
  const fraTid = watch('fraTid') as string | undefined;
  const svarfristDato = watch('svarfristDato') as Date | null | undefined;
  const svarfristTid = watch('svarfristTid') as string | undefined;

  const erFremtidigDato = (dato: Date | null | undefined): boolean => {
    if (!dato) return false;
    return startOfDay(dato) >= startOfDay(new Date());
  };

  const harGyldigTidspunkt = erFremtidigDato(fraDato) && !!fraTid;
  const harGyldigSvarfrist = erFremtidigDato(svarfristDato) && !!svarfristTid;

  return (
    <SWRLaster
      hooks={[rekrutteringstreffHook, arbeidsgivereHook]}
      skeleton={<Loader size='medium' title='Laster sjekkliste status...' />}
    >
      {(rekrutteringstreff, arbeidsgivere) => {
        const tittel = rekrutteringstreff.tittel?.trim() ?? '';
        const checkedItems: Record<
          (typeof sjekklisteData)[number]['id'],
          boolean
        > = {
          arbeidsgiver: arbeidsgivere.length > 0,
          navn:
            tittel.length > 0 &&
            tittel !== DEFAULT_TITTEL &&
            tittelKiSjekket &&
            !tittelKiFeil,
          sted:
            !!rekrutteringstreff.gateadresse?.trim() &&
            !!rekrutteringstreff.poststed?.trim(),
          tidspunkt: harGyldigTidspunkt,
          svarfrist: harGyldigSvarfrist,
          omtreffet:
            (innleggData?.length ?? 0) > 0 &&
            innleggKiSjekket &&
            !innleggKiFeil,
        };

        return (
          <div className='flex-1 space-y-4'>
            <Heading level='2' size='medium'>
              Gjør klar til publisering
            </Heading>
            <SjekklisteContainer>
              <Detail spacing>
                Noen detaljer må være på plass før du publiserer treffet, og kan
                invitere jobbsøkere.
              </Detail>

              {sjekklisteData.map((item) => {
                const erOppfylt = !!checkedItems[item.id];
                return (
                  <Fragment key={item.id}>
                    <SjekklisteRad erOppfylt={erOppfylt} label={item.label} />
                  </Fragment>
                );
              })}

              <SjekklisteInfo>
                <VStack gap='space-8'>
                  <Heading level='3' size='small'>
                    Hva skjer etter publisering?
                  </Heading>
                  <VStack gap='space-8'>
                    <HStack gap='space-8' align='start'>
                      <div className='mt-0.5 w-6 flex-none'>
                        <EyeIcon
                          fontSize='1.5rem'
                          aria-hidden
                          color='var(--ax-text-neutral-subtle)'
                        />
                      </div>
                      <BodyShort className='flex-1' textColor='subtle'>
                        Treffet blir synlig for kollegaene dine.
                      </BodyShort>
                    </HStack>

                    <HStack gap='space-8' align='start'>
                      <div className='mt-0.5 w-6 flex-none'>
                        <PersonGroupIcon
                          fontSize='1.5rem'
                          aria-hidden
                          color='var(--ax-text-neutral-subtle)'
                        />
                      </div>
                      <BodyShort className='flex-1' textColor='subtle'>
                        De kan finne og foreslå folk som kan være med. Du kan
                        også finne folk selv.
                      </BodyShort>
                    </HStack>

                    <HStack gap='space-8' align='start'>
                      <div className='mt-0.5 w-6 flex-none'>
                        <TasklistIcon
                          fontSize='1.5rem'
                          aria-hidden
                          color='var(--ax-text-neutral-subtle)'
                        />
                      </div>
                      <BodyShort className='flex-1' textColor='subtle'>
                        Du velger hvem som skal inviteres.
                      </BodyShort>
                    </HStack>

                    <HStack gap='space-8' align='start'>
                      <div className='mt-0.5 w-6 flex-none'>
                        <BellIcon
                          fontSize='1.5rem'
                          aria-hidden
                          color='var(--ax-text-neutral-subtle)'
                        />
                      </div>
                      <BodyShort className='flex-1' textColor='subtle'>
                        Inviterte får beskjed, et kort i aktivitetsplanen, og
                        kan svare.
                      </BodyShort>
                    </HStack>
                  </VStack>
                </VStack>
              </SjekklisteInfo>
            </SjekklisteContainer>
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default PublisereSteg;
