import {
  getSingleKandidatDataSchema,
  kandidatSeedCounter as globalKandidatSeedCounter,
} from './kandidat.mock';
import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { Innsatsgruppe } from '@/app/kandidat/_ui/innsatsgrupper';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { Faker, en, nb_NO } from '@faker-js/faker';

// Assuming kandidatSeedCounter is exported and you want to use/mutate the global one

// Central Faker instances for this mock file
const listDataFaker = new Faker({ locale: [nb_NO, en] });
const listDecisionFaker = new Faker({ locale: [nb_NO, en] });

// If you prefer an independent seed counter for this file:
// let localKandidatSeedCounter = 0;

// Mock enum for InternKandidatstatus
// This should ideally align with the actual InternKandidatstatus enum values

// Helper to generate a single Utfallsendring
// The type is implicitly defined by utfallsendringerSchema in app/api/kandidat/schema.zod.ts
function generateMockUtfallsendring(): {
  utfall: string;
  registrertAvIdent: string;
  tidspunkt: string;
  sendtTilArbeidsgiversKandidatliste: boolean;
} {
  return {
    utfall: listDataFaker.helpers.arrayElement([
      KandidatutfallTyper.IKKE_PRESENTERT,
      KandidatutfallTyper.FATT_JOBBEN,
      KandidatutfallTyper.PRESENTERT,
    ]),
    registrertAvIdent: `Z${listDataFaker.string.numeric(6)}`,
    tidspunkt: listDataFaker.date.past({ years: 1 }).toISOString(),
    sendtTilArbeidsgiversKandidatliste: listDecisionFaker.datatype.boolean(),
  };
}

// Function to map KandidatDataSchemaDTO to KandidatListeKandidatDTO
export function mapKandidatDataToKandidatListeKandidat(
  kandidatData: KandidatDataSchemaDTO,
  // Pass faker instances if you want to control them from outside or ensure consistency
  // For simplicity, using the file-scoped fakers here.
): KandidatListeKandidatDTO {
  const erArkivert = listDecisionFaker.datatype.boolean(0.1); // 10% chance of being archived

  return {
    kandidatId: listDataFaker.string.uuid(),
    kandidatnr:
      kandidatData.kandidatnr ||
      kandidatData.arenaKandidatnr ||
      `KAN${listDataFaker.string.numeric(8)}`,
    status: listDataFaker.helpers.arrayElement(
      Object.values(InternKandidatstatus),
    ),
    lagtTilTidspunkt: listDataFaker.date.past({ years: 1 }).toISOString(),
    lagtTilAv: {
      ident:
        kandidatData.veilederIdent || `Z${listDataFaker.string.numeric(6)}`,
      navn:
        kandidatData.veilederVisningsnavn || listDataFaker.person.fullName(),
    },
    fornavn: kandidatData.fornavn || 'Fornavn mangler',
    etternavn: kandidatData.etternavn || 'Etternavn mangler',
    fodselsdato:
      kandidatData.fodselsdato || listDataFaker.date.birthdate().toISOString(),
    fodselsnr: kandidatData.fodselsnummer ?? null,
    utfall: listDataFaker.helpers.arrayElement([
      KandidatutfallTyper.IKKE_PRESENTERT,
      KandidatutfallTyper.FATT_JOBBEN,
      KandidatutfallTyper.PRESENTERT,
    ]),
    telefon: kandidatData.mobiltelefon || kandidatData.telefon || null,
    epost: kandidatData.epostadresse ?? null,
    innsatsgruppe: kandidatData.innsatsgruppe || Innsatsgruppe.STANDARD_INNSATS,
    antallNotater: listDataFaker.number.int({ min: 0, max: 7 }),
    arkivert: erArkivert,
    arkivertTidspunkt: erArkivert
      ? listDataFaker.date.past({ years: 1 }).toISOString()
      : null,
    arkivertAv: erArkivert
      ? {
          ident: `Z${listDataFaker.string.numeric(6)}`,
          navn: listDataFaker.person.fullName(),
        }
      : null,
    aktørid: kandidatData.aktorId ?? null,
    utfallsendringer: listDataFaker.helpers.multiple(
      generateMockUtfallsendring,
      {
        count: { min: 0, max: 3 },
      },
    ),
  };
}

function generateMockKandidatlisteKandidater(
  count: number = 10,
): KandidatListeKandidatDTO[] {
  const kandidater: KandidatListeKandidatDTO[] = [];
  for (let i = 0; i < count; i++) {
    // Example: Incrementing a global counter. Adjust if your seed management is different.
    // It's often better to manage state like this more explicitly if possible.
    const currentSeed = (globalKandidatSeedCounter || 0) + i + 1;
    const baseKandidatData = getSingleKandidatDataSchema(currentSeed);
    kandidater.push(mapKandidatDataToKandidatListeKandidat(baseKandidatData));
  }
  // If globalKandidatSeedCounter is indeed global and mutable:
  // if (typeof globalKandidatSeedCounter === 'number') {
  //   (globalKandidatSeedCounter as any) += count; // Be careful with direct mutation of imported primitives
  // }
  return kandidater;
}

export const mockKandidatliste = {
  kandidatlisteId: '0bbcde88-9709-4188-87ed-c516ef9868dc',
  tittel: null,
  organisasjonReferanse: '312113341',
  organisasjonNavn: 'ORDKNAPP BLOMSTRETE TIGER AS',
  stillingId: '05ed6a01-d55c-4b9c-98d6-e6d40a3b6fc7',
  opprettetAv: {
    ident: 'Z993141',
    navn: 'F_Z993141 E_Z993141',
  },
  opprettetTidspunkt: '2025-05-07T13:06:42.301',
  kandidater: generateMockKandidatlisteKandidater(),
  kanEditere: true,
  erEier: true,
  kanSlette: 'HAR_STILLING',
  formidlingerAvUsynligKandidat: [
    {
      id: '199',
      fornavn: 'FORSIKTIG',
      mellomnavn: null,
      etternavn: 'BLOKKFLØYTE',
      utfall: 'IKKE_PRESENTERT',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      lagtTilTidspunkt: '2025-05-08T15:05:41.567',
      arkivert: false,
      arkivertAvIdent: null,
      arkivertAvNavn: null,
      arkivertTidspunkt: null,
    },
  ],
  status: 'ÅPEN',
  antallStillinger: 1,
  stillingskategori: 'STILLING',
};
