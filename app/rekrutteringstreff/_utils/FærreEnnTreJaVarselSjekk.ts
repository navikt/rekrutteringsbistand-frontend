import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import { gittDatoMinusAntallDager } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';

export const skalViseVarselSjekk = (
  treffStatus: string | undefined,
  antallJobbsøkereSvartJa: number | null | undefined,
  antallJobbsøkereFåttJobb: number | null | undefined,
  svarfristSomDato: Date | null,
) => {
  const datoEnUkeFørSvarfrist = gittDatoMinusAntallDager(svarfristSomDato, 7);
  const antallSvartJaEllerFåttJobb =
    (antallJobbsøkereSvartJa || 0) + (antallJobbsøkereFåttJobb || 0);

  return (
    treffStatus != undefined &&
    treffStatus === RekrutteringstreffStatus.PUBLISERT &&
    antallSvartJaEllerFåttJobb < 3 &&
    svarfristSomDato != null &&
    datoEnUkeFørSvarfrist != null &&
    new Date() > datoEnUkeFørSvarfrist
  );
};
