import {
  KandidatListeKandidatDTO,
  usynligKandidaterSchemaDTO,
} from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { KandidatHendelser } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelser';

export interface KandidatVisningProps extends KandidatListeKandidatDTO {
  kandidatHendelser: KandidatHendelser;
}

type FiltrerteKandidater = {
  kandidater?: KandidatVisningProps[];
  usynligeKandidater?: usynligKandidaterSchemaDTO[];
  totaltAntallKandidater: number;
};

const useFiltrerteKandidater = (): FiltrerteKandidater | null => {
  const { jobbsøkerListe, usynligeKandidater, totaltAntallKandidater } =
    useKandidatlisteContext();

  if (!jobbsøkerListe) return null;

  return {
    kandidater: jobbsøkerListe,
    usynligeKandidater: usynligeKandidater ?? [],
    totaltAntallKandidater,
  };
};

export default useFiltrerteKandidater;
