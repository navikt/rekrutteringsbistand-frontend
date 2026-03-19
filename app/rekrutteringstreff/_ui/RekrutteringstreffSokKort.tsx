'use client';

import { type RekrutteringstreffSokTreff } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  SokStatusLabel,
  type SokStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  formaterDato,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import WindowAnker from '@/components/window/WindowAnker';
import { rekrutteringstreffAnker } from '@/components/window/ankerLenker';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { CalendarIcon, LocationPinIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
  treff: RekrutteringstreffSokTreff;
}

const statusTagVariant: Record<
  string,
  'info' | 'warning' | 'success' | 'neutral' | 'error'
> = {
  utkast: 'neutral',
  publisert: 'info',
  fullfort: 'success',
  avlyst: 'error',
};

export const RekrutteringstreffSokKort: FunctionComponent<Props> = ({
  treff,
}) => {
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
    opprettetAvTidspunkt,
    eiere,
    kontorer,
  } = treff;

  const treffAnker = rekrutteringstreffAnker(id);
  const adresseDeler = [
    gateadresse?.trim(),
    [postnummer, poststed].filter(Boolean).join(' ').trim(),
  ].filter((del) => del);

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
          <Tag size='small' variant={statusTagVariant[status] ?? 'neutral'}>
            {SokStatusLabel[status as SokStatus] ?? status}
          </Tag>
        </div>

        <Heading size='small' level='2' className='mb-1'>
          {tittel}
        </Heading>

        {adresseDeler.length > 0 && (
          <div className='mb-1 flex items-center gap-2'>
            <LocationPinIcon aria-hidden className='shrink-0' />
            <BodyShort>{adresseDeler.join(', ')}</BodyShort>
          </div>
        )}

        <div className='flex flex-wrap items-center gap-2 text-[var(--ax-text-neutral-subtle)]'>
          <PersonIcon aria-hidden className='shrink-0' />
          {eiere.length > 0 && (
            <Detail className='mr-0.5'>{`Opprettet av ${eiere[0]}`}</Detail>
          )}
          <Detail className='mr-0.5'>
            {formaterDato(opprettetAvTidspunkt)}
          </Detail>
          <Detail className='mr-0.5'>
            {`Antall arbeidsgivere: ${treff.antallArbeidsgivere}`}
          </Detail>
          <Detail className='mr-0.5'>
            {`Antall jobbsøkere: ${treff.antallJobbsokere}`}
          </Detail>
          {(eiere.length > 0 || kontorer.length > 0) && (
            <Detail>
              {[
                eiere.length > 0 && `Eiere: ${eiere.join(', ')}`,
                kontorer.length > 0 &&
                  kontorer.map((k) => hentNavkontorNavn(k)).join(', '),
              ]
                .filter(Boolean)
                .join(' · ')}
            </Detail>
          )}
        </div>
      </Box>
    </WindowAnker>
  );
};
