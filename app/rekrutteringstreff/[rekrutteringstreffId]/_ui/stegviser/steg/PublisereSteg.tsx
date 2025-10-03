'use client';

import { useRekrutteringstreffData } from '../../hooks/useRekrutteringstreffData';
import {
  SjekklisteContainer,
  SjekklisteRad,
  SjekklisteInfo,
} from './Sjekkliste';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_contexts/RekrutteringstreffContext';
import {
  EyeIcon,
  PersonGroupIcon,
  TasklistIcon,
  BellIcon,
} from '@navikt/aksel-icons';
import {
  Detail,
  Loader,
  Heading,
  BodyShort,
  HStack,
  VStack,
} from '@navikt/ds-react';
import { FC, Fragment, useMemo } from 'react';

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

  const { isLoading: rekrutteringstreffLoading } = rekrutteringstreffHook;

  const { data: arbeidsgivereData, isLoading: arbeidsgivereLoading } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const innleggLoading = false; // Innlegg laster via useRekrutteringstreffData

  const checkedItems: Record<(typeof sjekklisteData)[number]['id'], boolean> =
    useMemo(() => {
      const tittel = rekrutteringstreffData?.tittel?.trim() ?? '';
      return {
        arbeidsgiver: (arbeidsgivereData?.length ?? 0) > 0,
        navn: tittel.length > 0 && tittel !== DEFAULT_TITTEL,
        sted:
          !!rekrutteringstreffData?.gateadresse?.trim() &&
          !!rekrutteringstreffData?.poststed?.trim(),
        tidspunkt: !!rekrutteringstreffData?.fraTid,
        svarfrist: !!rekrutteringstreffData?.svarfrist,
        omtreffet: (innleggData?.length ?? 0) > 0,
      };
    }, [arbeidsgivereData, rekrutteringstreffData, innleggData]);

  const loading =
    arbeidsgivereLoading || rekrutteringstreffLoading || innleggLoading;

  return (
    <div className='flex-1 space-y-4'>
      <Heading level='2' size='medium'>
        Gjør klar til publisering
      </Heading>

      <SjekklisteContainer>
        <Detail spacing>
          Noen detaljer være på plass før du publiserer treffet, og kan invitere
          jobbsøkere.
        </Detail>

        {loading && (
          <Loader size='medium' title='Laster sjekkliste status...' />
        )}

        {!loading &&
          sjekklisteData.map((item) => {
            const erOppfylt = !!checkedItems[item.id];
            return (
              <Fragment key={item.id}>
                <SjekklisteRad erOppfylt={erOppfylt} label={item.label} />
              </Fragment>
            );
          })}

        <SjekklisteInfo>
          <VStack gap='2'>
            <Heading level='3' size='small'>
              Hva skjer etter publisering?
            </Heading>
            <VStack gap='2'>
              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
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

              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
                  <PersonGroupIcon
                    fontSize='1.5rem'
                    aria-hidden
                    color='var(--ax-text-neutral-subtle)'
                  />
                </div>
                <BodyShort className='flex-1' textColor='subtle'>
                  De kan finne og foreslå folk som kan være med. Du kan også
                  finne folk selv.
                </BodyShort>
              </HStack>

              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
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

              <HStack gap='2' align='start'>
                <div className='flex-none w-6 mt-[2px]'>
                  <BellIcon
                    fontSize='1.5rem'
                    aria-hidden
                    color='var(--ax-text-neutral-subtle)'
                  />
                </div>
                <BodyShort className='flex-1' textColor='subtle'>
                  Inviterte får beskjed, et kort i aktivitetsplanen, og kan
                  svare.
                </BodyShort>
              </HStack>
            </VStack>
          </VStack>
        </SjekklisteInfo>
      </SjekklisteContainer>
    </div>
  );
};

export default PublisereSteg;
