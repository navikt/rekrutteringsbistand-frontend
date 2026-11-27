import { KandidatHendelseType } from './KandidatHendelseTag';
import type { KandidatHendelseInformasjon } from './KandidatHendelser';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';

export enum CvDelingStatus {
  IKKE_SPURT = 'IKKE_SPURT',
  VENTER_PÅ_SVAR = 'VENTER_PÅ_SVAR',
  SVART_JA = 'SVART_JA',
  SVART_NEI = 'SVART_NEI',
  FRIST_UTLØPT = 'FRIST_UTLØPT',
}

const deltTidspunkt = (hendelse: KandidatHendelseInformasjon): number =>
  hendelse.dato?.getTime() ?? 0;

const nyesteCvHendelse = (
  kandidat: KandidatVisningProps,
): KandidatHendelseInformasjon | undefined =>
  (kandidat.kandidatHendelser.cvHendelser ?? []).reduce<
    KandidatHendelseInformasjon | undefined
  >(
    (nyeste, hendelse) =>
      !nyeste || deltTidspunkt(hendelse) > deltTidspunkt(nyeste)
        ? hendelse
        : nyeste,
    undefined,
  );

const svarfristErPassert = (hendelse: KandidatHendelseInformasjon): boolean => {
  const svarfrist =
    hendelse.raw && 'svarfrist' in hendelse.raw ? hendelse.raw.svarfrist : null;
  return !svarfrist || new Date(svarfrist) <= new Date();
};

// Status for deling av CV utledes kun fra den nyeste forespørselen
export const cvDelingStatus = (
  kandidat: KandidatVisningProps,
): CvDelingStatus => {
  const nyeste = nyesteCvHendelse(kandidat);

  switch (nyeste?.type) {
    case KandidatHendelseType.Deling_av_CV_JA:
      return CvDelingStatus.SVART_JA;
    case KandidatHendelseType.Deling_av_CV_NEI:
      return CvDelingStatus.SVART_NEI;
    case KandidatHendelseType.Frist_for_deling_av_cv_utløpt:
      return CvDelingStatus.FRIST_UTLØPT;
    case KandidatHendelseType.Spurt_om_å_dele_CV:
    case KandidatHendelseType.Spurt_om_å_dele_CV_IKKE_DIGITAL:
      return svarfristErPassert(nyeste)
        ? CvDelingStatus.FRIST_UTLØPT
        : CvDelingStatus.VENTER_PÅ_SVAR;
    default:
      return CvDelingStatus.IKKE_SPURT;
  }
};

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
