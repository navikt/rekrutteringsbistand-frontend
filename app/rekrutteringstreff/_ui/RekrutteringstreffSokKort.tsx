'use client';

import { type RekrutteringstreffSokTreff } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  PublisertStatus,
  RekrutteringstreffKategori,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { statusTag } from '@/app/rekrutteringstreff/_ui/StatusTag';
import TreffEiereOgKontorer from '@/app/rekrutteringstreff/_ui/TreffEiereOgKontorer';
import {
  datostrengTilDato,
  formaterDato,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { skalViseVarselSjekk } from '@/app/rekrutteringstreff/_utils/FærreEnnTreJaVarselSjekk';
import { erEierAvTreff } from '@/app/rekrutteringstreff/_utils/eiere';
import ListeKort from '@/components/layout/ListeKort';
import WindowAnker from '@/components/window/WindowAnker';
import { rekrutteringstreffAnker } from '@/components/window/ankerLenker';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Miljø } from '@/util/miljø';
import {
  CalendarIcon,
  InformationSquareIcon,
  LocationPinIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Detail, Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
  treff: RekrutteringstreffSokTreff;
  miljø: string;
}

export const RekrutteringstreffSokKort: FunctionComponent<Props> = ({
  treff,
  miljø,
}) => {
  const {
    id,
    fraTid,
    tilTid,
    tittel,
    gateadresse,
    postnummer,
    poststed,
    kategori,
    status,
    publisertStatus,
    opprettetAvTidspunkt,
    eierOgKontor,
    antallJobbsøkereSvartJa,
    antallJobbsøkereFåttJobb,
  } = treff;

  const applikasjonskontekst = useApplikasjonContext();
  const innloggetNavIdent = applikasjonskontekst.brukerData.ident;
  const erEier = erEierAvTreff(eierOgKontor, innloggetNavIdent);
  const svarfristSomDato = datostrengTilDato(treff.svarfrist);

  const skalViseVarsel =
    erEier &&
    skalViseVarselSjekk(
      status,
      antallJobbsøkereSvartJa,
      antallJobbsøkereFåttJobb,
      svarfristSomDato,
    );

  const treffAnker = rekrutteringstreffAnker(id);
  const adresseDeler = [
    gateadresse?.trim(),
    [postnummer, poststed].filter(Boolean).join(' ').trim(),
  ].filter((del) => del);

  const tag = statusTag(
    status as RekrutteringstreffStatus,
    publisertStatus as PublisertStatus,
  );

  return (
    <ListeKort varsel={skalViseVarsel}>
      <div className='flex min-w-0 flex-col'>
        <div className='flex min-w-0 flex-wrap items-start justify-between gap-x-2'>
          <Heading size='small' level='2' className='min-w-0 shrink'>
            <WindowAnker
              windowRef={treffAnker.windowRef}
              href={treffAnker.href}
              stretchet
            >
              <span className='flex min-w-0 items-center gap-2.5'>
                {skalViseVarsel && (
                  <InformationSquareIcon
                    aria-hidden
                    color={'var(--ax-text-danger-decoration)'}
                    className={'shrink-0 text-2xl'}
                  />
                )}
                <span className='truncate'>{tittel}</span>
              </span>
            </WindowAnker>
          </Heading>

          <div className='mb-2 flex shrink-0 gap-1'>
            {kategori === RekrutteringstreffKategori.WORKOP && (
              <Tag data-color={'meta-purple'} size='small' variant='outline'>
                WorkOp
              </Tag>
            )}
            <Tag data-color={tag.color} size='small' variant='moderate'>
              {tag.label}
            </Tag>
          </div>
        </div>

        <div
          role='group'
          aria-label='Eiere, kontorer og opprettelsesdato'
          className='mb-1 flex flex-wrap items-center gap-2 text-sm'
        >
          {eierOgKontor.length > 0 && (
            <>
              <TreffEiereOgKontorer eierOgKontor={eierOgKontor} />
              <span aria-hidden>•</span>
            </>
          )}
          <span>Opprettet {formaterDato(opprettetAvTidspunkt)}</span>
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
              <BodyShort as='span' size='small' className='text-sm'>
                {adresseDeler.join(', ')}
              </BodyShort>
            </span>
          )}

          <Detail as='span'>Arbeidsgivere: {treff.antallArbeidsgivere}</Detail>
          <Detail as='span'>Jobbsøkere: {treff.antallJobbsøkere}</Detail>
          {miljø !== Miljø.ProdGcp && (
            <Detail as='span'>
              Fått jobb: {treff.antallJobbsøkereFåttJobb}
            </Detail>
          )}
        </div>
      </div>
    </ListeKort>
  );
};
