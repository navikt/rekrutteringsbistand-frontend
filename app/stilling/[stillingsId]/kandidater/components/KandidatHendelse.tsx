import {
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { utfallsendringerSchemaDTO } from '../../../../api/kandidat/schema.zod';

enum KandidatHendelseValg {
  CV_DELT = 'CV-en er delt med arbeidsgiver',
  //   STILLING_DELT = 'Stillingen er delt med kandidaten',
  //   IKKE_INTERESSERT = 'Kandidaten er ikke interessert',
  //   IKKE_AKTUELL = 'Kandidaten er ikke aktuell',
  //   AKTUELL = 'Kandidaten er aktuell',

  FATT_JOBBEN = 'Kandidaten har fått jobben',
  PRESENTERT = 'Kandidaten er presenter',
}

const utfallTilTittel: Record<string, string> = {
  PRESENTERT: KandidatHendelseValg.PRESENTERT,
  CV_DELT: KandidatHendelseValg.CV_DELT,
  //   STILLING_DELT: KandidatHendelseValg.STILLING_DELT,
  //   IKKE_INTERESSERT: KandidatHendelseValg.IKKE_INTERESSERT,
  //   IKKE_AKTUELL: KandidatHendelseValg.IKKE_AKTUELL,
  //   AKTUELL: KandidatHendelseValg.AKTUELL,
  FATT_JOBBEN: KandidatHendelseValg.FATT_JOBBEN,
};

const HendelseBok = ({
  tittel,
  tekst,
  dato,
  type,
}: {
  tittel: string;
  tekst: string;
  dato: string;
  type: 'success' | 'error' | 'info';
}) => {
  return (
    <Box
      background='surface-subtle'
      padding='4'
      borderRadius='large'
      shadow='xsmall'
      className={`pb-0 border-l-4 ${
        type === 'error'
          ? 'border-surface-danger'
          : type === 'success'
            ? 'border-surface-success'
            : 'border-surface-info'
      }`}
    >
      <div className='flex justify-between'>
        <div className='flex items-center gap-2 pb-2'>
          {type === 'error' ? (
            <XMarkOctagonIcon className='text-surface-danger' />
          ) : type === 'success' ? (
            <CheckmarkCircleIcon className='text-surface-success' />
          ) : (
            <ExclamationmarkTriangleIcon className='text-surface-info' />
          )}
          <BodyShort weight='semibold'>{tittel}</BodyShort>
        </div>
        <BodyShort size='small' textColor='subtle'>
          {format(new Date(dato), 'dd. MMMM yyyy HH:mm', { locale: nb })}
        </BodyShort>
      </div>
      <BodyLong spacing>{tekst}</BodyLong>
    </Box>
  );
};
const KandidatHendelser = ({
  utfallsendringer,
}: {
  utfallsendringer?: utfallsendringerSchemaDTO[];
}) => {
  return (
    <div>
      <Heading size='small' spacing>
        Hendelser
      </Heading>

      <VStack gap='4'>
        {utfallsendringer?.length ? (
          utfallsendringer?.map((utfallsendring, index) => (
            <HendelseBok
              key={index}
              tittel={
                utfallTilTittel[utfallsendring.utfall] || utfallsendring.utfall
              }
              tekst={`Registrert av ${utfallsendring.registrertAvIdent}`}
              dato={utfallsendring.tidspunkt}
              type={'success'}
            />
          ))
        ) : (
          <div>Ingen hendelser.</div>
        )}
        {/* <HendelseBok
          tittel='Sending av epost/SMS feilet'
          tekst='Sendt av Ola Nordmann (Z12345)'
          dato='2025-01-31'
          type='error'
        />
        <HendelseBok
          tittel='Stillingen er delt med kandidaten'
          tekst='Delt av Ola Nordmann (Z12345)'
          dato='2025-01-31'
          type='success'
        />
        <HendelseBok
          tittel='Svar fra kandidat om deling av CV'
          tekst='Svarfrist utløpt 2025-01-31'
          dato='2025-01-31'
          type='info'
        /> */}
      </VStack>
    </div>
  );
};

export default KandidatHendelser;
