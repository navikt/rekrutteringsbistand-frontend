'use client';

import { type RekrutteringstreffSokTreff } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  formaterDato,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import ListeKort from '@/components/layout/ListeKort';
import WindowAnker from '@/components/window/WindowAnker';
import { rekrutteringstreffAnker } from '@/components/window/ankerLenker';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
import { CalendarIcon, LocationPinIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Detail, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
  treff: RekrutteringstreffSokTreff;
}

function statusTag(status: string) {
  switch (status) {
    case 'utkast':
      return { label: 'Utkast', color: 'warning' as const };
    case 'publisert_apen':
      return { label: 'Publisert - åpent', color: 'info' as const };
    case 'publisert_frist_utgatt':
      return { label: 'Publisert - frist passert', color: 'warning' as const };
    case 'fullfort':
      return { label: 'Fullført', color: 'success' as const };
    case 'avlyst':
      return { label: 'Avlyst', color: 'danger' as const };
    default:
      return { label: status, color: 'neutral' as const };
  }
}

export const RekrutteringstreffSokKort: FunctionComponent<Props> = ({
  treff,
}) => {
  const {
    id,
    fraTid,
    tilTid,
    tittel,
    gateadresse,
    postnummer,
    poststed,
    status,
    opprettetAvTidspunkt,
    opprettetAv,
    eiere,
    kontorer,
  } = treff;

  const treffAnker = rekrutteringstreffAnker(id);
  const adresseDeler = [
    gateadresse?.trim(),
    [postnummer, poststed].filter(Boolean).join(' ').trim(),
  ].filter((del) => del);

  const tag = statusTag(status);

  return (
    <WindowAnker windowRef={treffAnker.windowRef} href={treffAnker.href}>
      <ListeKort>
        <div className='flex min-w-0 flex-col'>
          <div className='flex min-w-0 flex-wrap items-start justify-between gap-x-2'>
            <Heading size='small' level='2' className='min-w-0 shrink truncate'>
              {tittel}
            </Heading>
            <div className='mb-2 ml-auto flex flex-shrink-0 gap-1'>
              <Tag data-color={tag.color} size='small' variant='moderate'>
                {tag.label}
              </Tag>
            </div>
          </div>

          <div className='text-text-subtle flex min-w-0 flex-wrap gap-x-4 gap-y-1 text-sm'>
            <span className='flex items-center gap-1'>
              <CalendarIcon aria-hidden className='text-text-subtle' />
              {(fraTid && formaterDato(fraTid)) || 'Ukjent dato'}
              {fraTid && tilTid && (
                <Detail as='span'>
                  {formaterTidspunkt(fraTid)}–{formaterTidspunkt(tilTid)}
                </Detail>
              )}
            </span>

            {adresseDeler.length > 0 && (
              <span className='flex items-center gap-1'>
                <LocationPinIcon aria-hidden className='text-text-subtle' />
                <BodyShort as='span' size='small'>
                  {adresseDeler.join(', ')}
                </BodyShort>
              </span>
            )}

            <span className='flex items-center gap-1'>
              <PersonIcon aria-hidden className='text-text-subtle' />
              {[opprettetAv, ...eiere.filter((e) => e !== opprettetAv)].join(
                ', ',
              )}
              {kontorer.length > 0 &&
                ` · ${kontorer.map((k) => hentNavkontorNavn(k)).join(', ')}`}
            </span>

            <Detail as='span'>{formaterDato(opprettetAvTidspunkt)}</Detail>
            <Detail as='span'>
              Arbeidsgivere: {treff.antallArbeidsgivere}
            </Detail>
            <Detail as='span'>Jobbsøkere: {treff.antallJobbsokere}</Detail>
          </div>
        </div>
      </ListeKort>
    </WindowAnker>
  );
};
