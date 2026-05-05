import { mapTilKandidatHendelser } from './_ui/KandidatHendelser/mapTilKandidatHendelser';
import { KandidatVisningProps } from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import { JobbSøkerDTO } from '@/app/api/kandidat/schema.zod';

export const mapKandidatListeKandidatTilVisning = (
  jobbSøker: JobbSøkerDTO,
): KandidatVisningProps => {
  if (!jobbSøker.kandidat) {
    throw new Error('JobbSøker mangler kandidat');
  }
  const kandidatHendelser = mapTilKandidatHendelser(jobbSøker);

  return { ...jobbSøker.kandidat, kandidatHendelser };
};
