import { Tag } from '@navikt/ds-react';
import { format } from 'date-fns';
import * as React from 'react';
import { Kandidatutfall, Utfallsendring } from '../KandidatIKandidatlisteTyper';

enum IdentType {
  AktørId = 'AKTOR_ID',
  NavIdent = 'NAV_IDENT',
}

type SvarPåForespørsel = {
  harSvartJa: boolean;
  svarTidspunkt: string;
  svartAv: {
    ident: string;
    identType: IdentType;
  };
};

type MedSvar = {
  tilstand: TilstandPåForespørsel.HarSvart;
  svar: SvarPåForespørsel;
};

enum ForespørselDeltStatus {
  Sendt = 'SENDT',
  IkkeSendt = 'IKKE_SENDT',
}

type UtenSvar = {
  tilstand: Exclude<TilstandPåForespørsel, TilstandPåForespørsel.HarSvart>;
  svar: null;
};

/* TODO: Flytt til domenemappe */
export type ForespørselOmDelingAvCv = {
  aktørId: string;
  stillingsId: string;
  deltStatus: ForespørselDeltStatus;
  deltTidspunkt: string;
  deltAv: string;
  navKontor: string;
  svarfrist: string;
} & (MedSvar | UtenSvar);

enum TilstandPåForespørsel {
  KanIkkeOpprette = 'KAN_IKKE_OPPRETTE',
  PrøverVarsling = 'PROVER_VARSLING',
  HarVarslet = 'HAR_VARSLET',
  KanIkkeVarsle = 'KAN_IKKE_VARSLE',
  HarSvart = 'HAR_SVART',
  Avbrutt = 'AVBRUTT',
}

enum EksternStatus {
  /** Vi jobber med å sende ut eksternt varsel. Status er ikke avklart enda. */
  UNDER_UTSENDING = 'UNDER_UTSENDING',

  /** Vi har fått bekreftet at en SMS er sendt. */
  VELLYKKET_SMS = 'VELLYKKET_SMS',

  /** Vi har fått bekreftet at en e-post er sendt. */
  VELLYKKET_EPOST = 'VELLYKKET_EPOST',

  /** Det skjedde en feil, og vi vil ikke prøve å sende varselet igjen. */
  FEIL = 'FEIL',
}

enum KandidatHendelse {
  NyKandidat = 'NY_KANDIDAT',
  DeltMedKandidat = 'DELT_MED_KANDIDAT',
  SvarJa = 'SVAR_JA',
  SvarNei = 'SVAR_NEI',
  CvDelt = 'CV_DELT',
  CvSlettet = 'CV_SLETTET',
  FåttJobben = 'FÅTT_JOBBEN',
  EksternVarselFeilet = 'EKSTERN_VARSEL_FEILET',
  SmsSendt = 'SMS_SENDT',
  EpostSendt = 'EPOST_SENDT',
}

const sorterUtfallmedNyesteFørst = (utfallsendringer: Utfallsendring[]) =>
  utfallsendringer.sort(
    (u, v) => Number(new Date(v.tidspunkt)) - Number(new Date(u.tidspunkt)),
  );

const cvErSendtTilArbeidsgiverOgSlettet = (
  utfallsendringer: Utfallsendring[],
) => {
  const utfallSortertMedNyesteFørst =
    sorterUtfallmedNyesteFørst(utfallsendringer);

  const [sisteUtfall, nestSisteUtfall] = utfallSortertMedNyesteFørst;
  if (nestSisteUtfall === undefined) {
    return false;
  }

  return (
    nestSisteUtfall.sendtTilArbeidsgiversKandidatliste &&
    sisteUtfall.utfall === Kandidatutfall.IkkePresentert
  );
};

const hentKandidatensSisteHendelse = (
  utfall: Kandidatutfall,
  utfallsendringer: Utfallsendring[],
  forespørselOmDelingAvCv?: ForespørselOmDelingAvCv,
  sms?: any, //TODO To be defined
): KandidatHendelse => {
  const cvErSendtOgSlettet =
    cvErSendtTilArbeidsgiverOgSlettet(utfallsendringer);

  if (utfall === Kandidatutfall.FåttJobben) {
    return KandidatHendelse.FåttJobben;
  } else if (cvErSendtOgSlettet) {
    return KandidatHendelse.CvSlettet;
  } else if (utfall === Kandidatutfall.Presentert) {
    return KandidatHendelse.CvDelt;
  } else if (forespørselOmDelingAvCv) {
    if (forespørselOmDelingAvCv.tilstand === TilstandPåForespørsel.HarSvart) {
      return forespørselOmDelingAvCv.svar.harSvartJa
        ? KandidatHendelse.SvarJa
        : KandidatHendelse.SvarNei;
    } else if (
      forespørselOmDelingAvCv.tilstand === TilstandPåForespørsel.KanIkkeOpprette
    ) {
      return KandidatHendelse.NyKandidat;
    } else {
      return KandidatHendelse.DeltMedKandidat;
    }
  } else if (sms?.eksternStatus === EksternStatus.VELLYKKET_SMS) {
    return KandidatHendelse.SmsSendt;
  } else if (sms?.eksternStatus === EksternStatus.VELLYKKET_EPOST) {
    return KandidatHendelse.EpostSendt;
  } else if (sms?.eksternStatus === EksternStatus.FEIL) {
    return KandidatHendelse.EksternVarselFeilet;
  }

  return KandidatHendelse.NyKandidat;
};

export interface HendelseTagProps {
  utfall: Kandidatutfall;
  utfallsendringer: Utfallsendring[];
  forespørselOmDelingAvCv?: ForespørselOmDelingAvCv;
  ikkeVisÅrstall?: boolean;
  sms?: any;
}

const HendelseTag: React.FC<HendelseTagProps> = ({
  utfall,
  utfallsendringer,
  forespørselOmDelingAvCv,
  ikkeVisÅrstall,
  sms,
}) => {
  const hendelse = hentKandidatensSisteHendelse(
    utfall,
    utfallsendringer,
    forespørselOmDelingAvCv,
    sms,
  );
  const label = hendelseTilLabel(
    hendelse,
    ikkeVisÅrstall || false,
    utfallsendringer,
    forespørselOmDelingAvCv,
    sms,
  );

  if (hendelse === KandidatHendelse.NyKandidat) {
    return null;
  }

  return <Tag variant='info'>{label}</Tag>;
};

const hendelseTilLabel = (
  hendelse: KandidatHendelse,
  ikkeVisÅrstall: boolean,
  utfallsendringer: Utfallsendring[],
  forespørselOmDelingAvCv?: ForespørselOmDelingAvCv,
  sms?: any,
) => {
  const cvDeltTidspunkt = utfallsendringer.find(
    (endring) => endring.utfall === Kandidatutfall.Presentert,
  );
  const fåttJobbenTidspunkt = utfallsendringer.find(
    (endring) => endring.utfall === Kandidatutfall.FåttJobben,
  );

  const formaterMedEllerUtenÅrstall = (dato: string) =>
    ikkeVisÅrstall ? format(dato, 'dd.MM') : format(dato, 'dd.MM.yyyy');
  const formaterDatoUtenÅrstall = (dato: string) => format(dato, 'dd.MM');
  // ikkeVisÅrstall ? formaterDatoUtenÅrstall(dato) : formaterDato(dato);
  // const svarfrist = forespørselOmDelingAvCv?.svarfrist; //TODO Legg inn svarfrist

  const svarTidspunkt = forespørselOmDelingAvCv?.svar?.svarTidspunkt;

  switch (hendelse) {
    case KandidatHendelse.FåttJobben: {
      const label = 'Fått jobben';
      return fåttJobbenTidspunkt
        ? label +
            ` – ${formaterMedEllerUtenÅrstall(fåttJobbenTidspunkt.tidspunkt)}`
        : label;
    }
    case KandidatHendelse.CvDelt: {
      const label = 'CV delt';
      return cvDeltTidspunkt
        ? label + ` – ${formaterMedEllerUtenÅrstall(cvDeltTidspunkt.tidspunkt)}`
        : label;
    }
    case KandidatHendelse.CvSlettet: {
      return 'CV slettet';
    }
    case KandidatHendelse.DeltMedKandidat: {
      const dagerTilSvarfrist = 1234; // todo
      //    Math.floor(
      //     moment(svarfrist).diff(moment(), 'days', true),
      //   );
      const formatertSvarfrist = 1234; //todo
      // svarfrist &&
      // formaterMedEllerUtenÅrstall(
      //   moment(svarfrist).subtract(1, 'day').toISOString(),
      // );

      if (
        dagerTilSvarfrist < 0 ||
        forespørselOmDelingAvCv?.tilstand === TilstandPåForespørsel.Avbrutt
      ) {
        return 'Delt med kandidat, frist utløpt';
        //@ts-ignore
      } else if (dagerTilSvarfrist === 0) {
        return `Delt med kandidat, frist i dag`;
      } else {
        return `Delt med kandidat, frist ${formatertSvarfrist}`;
      }
    }
    case KandidatHendelse.SvarJa: {
      return `Svar: Ja – ${svarTidspunkt && formaterMedEllerUtenÅrstall(svarTidspunkt)}`;
    }
    case KandidatHendelse.SvarNei: {
      return `Svar: Nei – ${svarTidspunkt && formaterMedEllerUtenÅrstall(svarTidspunkt)}`;
    }
    case KandidatHendelse.SmsSendt: {
      return `SMS sendt – ${sms && formaterDatoUtenÅrstall(sms.opprettet)}`;
    }
    case KandidatHendelse.EpostSendt: {
      return `Epost sendt – ${sms && formaterDatoUtenÅrstall(sms.opprettet)}`;
    }
    case KandidatHendelse.EksternVarselFeilet: {
      return `SMS/epost feilet – ${sms && formaterDatoUtenÅrstall(sms.opprettet)}`;
    }
    default:
      return '';
  }
};

export default HendelseTag;
