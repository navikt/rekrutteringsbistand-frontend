import { KandidatHendelseType } from './KandidatHendelseTag';
import type { KandidatHendelseInformasjon } from './KandidatHendelser';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';

const deltTidspunkt = (hendelse: KandidatHendelseInformasjon): number =>
  hendelse.dato?.getTime() ?? 0;

const nyesteEtterDeltTidspunkt = (hendelser: KandidatHendelseInformasjon[]) =>
  hendelser.reduce<KandidatHendelseInformasjon | undefined>(
    (nyeste, hendelse) =>
      !nyeste || deltTidspunkt(hendelse) > deltTidspunkt(nyeste)
        ? hendelse
        : nyeste,
    undefined,
  );

export const CVKandidaterSvartJa = (kandidater: KandidatVisningProps[]) => {
  return kandidater.filter((k) => {
    const cvHendelser = k.kandidatHendelser.cvHendelser;
    if (!cvHendelser || cvHendelser.length === 0) {
      return false;
    }
    return cvHendelser.some(
      (hendelse) => hendelse.type === KandidatHendelseType.Deling_av_CV_JA,
    );
  });
};

export const CVKandidaterSvartNei_IkkeSpurtPåNytt = (
  kandidater: KandidatVisningProps[],
) => {
  return kandidater.filter((k) => {
    const cvHendelser = k.kandidatHendelser.cvHendelser;
    if (!cvHendelser || cvHendelser.length === 0) {
      return false;
    }

    const neiHendelser = cvHendelser.filter(
      (hendelse) => hendelse.type === KandidatHendelseType.Deling_av_CV_NEI,
    );

    const sisteNeiHendelse = nyesteEtterDeltTidspunkt(neiHendelser);
    if (!sisteNeiHendelse) {
      return false;
    }
    const tidspunktNei = deltTidspunkt(sisteNeiHendelse);

    const senereSpurtHendelseFinnes = cvHendelser.some((hendelse) => {
      if (
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV ||
        hendelse.type === KandidatHendelseType.Deling_av_CV_JA ||
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL
      ) {
        return deltTidspunkt(hendelse) > tidspunktNei;
      }
      return false;
    });

    return !senereSpurtHendelseFinnes;
  });
};

export const CVkandidaterMedUtløptFrist_IkkeSpurtPåNytt = (
  kandidater: KandidatVisningProps[],
) =>
  kandidater.filter((k) => {
    const cvHendelser = k.kandidatHendelser.cvHendelser;
    if (!cvHendelser || cvHendelser.length === 0) {
      return false;
    }

    const fristUtløptHendelse = cvHendelser?.filter(
      (h) => h.type === KandidatHendelseType.Frist_for_deling_av_cv_utløpt,
    );

    const sisteFristUtløptHendelse =
      nyesteEtterDeltTidspunkt(fristUtløptHendelse);
    if (!sisteFristUtløptHendelse) {
      return false;
    }
    const tidspunktFristUtløpt = deltTidspunkt(sisteFristUtløptHendelse);

    const senereSpurtHendelseFinnes = cvHendelser.some((hendelse) => {
      if (
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV ||
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL
      ) {
        return deltTidspunkt(hendelse) > tidspunktFristUtløpt;
      }
      return false;
    });

    return !senereSpurtHendelseFinnes;
  });

export const CVAlleredeForespurtDeling = (kandidater: KandidatVisningProps[]) =>
  kandidater.filter((k) => {
    const cvHendelser = k.kandidatHendelser.cvHendelser;
    if (!cvHendelser || cvHendelser.length === 0) {
      return false;
    }

    return cvHendelser.some((hendelse) => {
      if (
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV ||
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL
      ) {
        const svarfrist =
          hendelse.raw && 'svarfrist' in hendelse.raw
            ? new Date(hendelse.raw.svarfrist || '')
            : null;

        return svarfrist && svarfrist > new Date();
      }
      return false;
    });
  });
