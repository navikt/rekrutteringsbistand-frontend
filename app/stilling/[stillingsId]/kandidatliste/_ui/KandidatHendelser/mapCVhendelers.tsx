import {
  KandidatHendelseTag,
  KandidatHendelseType,
} from './KandidatHendelseTag';
import { KandidatHendelseInformasjon } from './KandidatHendelser';
import { KandidatForespurtOmDelingSchema } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { TilstandPåForespørsel } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { formaterNorskDato } from '@/util/util';
import { differenceInDays } from 'date-fns';

export const mapCVHendele = (
  forespørsel: KandidatForespurtOmDelingSchema,
): KandidatHendelseInformasjon => {
  const svarFrist = formaterNorskDato({
    dato: forespørsel.svarfrist,
    visning: 'tall',
  });
  const dagerTilSvarfrist = forespørsel.svarfrist
    ? differenceInDays(new Date(forespørsel.svarfrist), new Date())
    : null;

  const defaultData = {
    dato: new Date(forespørsel.deltTidspunkt),
    raw: forespørsel,
  };
  switch (forespørsel.tilstand) {
    case TilstandPåForespørsel.IKKE_SENDT:
    case TilstandPåForespørsel.PROVER_VARSLING:
      return {
        tag: (
          <KandidatHendelseTag
            type={KandidatHendelseType.Spurt_om_å_dele_CV}
            dato={svarFrist}
          />
        ),
        type: KandidatHendelseType.Spurt_om_å_dele_CV,
        tekst: 'Prøver varsling',
        ...defaultData,
      };
    case TilstandPåForespørsel.HAR_VARSLET:
      return {
        tag: (
          <KandidatHendelseTag
            type={KandidatHendelseType.Spurt_om_å_dele_CV}
            dato={svarFrist}
          />
        ),
        type: KandidatHendelseType.Spurt_om_å_dele_CV,
        dato: new Date(forespørsel.deltTidspunkt),
        tekst: `av ${forespørsel.deltAv}`,
        raw: forespørsel,
      };
    case TilstandPåForespørsel.KAN_IKKE_VARSLE:
      return {
        tag: (
          <KandidatHendelseTag
            type={KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL}
            dato={svarFrist}
          />
        ),
        type: KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL,
        tekst:
          'Kandidaten bruker ikke digitale tjenester fra Nav. Du må ringe og registrere svaret i stillingskortet i Aktivitetsplanen.',
        ...defaultData,
      };
    case TilstandPåForespørsel.KAN_IKKE_OPPRETTE:
      return {
        tag: (
          <KandidatHendelseTag
            type={KandidatHendelseType.Deling_Av_CV_Feilet}
            dato={svarFrist}
          />
        ),
        type: KandidatHendelseType.Deling_Av_CV_Feilet,
        tekst: 'Kan ikke opprette forespørsel',
        ...defaultData,
      };
    case TilstandPåForespørsel.AVBRUTT:
      if (
        forespørsel.deltStatus === 'SENDT' &&
        dagerTilSvarfrist !== null &&
        dagerTilSvarfrist < 0
      ) {
        return {
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.Frist_for_deling_av_cv_utløpt}
              dato={svarFrist}
            />
          ),
          type: KandidatHendelseType.Frist_for_deling_av_cv_utløpt,
          tekst: `Frist for deling av CV utløpt ${forespørsel.svarfrist && formaterNorskDato({ dato: forespørsel.svarfrist })}`,
          ...defaultData,
        };
      }
      return {
        type: KandidatHendelseType.Avbrutt_i_aktivitetsplanen,
        tag: (
          <KandidatHendelseTag
            type={KandidatHendelseType.Avbrutt_i_aktivitetsplanen}
          />
        ),
        ...defaultData,
      };
    case TilstandPåForespørsel.HAR_SVART:
      if (forespørsel.svar?.harSvartJa) {
        return {
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.Deling_av_CV_JA}
              dato={svarFrist}
            />
          ),
          type: KandidatHendelseType.Deling_av_CV_JA,
          tekst: `${forespørsel.svar?.svartAv.ident && `svart av ${forespørsel.svar?.svartAv.ident}`} ${forespørsel.svar?.svarTidspunkt && formaterNorskDato({ dato: forespørsel.svar?.svarTidspunkt })}`,
          ...defaultData,
        };
      } else {
        return {
          type: KandidatHendelseType.Deling_av_CV_NEI,
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.Deling_av_CV_NEI}
              dato={svarFrist}
            />
          ),
          tekst: `${forespørsel.svar?.svartAv.ident && `svart av ${forespørsel.svar?.svartAv.ident}`} ${forespørsel.svar?.svarTidspunkt && formaterNorskDato({ dato: forespørsel.svar?.svarTidspunkt })}`,
          ...defaultData,
        };
      }
    default:
      return {
        type: null,
        tag: <KandidatHendelseTag type={null} />,
        ...defaultData,
      };
  }
};
