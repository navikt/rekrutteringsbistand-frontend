import { KandidatVisningProps } from '../KandidatlisteFilter/useFiltrerteKandidater';
import { KandidatHendelseType } from './KandidatHendelseTag';

export const CVKandidaterSvartJa = (kandidater: KandidatVisningProps[]) => {
  return kandidater.filter((k) => {
    const cvHendelser = k.kandidatHendelser.cvHendelser;
    if (!cvHendelser || cvHendelser.length === 0) {
      return false;
    }
    if (
      cvHendelser.some(
        (hendelse) => hendelse.type === KandidatHendelseType.Deling_av_CV_JA,
      )
    ) {
      return true;
    }
    return false;
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

    if (neiHendelser.length === 0) {
      return false;
    }

    const sisteNeiHendelse = neiHendelser[0];
    const tidspunktNei = new Date(sisteNeiHendelse.dato || '');

    const senereSpurtHendelseFinnes = cvHendelser.some((hendelse) => {
      if (
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV ||
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL
      ) {
        const tidspunktSpurt = new Date(hendelse.dato || '');
        return tidspunktSpurt > tidspunktNei;
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

    if (fristUtløptHendelse.length === 0) {
      return false;
    }

    const sisteNeiHendelse = fristUtløptHendelse[0];
    const tidspunktNei = new Date(sisteNeiHendelse.dato || '');

    const senereSpurtHendelseFinnes = cvHendelser.some((hendelse) => {
      if (
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV ||
        hendelse.type === KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL
      ) {
        const tidspunktSpurt = new Date(hendelse.dato || '');
        return tidspunktSpurt > tidspunktNei;
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

    const harDelingsHendelse = cvHendelser.some((hendelse) => {
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

    return harDelingsHendelse;
  });
