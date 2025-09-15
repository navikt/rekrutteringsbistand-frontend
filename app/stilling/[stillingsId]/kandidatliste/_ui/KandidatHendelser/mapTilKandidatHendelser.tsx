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
import { KandidatForespurtOmDelingSchema } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { Sms } from '@/app/api/kandidatvarsel/kandidatvarsel';
import { storForbokstavString } from '@/app/kandidat/util';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';

export const mapTilKandidatHendelser = ({
  kandidat,
  forespørselCvForKandidat,
  beskjedForKandidat,
}: {
  kandidat: KandidatListeKandidatDTO;
  forespørselCvForKandidat: KandidatForespurtOmDelingSchema[] | null;
  beskjedForKandidat: Sms | null;
}): KandidatHendelser => {
  const cvErBlittDelt = kandidat.utfallsendringer?.some(
    (endring) =>
      endring.utfall === KandidatutfallTyper.PRESENTERT &&
      endring.sendtTilArbeidsgiversKandidatliste,
  );

  const utfallsendringer = kandidat.utfallsendringer?.map((endring) =>
    mapUtfallsendringer(endring, cvErBlittDelt),
  );

  const cvHendelser = forespørselCvForKandidat?.map((forespørsel) =>
    mapCVHendele(forespørsel),
  );

  // Det er foreløpig bare en varsel hendelse.
  let varsel: KandidatHendelseInformasjon | null = null;

  if (beskjedForKandidat !== null && beskjedForKandidat?.opprettet) {
    varsel = {
      type: beskjedForKandidat?.eksternStatus?.includes('FEIL')
        ? KandidatHendelseType.SMS_FEIL
        : KandidatHendelseType.SMS_OK,
      tag: (
        <KandidatHendelseTag
          type={
            beskjedForKandidat?.eksternStatus?.includes('FEIL')
              ? KandidatHendelseType.SMS_FEIL
              : KandidatHendelseType.SMS_OK
          }
        />
      ),
      tekst: storForbokstavString(
        (beskjedForKandidat?.eksternFeilmelding || '').replace(/[_-]/g, ' '),
      ),
      dato: new Date(beskjedForKandidat?.opprettet),
      raw: beskjedForKandidat,
    };
  }

  const varsler = varsel ? [varsel] : [];

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
