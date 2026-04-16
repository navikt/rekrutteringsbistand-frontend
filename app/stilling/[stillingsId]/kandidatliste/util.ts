import { mapTilKandidatHendelser } from './_ui/KandidatHendelser/mapTilKandidatHendelser';
import { KandidatVisningProps } from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import {
  ForespørselOmDelingAvCvDTO,
  KandidatListeKandidatDTO,
  VarselDTO,
} from '@/app/api/kandidat/schema.zod';

export const mapKandidatListeKandidatTilVisning = (
  kandidat: KandidatListeKandidatDTO,
  forespørslerOmDelingAvCver: ForespørselOmDelingAvCvDTO[],
  varsler: VarselDTO[],
): KandidatVisningProps => {
  const kandidatHendelser = mapTilKandidatHendelser({
    kandidat,
    forespørslerOmDelingAvCver,
    varsler,
  });

  return { ...kandidat, kandidatHendelser };
};
