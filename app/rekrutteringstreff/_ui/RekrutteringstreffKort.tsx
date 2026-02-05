'use client';

import { RekrutteringstreffFraSøkeresultatDTO } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import StatusTag from '@/app/rekrutteringstreff/_ui/StatusTag';
import {
  formaterDato,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import WindowAnker from '@/components/window/WindowAnker';
import { rekrutteringstreffAnker } from '@/components/window/ankerLenker';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { CalendarIcon, LocationPinIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface RekrutteringstreffKortProps {
  rekrutteringstreff: RekrutteringstreffFraSøkeresultatDTO;
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
    status,
    opprettetAvPersonNavident,
    opprettetAvNavkontorEnhetId,
    opprettetAvTidspunkt,
    antallArbeidsgivere,
    antallJobbsøkere,
  } = rekrutteringstreff;

  const treffAnker = rekrutteringstreffAnker(id);

  return (
    <WindowAnker windowRef={treffAnker.windowRef} href={treffAnker.href}>
      <Box
        background={'neutral-softA'}
        borderRadius='12'
        padding={'space-20'}
        className={'mb-3'}
      >
        <div className='flex items-start justify-between'>
          <div className='mb-1 flex items-center gap-2'>
            <CalendarIcon aria-hidden className='shrink-0' />
            <Detail>{(fraTid && formaterDato(fraTid)) || 'Ukjent dato'}</Detail>
            {fraTid && tilTid && (
              <Detail>
                {formaterTidspunkt(fraTid)}–{formaterTidspunkt(tilTid)}
              </Detail>
            )}
          </div>
          <div className='mr-2'>
            <StatusTag status={status} />
          </div>
        </div>

        <Heading size='small' level='2' className='mb-1'>
          {tittel ?? 'Treff uten navn'}
        </Heading>
        <BodyShort className='mb-1'>{beskrivelse}</BodyShort>

        {(gateadresse || poststed || postnummer) && (
          <div className='mb-1 flex items-center gap-2'>
            <LocationPinIcon aria-hidden className='shrink-0' />
            <BodyShort>
              {gateadresse}, {postnummer} {poststed}
            </BodyShort>
          </div>
        )}

        <div className='flex flex-wrap items-center gap-2 text-[var(--ax-text-neutral-subtle)]'>
          <PersonIcon aria-hidden className='shrink-0' />
          <Detail className='mr-0.5'>{`Opprettet av ${opprettetAvPersonNavident}`}</Detail>
          <Detail className='mr-0.5'>{`${formaterDato(opprettetAvTidspunkt)}`}</Detail>
          <Detail className='mr-0.5'>{`Antall arbeidsgivere: ${antallArbeidsgivere}`}</Detail>
          <Detail className='mr-0.5'>{`Antall jobbsøkere: ${antallJobbsøkere}`}</Detail>
          <Detail>
            {`Nav kontor: ${hentNavkontorNavn(opprettetAvNavkontorEnhetId)}`}
          </Detail>
        </div>
      </Box>
    </WindowAnker>
  );
};
