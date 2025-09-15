import {
  KandidatHendelseTag,
  KandidatHendelseType,
} from './KandidatHendelseTag';
import { KandidatHendelseInformasjon } from './KandidatHendelser';
import { utfallsendringerSchemaDTO } from '@/app/api/kandidat/schema.zod';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';

export const mapUtfallsendringer = (
  utfallseendring: utfallsendringerSchemaDTO,
  cvErBlittDelt: boolean = false,
): KandidatHendelseInformasjon => {
  const defaultData = {
    dato: new Date(utfallseendring.tidspunkt),
    raw: utfallseendring,
  };
  switch (utfallseendring.utfall) {
    case KandidatutfallTyper.FATT_JOBBEN:
      return {
        type: KandidatHendelseType.Fått_jobben,
        ...defaultData,
        tag: <KandidatHendelseTag type={KandidatHendelseType.Fått_jobben} />,
      };
    case KandidatutfallTyper.IKKE_PRESENTERT:
      if (
        utfallseendring.sendtTilArbeidsgiversKandidatliste === false &&
        cvErBlittDelt
      ) {
        return {
          ...defaultData,
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.CV_slettet_hos_arbeidsgiver}
            />
          ),
          type: KandidatHendelseType.CV_slettet_hos_arbeidsgiver,
          tekst: KandidatHendelseType.CV_slettet_hos_arbeidsgiver,
        };
      }
      return {
        type: null,
        ...defaultData,
      };
    case KandidatutfallTyper.PRESENTERT:
      if (utfallseendring.sendtTilArbeidsgiversKandidatliste) {
        return {
          ...defaultData,
          type: KandidatHendelseType.CV_delt_med_arbeidsgiver,
          tag: (
            <KandidatHendelseTag
              type={KandidatHendelseType.CV_delt_med_arbeidsgiver}
            />
          ),
        };
      }
      return { ...defaultData, type: null };
    default:
      return {
        ...defaultData,
        type: null,
        tag: <KandidatHendelseTag type={null} />,
      };
  }
};
