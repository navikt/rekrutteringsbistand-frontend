import {
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { KandidatForespurtOmDelingSchema } from '../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
import { storForbokstavString } from '../../../../kandidat-sok/util';

enum KandidatHendelseValg {
  CV_DELT = 'CV-en er delt med arbeidsgiver',
  //   STILLING_DELT = 'Stillingen er delt med kandidaten',
  //   IKKE_INTERESSERT = 'Kandidaten er ikke interessert',
  //   IKKE_AKTUELL = 'Kandidaten er ikke aktuell',
  //   AKTUELL = 'Kandidaten er aktuell',
  IKKE_PRESENTERT = 'Kandidaten er ikke presenter',
  FATT_JOBBEN = 'Kandidaten har fått jobben',
  PRESENTERT = 'Kandidaten er presenter',
}

const utfallTilTittel: Record<string, string> = {
  PRESENTERT: KandidatHendelseValg.PRESENTERT,
  CV_DELT: KandidatHendelseValg.CV_DELT,
  IKKE_PRESENTERT: KandidatHendelseValg.IKKE_PRESENTERT,
  //   STILLING_DELT: KandidatHendelseValg.STILLING_DELT,
  //   IKKE_INTERESSERT: KandidatHendelseValg.IKKE_INTERESSERT,
  //   IKKE_AKTUELL: KandidatHendelseValg.IKKE_AKTUELL,
  //   AKTUELL: KandidatHendelseValg.AKTUELL,
  FATT_JOBBEN: KandidatHendelseValg.FATT_JOBBEN,
};

const HendelseBoks = ({
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
  kandidat,
  forespørselCvForKandidat,
}: {
  kandidat: kandidaterSchemaDTO;
  forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
}) => {
  return (
    <div>
      <Heading size='small' spacing>
        Hendelser
      </Heading>

      <VStack gap='4'>
        <HendelseBoks
          tittel='Ny kandidat'
          tekst={`Registrert av ${kandidat.lagtTilAv.navn} (${kandidat.lagtTilAv.ident})`}
          dato={kandidat.lagtTilTidspunkt}
          type='success'
        />
        {kandidat?.utfallsendringer?.length > 0 && (
          <>
            <hr className='opacity-30' />
            <Heading size='xsmall' spacing>
              Utfallsendringer
            </Heading>
          </>
        )}
        {kandidat?.utfallsendringer?.map((utfallsendring, index) => (
          <HendelseBoks
            key={index}
            tittel={
              utfallTilTittel[utfallsendring.utfall] || utfallsendring.utfall
            }
            tekst={`Registrert av ${utfallsendring.registrertAvIdent}`}
            dato={utfallsendring.tidspunkt}
            type={'success'}
          />
        ))}

        {forespørselCvForKandidat && forespørselCvForKandidat.length > 0 && (
          <>
            <hr className='opacity-30' />
            <Heading size='xsmall' spacing>
              Forespørsler om deling av CV
            </Heading>
          </>
        )}

        {forespørselCvForKandidat?.map((forespørsel, index) => (
          <HendelseBoks
            key={index}
            tittel={storForbokstavString(forespørsel.tilstand).replace(
              /_/g,
              ' ',
            )}
            tekst={
              forespørsel.svar
                ? forespørsel.svar.harSvartJa
                  ? `Svart ja av ${forespørsel.svar.svartAv.ident}`
                  : `Svart nei av ${forespørsel.svar.svartAv.ident}`
                : `Svarfrist ${format(new Date(forespørsel.svarfrist), 'dd. MMMM yyyy')}`
            }
            dato={forespørsel.deltTidspunkt}
            type={
              forespørsel.svar
                ? forespørsel.svar?.harSvartJa
                  ? 'success'
                  : 'error'
                : 'info'
            }
          />
        ))}
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
