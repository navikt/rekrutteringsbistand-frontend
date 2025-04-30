import { KandidatForespurtOmDelingSchema } from '../../../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../../../api/kandidat/schema.zod';
import { Sms } from '../../../../../api/kandidatvarsel/kandidatvarsel';
import { storForbokstavString } from '../../../../../kandidat/util';
import { KandidatutfallTyper } from '../../KandidatTyper';
import { KandidatHendelser } from './KandidatHendelser';
import {
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  HourglassIcon,
  SparklesIcon,
  TasklistIcon,
  TasklistSendIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from '@navikt/aksel-icons';

export enum TilstandPåForespørsel {
  KanIkkeOpprette = 'KAN_IKKE_OPPRETTE',
  PrøverVarsling = 'PROVER_VARSLING',
  HarVarslet = 'HAR_VARSLET',
  KanIkkeVarsle = 'KAN_IKKE_VARSLE',
  HarSvart = 'HAR_SVART',
  IKKE_SENDT = 'IKKE_SENDT',
  Avbrutt = 'AVBRUTT',
}

const utfallsEndringPresentasjon = (
  utfallType: KandidatutfallTyper,
  sendtTilArbeidsgiversKandidatliste: boolean = false,
): {
  tittel: string;
  ikon: React.ReactNode;
  fargeKode: string;
} => {
  switch (utfallType) {
    case KandidatutfallTyper.FATT_JOBBEN:
      return {
        tittel: 'Fått jobben',
        ikon: <CheckmarkCircleIcon className='text-success' />,
        fargeKode: 'success',
      };
    case KandidatutfallTyper.IKKE_PRESENTERT:
      return {
        tittel: 'Ikke presentert',
        ikon: <ExclamationmarkTriangleIcon className='text-warning' />,
        fargeKode: 'warning',
      };

    case KandidatutfallTyper.PRESENTERT:
      if (sendtTilArbeidsgiversKandidatliste) {
        return {
          tittel: 'CV delt med arbeidsgiver',
          ikon: <TasklistSendIcon className='text-success' />,
          fargeKode: 'alt1',
        };
      }
      return {
        tittel: 'Presentert',
        ikon: <TasklistSendIcon className='text-success' />,
        fargeKode: 'alt1',
      };
    default:
      return {
        tittel: 'Ukjent utfall',
        ikon: null,
        fargeKode: 'error',
      };
  }
};

const cvHendelsePresentasjon = (
  forespørsel: KandidatForespurtOmDelingSchema,
): {
  tittel: string;
  tekst: string;
  ikon: React.ReactNode;
  fargeKode: string;
  svarTidspunkt?: string;
  frist?: Date;
} => {
  switch (forespørsel.tilstand) {
    case TilstandPåForespørsel.PrøverVarsling:
    case TilstandPåForespørsel.IKKE_SENDT:
      return {
        tittel: 'Spurt om deling av CV',
        tekst: 'Prøver varsling',
        ikon: <HourglassIcon className='text-info' />,
        fargeKode: 'info',
      };
    case TilstandPåForespørsel.HarVarslet:
      return {
        tittel: 'Spurt om deling av CV',
        tekst: `av ${forespørsel.deltAv}`,
        ikon: <TasklistIcon className='text-info' />,
        fargeKode: 'info',
        frist: new Date(forespørsel.svarfrist),
      };
    case TilstandPåForespørsel.KanIkkeVarsle:
      return {
        tittel: 'Deling av CV feilet',
        tekst: 'Kan ikke varsle',
        ikon: <ExclamationmarkTriangleIcon className='text-danger' />,
        fargeKode: 'warning',
      };
    case TilstandPåForespørsel.KanIkkeOpprette:
      return {
        tittel: 'Deling av CV feilet',
        tekst: 'Kan ikke opprette forespørsel',
        ikon: <ExclamationmarkTriangleIcon className='text-danger' />,
        fargeKode: 'warning',
      };
    case TilstandPåForespørsel.Avbrutt:
      return {
        tittel: 'Deling av CV feilet',
        tekst: 'Avbrutt',
        ikon: <ExclamationmarkTriangleIcon className='text-danger' />,
        fargeKode: 'warning',
      };
    case TilstandPåForespørsel.Avbrutt:
      return {
        tittel: 'Deling av CV feilet',
        tekst: 'Avbrutt',
        ikon: <ExclamationmarkTriangleIcon className='text-danger' />,
        fargeKode: 'warning',
      };
    case TilstandPåForespørsel.HarSvart:
      if (forespørsel.svar?.harSvartJa) {
        return {
          tittel: 'Deling av CV: Ja',
          tekst: `${forespørsel.svar?.svartAv.ident && `svart av ${forespørsel.svar?.svartAv.ident}`}`,
          ikon: <ThumbUpIcon className='text-info' />,
          fargeKode: 'success',
          svarTidspunkt: forespørsel.svar?.svarTidspunkt,
        };
      } else {
        return {
          tittel: 'Deling av CV: Nei',
          tekst: `${forespørsel.svar?.svartAv.ident && `svart av ${forespørsel.svar?.svartAv.ident}`}`,
          ikon: <ThumbDownIcon className='text-danger' />,
          fargeKode: 'error',
          svarTidspunkt: forespørsel.svar?.svarTidspunkt,
        };
      }
    default:
      return {
        tittel: 'Ukjent forespørsel',
        tekst: 'Ukjent forespørsel',
        ikon: null,
        fargeKode: 'error',
      };
  }
};

export const mapTilKandidatHendelser = ({
  kandidat,
  forespørselCvForKandidat,
  beskjedForKandidat,
}: {
  kandidat: kandidaterSchemaDTO;
  forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
  beskjedForKandidat: Sms | null;
}): KandidatHendelser => {
  const opprettet = {
    tittel: 'Lagt til i listen',
    tekst: `av ${kandidat.lagtTilAv.navn}`,
    dato: new Date(kandidat.lagtTilTidspunkt),
    fargeKode: 'info',
    ikon: <SparklesIcon className='text-info' />,
  };

  const utfallsendringer = kandidat.utfallsendringer?.map((endring) => {
    const presentasjon = utfallsEndringPresentasjon(
      endring.utfall as KandidatutfallTyper,
      endring.sendtTilArbeidsgiversKandidatliste,
    );
    return {
      tittel: presentasjon.tittel,
      tekst: endring.registrertAvIdent
        ? `av ${endring.registrertAvIdent || 'ukjent'}`
        : '',
      fargeKode: presentasjon.fargeKode,
      ikon: presentasjon.ikon,
      dato: new Date(endring.tidspunkt),
      kilde: 'Utfallsendring',
      raw: endring,
    };
  });

  const cvHendelser = forespørselCvForKandidat
    ?.map((forespørsel) => {
      const presentasjon = cvHendelsePresentasjon(forespørsel);

      if (presentasjon) {
        return {
          tittel: presentasjon.tittel,
          tekst: presentasjon.tekst,
          dato: forespørsel.svar?.svarTidspunkt
            ? new Date(forespørsel.svar?.svarTidspunkt)
            : new Date(forespørsel.deltTidspunkt),
          cvDato: {
            deltTidspunkt: forespørsel.deltTidspunkt,
            svarfrist: forespørsel.svarfrist,
            svarTidspunkt: forespørsel.svar?.svarTidspunkt,
          },
          fargeKode: presentasjon.fargeKode,
          ikon: presentasjon.ikon,
          raw: forespørsel,
          frist: presentasjon.frist,
        };
      }
    })
    .filter((forespørsel) => forespørsel !== undefined);

  // Det er foreløpig bare en varsel hendelse.

  let varsel;

  if (beskjedForKandidat !== null && beskjedForKandidat?.opprettet) {
    const fargeKode = beskjedForKandidat?.eksternStatus?.includes('FEIL')
      ? 'warning'
      : 'info';

    varsel = {
      tittel: 'SMS',
      tekst: storForbokstavString(
        (beskjedForKandidat?.eksternFeilmelding || '').replace(/[_-]/g, ' '),
      ),
      dato: new Date(beskjedForKandidat?.opprettet),
      fargeKode,
      ikon:
        fargeKode === 'warning' ? (
          <ExclamationmarkTriangleIcon className='text-danger' />
        ) : (
          <CheckmarkCircleIcon className='text-success' />
        ),
      raw: beskjedForKandidat,
    };
  }

  const varsler = varsel ? [varsel] : [];

  const sisteAktivitet = [
    opprettet,
    ...(cvHendelser ?? []),
    ...(utfallsendringer ?? []),
  ].sort((a, b) => b.dato.getTime() - a.dato.getTime())[0];

  const sisteSms = varsler
    ? varsler.sort((a, b) => b.dato.getTime() - a.dato.getTime())[0]
    : null;

  const kandidatHendelser: KandidatHendelser = {
    opprettet,
    utfallsendringer,
    cvHendelser,
    varsler,
    sisteSms,
    sisteAktivitet,
  };
  return kandidatHendelser;
};
