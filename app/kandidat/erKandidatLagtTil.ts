import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';

export const erKandidatLagtTil = (
  kandidat: Pick<KandidatDataSchemaDTO, 'arenaKandidatnr' | 'fodselsnummer'>,
  alleredeLagtTil: readonly string[] = [],
) =>
  alleredeLagtTil.some(
    (id) => id === kandidat.fodselsnummer || id === kandidat.arenaKandidatnr,
  );
