'use client';

import type { RomDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/useTreffgjennomføring';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { ArrowRightLeftIcon, DragVerticalIcon } from '@navikt/aksel-icons';
import {
  ActionMenu,
  BodyShort,
  Box,
  Button,
  HStack,
  Heading,
  VStack,
} from '@navikt/ds-react';
import type { DragEvent, FC } from 'react';

export interface Romhandlinger {
  aktivtMålromnummer: number | null;
  aktivPersonTreffId: string | null;
  deaktivert: boolean;
  onDraStart: (
    event: DragEvent<HTMLSpanElement>,
    personTreffId: string,
    romnummer: number,
  ) => void;
  onDraSlutt: () => void;
  onDraOver: (event: DragEvent<HTMLElement>, målromnummer: number) => void;
  onDraUt: (event: DragEvent<HTMLElement>) => void;
  onSlipp: (event: DragEvent<HTMLElement>, målromnummer: number) => void;
  onFlytt: (personTreffId: string, målromnummer: number) => void;
}

interface JobbsøkerProps {
  personTreffId: string;
  navn: string;
  romnummer: number;
  andreRomnumre: number[];
  romhandlinger: Romhandlinger;
}

const Jobbsøkerrad: FC<JobbsøkerProps> = ({
  personTreffId,
  navn,
  romnummer,
  andreRomnumre,
  romhandlinger,
}) => (
  <HStack gap='space-2' align='center' justify='space-between' wrap={false}>
    <HStack
      gap='space-2'
      align='center'
      wrap={false}
      data-drag-image
      className='min-w-0 flex-1'
    >
      <span
        aria-hidden
        draggable={!romhandlinger.deaktivert}
        onDragStart={(event) =>
          romhandlinger.onDraStart(event, personTreffId, romnummer)
        }
        onDragEnd={romhandlinger.onDraSlutt}
        className='inline-flex shrink-0 cursor-grab active:cursor-grabbing'
      >
        <DragVerticalIcon aria-hidden />
      </span>
      <BodyShort size='small' className='min-w-0 flex-1'>
        <AvkortetTekst>{navn}</AvkortetTekst>
      </BodyShort>
    </HStack>
    {andreRomnumre.length > 0 && (
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            type='button'
            size='small'
            variant='tertiary-neutral'
            icon={<ArrowRightLeftIcon aria-hidden />}
            aria-label={`Flytt ${navn} til et annet rom`}
            title='Flytt til rom'
            disabled={romhandlinger.deaktivert}
            data-flytt-person={personTreffId}
          />
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label='Flytt til rom'>
            {andreRomnumre.map((målromnummer) => (
              <ActionMenu.Item
                key={målromnummer}
                onSelect={() =>
                  romhandlinger.onFlytt(personTreffId, målromnummer)
                }
              >
                Rom {målromnummer}
              </ActionMenu.Item>
            ))}
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    )}
  </HStack>
);

interface Props {
  romdata: RomDTO;
  /** Romnumrene jobbsøkere kan flyttes til herfra. */
  andreRomnumre: number[];
  navnPåJobbsøker: (personTreffId: string) => string;
  idPrefiks: string;
  romhandlinger?: Romhandlinger;
  utskrift: boolean;
}

const Romkort: FC<Props> = ({
  romdata,
  andreRomnumre,
  navnPåJobbsøker,
  idPrefiks,
  romhandlinger,
  utskrift,
}) => {
  const headingId = `${idPrefiks}-rom-${romdata.romnummer}`;
  const erAktivtMålrom =
    romhandlinger?.aktivtMålromnummer === romdata.romnummer;

  return (
    <Box
      as='section'
      aria-labelledby={headingId}
      background={erAktivtMålrom ? 'accent-soft' : 'neutral-soft'}
      borderColor={
        romhandlinger
          ? erAktivtMålrom
            ? 'accent-strong'
            : 'neutral-subtle'
          : undefined
      }
      borderWidth={romhandlinger ? '2' : undefined}
      borderRadius='8'
      padding={romhandlinger ? 'space-6' : 'space-16'}
      flexBasis={utskrift ? '14rem' : undefined}
      minWidth={utskrift ? '14rem' : undefined}
      className={romhandlinger ? 'min-h-28 transition-colors' : undefined}
      onDragOver={
        romhandlinger
          ? (event) => romhandlinger.onDraOver(event, romdata.romnummer)
          : undefined
      }
      onDragLeave={romhandlinger?.onDraUt}
      onDrop={
        romhandlinger
          ? (event) => romhandlinger.onSlipp(event, romdata.romnummer)
          : undefined
      }
    >
      <VStack gap='space-8'>
        <Heading id={headingId} level='4' size='xsmall'>
          Rom {romdata.romnummer}
        </Heading>

        {romdata.jobbsøkere.length === 0 ? (
          <BodyShort>Ingen jobbsøkere</BodyShort>
        ) : (
          <VStack as='ul' gap='space-4'>
            {romdata.jobbsøkere.map((personTreffId) => {
              const navn = navnPåJobbsøker(personTreffId);
              return (
                <Box
                  as='li'
                  key={personTreffId}
                  background='neutral-softA'
                  borderRadius='4'
                  padding={romhandlinger ? 'space-4' : 'space-8'}
                  className={
                    romhandlinger?.aktivPersonTreffId === personTreffId
                      ? 'opacity-60'
                      : undefined
                  }
                >
                  {romhandlinger ? (
                    <Jobbsøkerrad
                      personTreffId={personTreffId}
                      navn={navn}
                      romnummer={romdata.romnummer}
                      andreRomnumre={andreRomnumre}
                      romhandlinger={romhandlinger}
                    />
                  ) : (
                    <BodyShort>{navn}</BodyShort>
                  )}
                </Box>
              );
            })}
          </VStack>
        )}
      </VStack>
    </Box>
  );
};

export default Romkort;
