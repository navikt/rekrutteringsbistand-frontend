import { utfallsendringerSchemaDTO } from '../../../../../api/kandidat/schema.zod';
import { KandidatutfallTyper } from '../../KandidatTyper';
import {
  KandidatHendelseTag,
  KandidatHendelseType,
} from './KandidatHendelseTag';
import { KandidatHendelseInformasjon } from './KandidatHendelser';

export const mapUtfallsendringer = (
  utfallseendring: utfallsendringerSchemaDTO,
  sendtTilArbeidsgiversKandidatliste: boolean = false,
  cvErBlittDelt: boolean = false,
): KandidatHendelseInformasjon => {
  const defaultData = {
    dato: new Date(utfallseendring.tidspunkt),
    raw: utfallseendring,
  };
  switch (utfallseendring.utfall) {
    case KandidatutfallTyper.FATT_JOBBEN:
      return {
        ...defaultData,
        tag: <KandidatHendelseTag type={KandidatHendelseType.Fått_jobben} />,
      };
    case KandidatutfallTyper.IKKE_PRESENTERT:
      if (sendtTilArbeidsgiversKandidatliste === false && cvErBlittDelt) {
        return {
          ...defaultData,
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.CV_slettet_hos_arbeidsgiver}
            />
          ),
          tekst: KandidatHendelseType.CV_slettet_hos_arbeidsgiver,
        };
      }
      return {
        ...defaultData,
      };
    case KandidatutfallTyper.PRESENTERT:
      if (sendtTilArbeidsgiversKandidatliste) {
        return {
          ...defaultData,
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.CV_delt_med_arbeidsgiver}
            />
          ),
        };
      }
      return defaultData;
    default:
      return { ...defaultData, tag: <KandidatHendelseTag type={null} /> };
  }
};
