import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { MarkertKandidat } from '@/app/kandidat/KandidatSøkMarkerteContext';

export const tilMarkertKandidat = (
  kandidat: KandidatDataSchemaDTO,
): MarkertKandidat | null => {
  if (!kandidat.arenaKandidatnr) {
    return null;
  }

  return {
    arenaKandidatnr: kandidat.arenaKandidatnr,
    fodselsnummer: kandidat.fodselsnummer ?? null,
    fornavn: kandidat.fornavn ?? null,
    etternavn: kandidat.etternavn ?? null,
    telefonnummer: kandidat.mobiltelefon ?? kandidat.telefon ?? null,
    navkontor: kandidat.navkontor ?? null,
    veilederNavn: kandidat.veilederVisningsnavn ?? null,
    veilederNavIdent: kandidat.veilederIdent ?? null,
    innsatsgruppe: kandidat.innsatsgruppe ?? null,
    fylke: kandidat.fylkeNavn ?? null,
    kommune: kandidat.kommuneNavn ?? null,
    poststed: kandidat.poststed ?? null,
  };
};
