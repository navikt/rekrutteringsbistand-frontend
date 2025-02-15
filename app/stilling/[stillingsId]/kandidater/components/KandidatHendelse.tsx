import {
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort, Box, Heading } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { KandidatForespurtOmDelingSchema } from '../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
import {
  EksternKanal,
  Sms,
} from '../../../../api/kandidatvarsel/kandidatvarsel';
import { storForbokstavString } from '../../../../kandidat-sok/util';
import { UtfallsEndringTyper } from './HendelseTag';

const UtfalsendringBeskrivelse = {
  [UtfallsEndringTyper.NY_KANDIDAT]: 'Ny kandidat',
  [UtfallsEndringTyper.DELT_MED_KANDIDAT]: 'CV-en er delt med arbeidsgiver',
  [UtfallsEndringTyper.SVAR_JA]: 'Kandidaten har svart ja',
  [UtfallsEndringTyper.SVAR_NEI]: 'Kandidaten har svart nei',
  [UtfallsEndringTyper.CV_DELT]: 'CV-en er delt med arbeidsgiver',
  [UtfallsEndringTyper.CV_SLETTET]: 'CV-en er slettet',
  [UtfallsEndringTyper.FÅTT_JOBBEN]: 'Kandidaten har fått jobben',
  [UtfallsEndringTyper.SMS_FEILET]: 'SMS har feilet',
  [UtfallsEndringTyper.SMS_SENDT]: 'SMS er sendt',
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
  const borderColor =
    type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info';
  return (
    <Box.New
      background='raised'
      borderColor={borderColor}
      borderRadius='xlarge'
      borderWidth='1'
      paddingInline='space-16'
      paddingBlock='space-12'
      className={`p-4 border-l-4 `}
    >
      <div className='flex justify-between'>
        <div className='flex items-center gap-2 '>
          {type === 'error' ? (
            <XMarkOctagonIcon className='text-danger' />
          ) : type === 'success' ? (
            <CheckmarkCircleIcon className='text-success' />
          ) : (
            <ExclamationmarkTriangleIcon className='text-info' />
          )}
          <BodyShort weight='semibold'>{tittel}</BodyShort>
        </div>
        <BodyShort size='small' textColor='subtle'>
          {format(new Date(dato), 'dd. MMMM yyyy HH:mm', { locale: nb })}
        </BodyShort>
      </div>
      <BodyLong spacing className='mt-4'>
        {tekst}
      </BodyLong>
    </Box.New>
  );
};
const KandidatHendelser = ({
  kandidat,
  forespørselCvForKandidat,
  beskjedForKandidat,
}: {
  kandidat: kandidaterSchemaDTO;
  forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
  beskjedForKandidat?: Sms;
}) => {
  return (
    <div>
      <Heading size='small' spacing>
        Hendelser
      </Heading>

      <div className='flex flex-col gap-4'>
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
              UtfalsendringBeskrivelse[
                utfallsendring.utfall as UtfallsEndringTyper
              ] || utfallsendring.utfall
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
                  ? `Svart ja ${forespørsel.svar.svartAv.ident ? `av ${forespørsel.svar.svartAv.ident}` : ''}`
                  : `Svart nei ${forespørsel.svar.svartAv.ident ? `av ${forespørsel.svar.svartAv.ident}` : ''}`
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

        {beskjedForKandidat && (
          <>
            <hr className='opacity-30' />
            <Heading size='xsmall' spacing>
              Beskjed til kandidat
            </Heading>

            <HendelseBoks
              tittel={`${storForbokstavString(
                beskjedForKandidat.minsideStatus,
              ).replace(/_/g, ' ')} - ${storForbokstavString(
                beskjedForKandidat.eksternStatus,
              ).replace(/_/g, ' ')}`}
              tekst={`${
                beskjedForKandidat.eksternKanal
                  ? beskjedForKandidat.eksternKanal === EksternKanal.EPOST
                    ? 'Epost sendt'
                    : 'SMS sendt'
                  : beskjedForKandidat.eksternFeilmelding
                    ? storForbokstavString(
                        beskjedForKandidat.eksternFeilmelding,
                      ).replace(/_/g, ' ')
                    : ''
              }`}
              dato={beskjedForKandidat.opprettet}
              type={
                beskjedForKandidat.eksternStatus
                  ? beskjedForKandidat.eksternStatus.includes('FEIL')
                    ? 'error'
                    : 'success'
                  : 'info'
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default KandidatHendelser;
