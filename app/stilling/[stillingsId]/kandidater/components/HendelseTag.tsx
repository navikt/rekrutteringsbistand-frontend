import { Tag } from '@navikt/ds-react';
import * as React from 'react';
import { storForbokstavString } from '../../../../kandidat-sok/util';

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

export enum TilstandPåForespørsel {
  KanIkkeOpprette = 'KAN_IKKE_OPPRETTE',
  PrøverVarsling = 'PROVER_VARSLING',
  HarVarslet = 'HAR_VARSLET',
  KanIkkeVarsle = 'KAN_IKKE_VARSLE',
  HarSvart = 'HAR_SVART',
  Avbrutt = 'AVBRUTT',
}

//TODO Bruke?

export enum KandidatutfallTyper {
  IKKE_PRESENTERT = 'IKKE_PRESENTERT',
  PRESENTERT = 'PRESENTERT',
  FATT_JOBBEN = 'FATT_JOBBEN',
}

export enum UtfallsEndringTyper {
  NY_KANDIDAT = 'NY_KANDIDAT',
  DELT_MED_KANDIDAT = 'DELT_MED_KANDIDAT',
  SVAR_JA = 'SVAR_JA',
  SVAR_NEI = 'SVAR_NEI',
  CV_DELT = 'CV_DELT',
  CV_SLETTET = 'CV_SLETTET',
  FÅTT_JOBBEN = 'FÅTT_JOBBEN',
  SMS_FEILET = 'SMS_FEILET',
  SMS_SENDT = 'SMS_SENDT',
}

export type KandidatHendelseTyper = KandidatutfallTyper | UtfallsEndringTyper;

// const sorterUtfallmedNyesteFørst = (
//   utfallsendringer: utfallsendringerSchemaDTO[],
// ) =>
//   utfallsendringer.sort(
//     (u, v) => Number(new Date(v.tidspunkt)) - Number(new Date(u.tidspunkt)),
//   );

// const cvErSendtTilArbeidsgiverOgSlettet = (
//   utfallsendringer: utfallsendringerSchemaDTO[],
// ) => {
//   const utfallSortertMedNyesteFørst =
//     sorterUtfallmedNyesteFørst(utfallsendringer);

//   const [sisteUtfall, nestSisteUtfall] = utfallSortertMedNyesteFørst;
//   if (nestSisteUtfall === undefined) {
//     return false;
//   }

//   return (
//     nestSisteUtfall.sendtTilArbeidsgiversKandidatliste &&
//     sisteUtfall.utfall === KandidatutfallTyper.IKKE_PRESENTERT
//   );
// };

// const hentKandidatensSisteHendelse = (
//   utfall: string,
//   utfallsendringer: utfallsendringerSchemaDTO[],
//   forespørselOmDelingAvCv?: ForespørselOmDelingAvCv,
//   sms?: any, //TODO To be defined
// ): KandidatHendelseTyper => {
//   const cvErSendtOgSlettet =
//     cvErSendtTilArbeidsgiverOgSlettet(utfallsendringer);

//   if (utfall === KandidatutfallTyper.FATT_JOBBEN) {
//     return KandidatHendelse.FåttJobben;
//   } else if (cvErSendtOgSlettet) {
//     return KandidatHendelse.CvSlettet;
//   } else if (utfall === Kandidatutfall.Presentert) {
//     return KandidatHendelse.Presentert;
//   } else if (forespørselOmDelingAvCv) {
//     if (forespørselOmDelingAvCv.tilstand === TilstandPåForespørsel.HarSvart) {
//       return forespørselOmDelingAvCv.svar.harSvartJa
//         ? KandidatHendelse.SvarJa
//         : KandidatHendelse.SvarNei;
//     } else if (
//       forespørselOmDelingAvCv.tilstand === TilstandPåForespørsel.KanIkkeOpprette
//     ) {
//       return KandidatHendelse.NyKandidat;
//     } else {
//       return KandidatHendelse.DeltMedKandidat;
//     }
//   } else if (sms?.eksternStatus === EksternStatus.VELLYKKET_SMS) {
//     return KandidatHendelse.SmsSendt;
//   } else if (sms?.eksternStatus === EksternStatus.VELLYKKET_EPOST) {
//     return KandidatHendelse.EpostSendt;
//   } else if (sms?.eksternStatus === EksternStatus.FEIL) {
//     return KandidatHendelse.EksternVarselFeilet;
//   }

//   return KandidatHendelse.NyKandidat;
// };

export interface HendelseTagProps {
  utfall: string;
}

const HendelseTag: React.FC<HendelseTagProps> = ({ utfall }) => {
  const utfallTekst = utfall
    ? storForbokstavString(utfall).replace(/_/g, ' ')
    : null;

  const tagVariant = () => {
    switch (utfall) {
      case KandidatutfallTyper.IKKE_PRESENTERT:
        return 'neutral';
      case KandidatutfallTyper.PRESENTERT:
        return 'info';
      case KandidatutfallTyper.FATT_JOBBEN:
        return 'success';
      default:
        return 'info';
    }
  };

  return utfallTekst ? (
    <Tag variant={tagVariant()} size='small'>
      {utfallTekst}
    </Tag>
  ) : null;
};

export default HendelseTag;
