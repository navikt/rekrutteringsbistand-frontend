import { mapTilKandidatHendelser } from './_ui/KandidatHendelser/mapTilKandidatHendelser';
import { KandidatVisningProps } from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import { ForespurteOmDelingAvCvDTO } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { Sms } from '@/app/api/kandidatvarsel/kandidatvarsel';

export const mapKandidatListeKandidatTilVisning = (
  kandidat: KandidatListeKandidatDTO,
  forespurteKandidater: ForespurteOmDelingAvCvDTO,
  beskjeder: Record<string, Sms>,
): KandidatVisningProps => {
  const forespørselCvForKandidat =
    kandidat.aktørid && forespurteKandidater
      ? forespurteKandidater[kandidat.aktørid]
      : null;

  const beskjedForKandidat = beskjeder && beskjeder[kandidat.fodselsnr ?? ''];

  const kandidatHendelser = mapTilKandidatHendelser({
    kandidat,
    forespørselCvForKandidat,
    beskjedForKandidat,
  });

  return { ...kandidat, kandidatHendelser };
};
