import { CalendarIcon, LocationPinIcon, PersonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Detail, Heading, Link, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
  id: string;
  dato: string;
  tidspunkt: string;
  antallArbeidsgivere: number;
  tittel: string;
  beskrivelse: string;
  gateadresse: string;
  postnummer: string;
  poststed?: string;
  stedUrl?: string;
  opprettetAv: string;
  opprettetDato: string;
  navKontor: string;
  erPublisert: boolean;
}

export const RekrutteringstreffKort: FunctionComponent<Props> = ({
  id,
  dato,
  tidspunkt,
  antallArbeidsgivere,
  tittel,
  beskrivelse,
  gateadresse,
  postnummer,
  poststed,
  stedUrl,
  opprettetAv,
  opprettetDato,
  navKontor,
  erPublisert,
}) => {
  return (
    <Box className='mb-4 rounded-lg border border-[var(--a-border-default) p-4'>
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          <CalendarIcon aria-hidden />
          <Detail>{dato}</Detail>
          <Detail>{tidspunkt}</Detail>
          <Detail>{`${antallArbeidsgivere} arbeidsgivere`}</Detail>
        </div>
        {!erPublisert && (
          <Tag className={'mr-2 mb-4'} size='small' variant='warning'>
            Ikke publisert
          </Tag>
        )}
      </div>

      <Heading size='small' level='2' className='mb-2'>
        <Link href={`/rekrutteringstreff/${id}`}>{tittel}</Link>
      </Heading>
      <BodyShort className='mb-4'>{beskrivelse}</BodyShort>

      <div className='mb-4 flex items-center gap-2'>
        <LocationPinIcon aria-hidden />
        {stedUrl ? (
          <Link href={stedUrl} target='_blank'>
            {gateadresse}, {postnummer} {poststed}
          </Link>
        ) : (
          <BodyShort>
            {gateadresse}, {postnummer} {poststed}
          </BodyShort>
        )}
      </div>

      <div className='flex items-center gap-2 text-gray-600'>
        <PersonIcon aria-hidden />
        <Detail>{`Opprettet av ${opprettetAv} ${opprettetDato}`}</Detail>
        <Detail>{navKontor}</Detail>
      </div>
    </Box>
  );
};
