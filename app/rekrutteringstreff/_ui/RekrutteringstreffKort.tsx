'use client';

import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import StatusTag from '@/app/rekrutteringstreff/_ui/StatusTag';
import {
  formatterDato,
  formatterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/rekrutteringstreff';
import { CalendarIcon, LocationPinIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading, Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface RekrutteringstreffKortProps {
  rekrutteringstreff: RekrutteringstreffDTO;
}

export const RekrutteringstreffKort: FunctionComponent<
  RekrutteringstreffKortProps
> = ({ rekrutteringstreff }: RekrutteringstreffKortProps) => {
  const {
    id,
    fraTid,
    tilTid,
    tittel,
    beskrivelse,
    gateadresse,
    postnummer,
    poststed,
    opprettetAvPersonNavident,
    opprettetAvNavkontorEnhetId,
    opprettetAvTidspunkt,
  } = rekrutteringstreff;

  return (
    <Box.New className='mb-4 rounded-lg border border-[var(--ax-border-neutral)] p-4'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-2 mb-1'>
          <CalendarIcon aria-hidden />
          <Detail>{(fraTid && formatterDato(fraTid)) || 'Ukjent dato'}</Detail>
          {fraTid && tilTid && (
            <Detail>
              {formatterTidspunkt(fraTid)} - {formatterTidspunkt(tilTid)}
            </Detail>
          )}
        </div>
        <div className='mr-2'>
          <StatusTag id={id} />
        </div>
      </div>

      <Heading size='small' level='2' className='mb-1'>
        <Link href={`/rekrutteringstreff/${id}`}>{tittel}</Link>
      </Heading>
      <BodyShort className='mb-1'>{beskrivelse}</BodyShort>

      {(gateadresse || poststed || postnummer) && (
        <div className='mb-1 flex items-center gap-2'>
          <LocationPinIcon aria-hidden />
          <BodyShort>
            {gateadresse}, {postnummer} {poststed}
          </BodyShort>
        </div>
      )}

      <div className='flex items-center gap-2 text-gray-600'>
        <PersonIcon aria-hidden />
        <Detail className='mr-0.5'>{`Opprettet av ${opprettetAvPersonNavident}`}</Detail>
        <Detail className='mr-0.5'>{`${formatterDato(opprettetAvTidspunkt)}`}</Detail>
        <Detail>Nav kontor {opprettetAvNavkontorEnhetId}</Detail>
      </div>
    </Box.New>
  );
};
