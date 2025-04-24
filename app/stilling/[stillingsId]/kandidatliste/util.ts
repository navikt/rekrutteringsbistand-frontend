import { ForespurteOmDelingAvCvDTO } from '../../../api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { kandidaterSchemaDTO } from '../../../api/kandidat/schema.zod';
import { Sms } from '../../../api/kandidatvarsel/kandidatvarsel';
import { mapTilKandidatHendelser } from './components/KandidatHendelser/mapTilKandidatHendelser';
import { KandidatVisningProps } from './components/KandidatlisteFilter/useFiltrerteKandidater';

export const mapKandidatListeKandidatTilVisning = (
  kandidat: kandidaterSchemaDTO,
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
