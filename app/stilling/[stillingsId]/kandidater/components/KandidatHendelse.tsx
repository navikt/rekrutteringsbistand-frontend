import {
  CheckmarkCircleIcon,
  ClipboardIcon,
  ExclamationmarkTriangleIcon,
  SparklesIcon,
  TasklistSendIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '@navikt/aksel-icons';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { KandidatForespurtOmDelingSchema } from '../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../../api/kandidat/schema.zod';
import { Sms } from '../../../../api/kandidatvarsel/kandidatvarsel';
import { storForbokstavString } from '../../../../kandidat-sok/util';
import KandidatHendelseKort from './KandidatHendelseKort';
import { UtfallsEndringTyper } from './KandidatTyper';

export interface KandidatHendelse {
  tittel: string;
  tekst: string;
  dato: string;
  type: 'success' | 'error' | 'info';
  ikon: React.ReactNode;
  kilde: string;
}

export const utfallsEndringPresentasjon = (
  utfallsEndring: UtfallsEndringTyper,
): {
  tittel: string;
  ikon: React.ReactNode;
  type: 'success' | 'error' | 'info';
} => {
  switch (utfallsEndring) {
    case UtfallsEndringTyper.DELT_MED_KANDIDAT:
      return {
        tittel: 'Stillingen er delt med kandidaten',
        ikon: <CheckmarkCircleIcon className='text-success' />,
        type: 'success',
      };
    case UtfallsEndringTyper.SVAR_JA:
      return {
        tittel: 'Svart på deling av CV: Ja',
        ikon: <ThumbUpIcon className='text-success' />,
        type: 'success',
      };
    case UtfallsEndringTyper.SVAR_NEI:
      return {
        tittel: 'Svart på deling av CV: Nei',
        ikon: <ThumbDownIcon className='text-danger' />,
        type: 'error',
      };
    case UtfallsEndringTyper.CV_DELT:
      return {
        tittel: 'CV delt med arbeidsgiver',
        ikon: <TasklistSendIcon className='text-success' />,
        type: 'success',
      };
    case UtfallsEndringTyper.CV_SLETTET:
      return {
        tittel: 'CV er slettet',
        ikon: <ExclamationmarkTriangleIcon className='text-danger' />,
        type: 'error',
      };
    case UtfallsEndringTyper.FATT_JOBBEN:
      return {
        tittel: 'Fått jobben',
        ikon: <CheckmarkCircleIcon className='text-success' />,
        type: 'success',
      };
    case UtfallsEndringTyper.SMS_SENDT:
      return {
        tittel: 'Sendt varsel på SMS',
        ikon: <CheckmarkCircleIcon className='text-success' />,
        type: 'success',
      };
    case UtfallsEndringTyper.PRESENTERT:
      return {
        tittel: 'Kandidaten er presentert',
        ikon: <CheckmarkCircleIcon className='text-success' />,
        type: 'success',
      };
    case UtfallsEndringTyper.IKKE_PRESENTERT:
      return {
        tittel: 'Kandidaten er ikke presentert',
        ikon: <ExclamationmarkTriangleIcon className='text-danger' />,
        type: 'error',
      };
    default:
      return {
        tittel: utfallsEndring + ' (ukjent)',
        ikon: null,
        type: 'error',
      };
  }
};

export const mapToHendelser = ({
  kandidat,
  forespørselCvForKandidat,
  beskjedForKandidat,
}: {
  kandidat: kandidaterSchemaDTO;
  forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
  beskjedForKandidat: Sms | null;
}): KandidatHendelse[] => {
  const hendelser: KandidatHendelse[] = [];

  if (kandidat.lagtTilAv?.navn && kandidat.lagtTilTidspunkt) {
    hendelser.push({
      tittel: 'Lagt til i listen',
      tekst: `av ${kandidat.lagtTilAv.navn}`,
      dato: kandidat.lagtTilTidspunkt,
      type: 'info',
      ikon: <SparklesIcon className='text-info' />,
      kilde: 'Kandidatliste',
    });
  }

  if (kandidat.utfallsendringer) {
    kandidat.utfallsendringer.forEach((endring) => {
      if (endring.tidspunkt && endring.utfall) {
        const presentasjon = utfallsEndringPresentasjon(
          endring.utfall as UtfallsEndringTyper,
        );
        hendelser.push({
          tittel: presentasjon.tittel,
          tekst: endring.registrertAvIdent
            ? `av ${endring.registrertAvIdent || 'ukjent'}`
            : '',
          type: presentasjon.type,
          ikon: presentasjon.ikon,
          dato: endring.tidspunkt,
          kilde: 'Utfallsendring',
        });
      }
    });
  }

  if (forespørselCvForKandidat) {
    forespørselCvForKandidat.forEach((forespørsel) => {
      const type = forespørsel.svar
        ? forespørsel.svar.harSvartJa
          ? 'success'
          : 'error'
        : 'info';

      const tekst = forespørsel.svar
        ? forespørsel.svar.harSvartJa
          ? `Svart ja  ${forespørsel.svar.svartAv?.ident ? `av ${forespørsel.svar.svartAv.ident}` : ''}`
          : `Svart nei ${forespørsel.svar.svartAv?.ident ? `av ${forespørsel.svar.svartAv.ident}` : ''}`
        : `Svarfrist ${format(new Date(forespørsel.svarfrist), 'dd. MMMM yyyy', { locale: nb })}`;

      hendelser.push({
        kilde: 'ForespørselOmDelingAvCv',
        tittel: 'Spurt om deling av CV',
        tekst: tekst,
        dato: forespørsel.deltTidspunkt,
        type,
        ikon:
          type === 'error' ? (
            <ExclamationmarkTriangleIcon className='text-danger' />
          ) : (
            <ClipboardIcon className='text-info' />
          ),
      });
    });
  }

  if (beskjedForKandidat?.opprettet) {
    const type = beskjedForKandidat.eksternStatus?.includes('FEIL')
      ? 'error'
      : 'success';

    hendelser.push({
      kilde: 'Sms',
      tittel: beskjedForKandidat.eksternStatus?.includes('FEIL')
        ? 'Varsling på SMS feilet'
        : 'Sendt varsel på SMS',
      tekst: storForbokstavString(
        (beskjedForKandidat.eksternFeilmelding || '').replace(/[_-]/g, ' '),
      ),
      dato: beskjedForKandidat.opprettet,
      type,
      ikon:
        type === 'error' ? (
          <ExclamationmarkTriangleIcon className='text-danger' />
        ) : (
          <CheckmarkCircleIcon className='text-success' />
        ),
    });
  }

  return hendelser.sort(
    (a, b) => new Date(b.dato).getTime() - new Date(a.dato).getTime(),
  );
};

const KandidatHendelser = ({
  kandidatHendelser,
}: {
  kandidatHendelser: KandidatHendelse[];
}) => {
  return (
    <div className='flex flex-col gap-4'>
      {kandidatHendelser.map((hendelse, index) => (
        <KandidatHendelseKort
          key={`${hendelse.tittel}-${index}`}
          {...hendelse}
        />
      ))}
    </div>
  );
};

export default KandidatHendelser;
