import {
  KandidatHendelseTag,
  KandidatHendelseType,
} from './KandidatHendelseTag';
import {
  KandidatHendelseInformasjon,
  KandidatHendelser,
} from './KandidatHendelser';
import { mapCVHendele } from './mapCVhendelers';
import { mapUtfallsendringer } from './mapUtfallsendringer';
import {
  ForespørselOmDelingAvCvDTO,
  KandidatListeKandidatDTO,
  VarselDTO,
} from '@/app/api/kandidat/schema.zod';
import { storForbokstavString } from '@/app/kandidat/util';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';

export const mapTilKandidatHendelser = ({
  kandidat,
  forespørslerOmDelingAvCver,
  varsler: varslerData,
}: {
  kandidat: KandidatListeKandidatDTO;
  forespørslerOmDelingAvCver: ForespørselOmDelingAvCvDTO[];
  varsler: VarselDTO[];
}): KandidatHendelser => {
  const cvErBlittDelt = kandidat.utfallsendringer?.some(
    (endring) =>
      endring.utfall === KandidatutfallTyper.PRESENTERT &&
      endring.sendtTilArbeidsgiversKandidatliste,
  );

  const utfallsendringer = kandidat.utfallsendringer?.map((endring, index) =>
    mapUtfallsendringer(
      endring,
      cvErBlittDelt,
      kandidat.utfallsendringer,
      index,
    ),
  );

  const cvHendelser = forespørslerOmDelingAvCver?.map((forespørsel) =>
    mapCVHendele(forespørsel),
  );

  const varsler: KandidatHendelseInformasjon[] = varslerData
    .filter((v) => v.opprettet)
    .map((v) => {
      const erFeil = v.status?.includes('FEIL');
      return {
        type: erFeil
          ? KandidatHendelseType.SMS_FEIL
          : KandidatHendelseType.SMS_OK,
        tag: (
          <KandidatHendelseTag
            type={
              erFeil
                ? KandidatHendelseType.SMS_FEIL
                : KandidatHendelseType.SMS_OK
            }
          />
        ),
        tekst: erFeil
          ? storForbokstavString((v.status || '').replace(/[_-]/g, ' '))
          : '',
        dato: new Date(v.opprettet!),
        raw: v,
      };
    });

  const sisteHendelse = [...(cvHendelser ?? []), ...(utfallsendringer ?? [])]
    .filter((hendelse) => hendelse.type !== null)
    .sort((a, b) => (b.dato?.getTime() || 0) - (a.dato?.getTime() || 0))[0];

  const sisteSms = varsler
    ? varsler.sort(
        (a, b) => (b.dato?.getTime() || 0) - (a.dato?.getTime() || 0),
      )[0]
    : null;

  const kandidatHendelser: KandidatHendelser = {
    utfallsendringer,
    cvHendelser,
    varsler,
    sisteSms,
    sisteHendelse,
  };
  return kandidatHendelser;
};
