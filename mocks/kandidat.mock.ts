// Make sure these specific DTOs are correctly defined and imported if they are distinct
// For now, I'll assume they are part of KandidatDataSchemaDTO's array definitions
import { KandidatDataSchemaDTO } from '../app/api/kandidat-sok/schema/cvSchema.zod';
import { GeografiJobbonskerSchemaDTO } from '../app/api/kandidat-sok/schema/geografiJobbonskerSchema.zod';
import { YrkejobbOnskerSchemaDTO } from '../app/api/kandidat-sok/schema/yrkejobbOnskerSchema.zod';
import { KandidatStillingssøkDTO } from '../app/api/kandidat-sok/useKandidatStillingssøk';
import { KandidatsammendragDTO } from '../app/api/kandidat-sok/useKandidatsammendrag';
import { KandidatsokKandidat } from '../app/api/kandidat-sok/useKandidatsøk';
import { Innsatsgruppe } from '../app/kandidat/components/innsatsgrupper';
import { en, Faker, nb_NO } from '@faker-js/faker';

// import * as fs from 'fs'; // Removed as per previous instructions to not save to JSON
// import * as path from 'path'; // Removed

// Central Faker instances
const coreDataFaker = new Faker({ locale: [nb_NO, en] });
const coreDecisionFaker = new Faker({ locale: [nb_NO, en] });

export let kandidatSeedCounter = 0;

// --- Helper functions using coreDecisionFaker ---
function optionalNullable<T>(
  generator: () => T,
  pValue = 0.8,
  pNull = 0.1,
): T | null | undefined {
  if (coreDecisionFaker.number.float({ min: 0, max: 1 }) > pValue)
    return undefined;
  if (coreDecisionFaker.number.float({ min: 0, max: 1 }) < pNull) return null;
  return generator();
}
function optional<T>(generator: () => T, pValue = 0.8): T | undefined {
  if (coreDecisionFaker.number.float({ min: 0, max: 1 }) > pValue)
    return undefined;
  return generator();
}
function nullable<T>(generator: () => T, pNull = 0.1): T | null {
  if (coreDecisionFaker.number.float({ min: 0, max: 1 }) < pNull) return null;
  return generator();
}
// --- End Helper functions ---

// Removed CoreKandidatRawData interface

// Renamed and refactored function to directly return KandidatDataSchemaDTO
function generateKandidatData(seed: number): KandidatDataSchemaDTO {
  // This function now directly generates all fields for KandidatDataSchemaDTO
  // It uses the helper functions for optional/nullable logic.
  // The order of coreDataFaker calls within generators matters for consistency if values are shared.

  // Generate "raw" values that might be used in multiple places or for the summary
  const rawFornavn = coreDataFaker.person.firstName();
  const rawEtternavn = coreDataFaker.person.lastName();
  const rawFodselsdato = coreDataFaker.date.birthdate();
  const rawEpostadresse = coreDataFaker.internet.email();
  const rawMobiltelefon = coreDataFaker.phone.number();
  const rawTelefon = coreDataFaker.phone.number();
  const rawAdresselinje1 = coreDataFaker.location.streetAddress();
  const rawPostnummer = coreDataFaker.location.zipCode('####');
  const rawPoststed = coreDataFaker.location.city();
  const rawKommuneNavn = coreDataFaker.location.city();
  const rawFylkeNavn = coreDataFaker.location.state();
  const rawOrgenhet = coreDataFaker.string.numeric(4);
  const rawVeilederIdent = `Z${coreDataFaker.string.numeric(6)}`;
  const rawVeilederEpost = coreDataFaker.internet.email();
  const rawVeilederVisningsnavn = coreDataFaker.person.fullName();

  return {
    fritekst: optionalNullable(() => coreDataFaker.lorem.paragraph()),
    aktorId: optionalNullable(() => `kandidat-aktorId-${seed}`),
    fodselsnummer: optionalNullable(() => `kandidat-fnr-${seed}`),
    fornavn: rawFornavn,
    etternavn: rawEtternavn,
    fodselsdato: optionalNullable(() => rawFodselsdato.toISOString()),
    fodselsdatoErDnr: optionalNullable(() => coreDataFaker.datatype.boolean()),
    formidlingsgruppekode: optionalNullable(() =>
      coreDataFaker.helpers.arrayElement([
        'ARBS',
        'IARBS',
        'ISERV',
        'PARBS',
        'RARBS',
      ]),
    ),
    epostadresse: optionalNullable(() => rawEpostadresse),
    mobiltelefon: optionalNullable(() => rawMobiltelefon),
    harKontaktinformasjon:
      optional(() => coreDataFaker.datatype.boolean(), 0.9) ?? false,
    telefon: optionalNullable(() => rawTelefon),
    statsborgerskap: optionalNullable(() => 'Norsk'), // Made optionalNullable
    kandidatnr: optionalNullable(() => `kandidat-kandidatnr-${seed}`),
    arenaKandidatnr: `kandidat-arenaKandidatnr-${seed}`, // Kept non-nullable as per previous request
    beskrivelse: optionalNullable(() =>
      coreDataFaker.lorem.sentences(
        coreDataFaker.number.int({ min: 1, max: 3 }),
      ),
    ),
    samtykkeStatus: optionalNullable(() =>
      coreDataFaker.helpers.arrayElement(['GODKJENT', 'AVBRUTT', 'SLETTET']),
    ),
    samtykkeDato: optionalNullable(() =>
      coreDataFaker.date.past().toISOString(),
    ),
    adresselinje1: rawAdresselinje1,
    adresselinje2: coreDataFaker.location.secondaryAddress(),

    adresselinje3: optionalNullable(() => coreDataFaker.lorem.words(3)),
    postnummer: rawPostnummer,
    poststed: rawPoststed,
    landkode: optionalNullable(() =>
      coreDataFaker.helpers.arrayElement(['NO']),
    ),
    kommunenummer: optionalNullable(() =>
      parseInt(coreDataFaker.string.numeric(4), 10),
    ),
    kommunenummerkw: optionalNullable(() =>
      parseInt(coreDataFaker.string.numeric(4), 10),
    ),
    kommunenummerstring: optionalNullable(() =>
      coreDataFaker.string.numeric(4),
    ),
    fylkeNavn: optionalNullable(() => rawFylkeNavn),
    kommuneNavn: optionalNullable(() => rawKommuneNavn),
    disponererBil: optionalNullable(() => coreDataFaker.datatype.boolean()),
    tidsstempel: optionalNullable(() =>
      coreDataFaker.date.recent().toISOString(),
    ),
    doed: optionalNullable(() => coreDataFaker.datatype.boolean(0.05)),
    frKode: optionalNullable(() => coreDataFaker.string.alphanumeric(3)),
    innsatsgruppe: optional(() =>
      coreDataFaker.helpers.arrayElement(Object.values(Innsatsgruppe)),
    ),
    orgenhet: optionalNullable(() => rawOrgenhet),
    navkontor: optionalNullable(() => `NAV ${coreDataFaker.location.city()}`),
    fritattKandidatsok: optionalNullable(() =>
      coreDataFaker.datatype.boolean(),
    ),
    fritattAgKandidatsok: optionalNullable(() =>
      coreDataFaker.datatype.boolean(),
    ),
    utdanning: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder, expand as needed
    fagdokumentasjon: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    yrkeserfaring: optionalNullable(() =>
      coreDataFaker.helpers.multiple(
        () => ({
          yrkeserfaringManeder: coreDataFaker.number.int({ min: 1, max: 120 }),
        }), // Placeholder
        { count: { min: 0, max: 3 } },
      ),
    ),
    kompetanseObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 5 } }),
    ), // Placeholder
    annenerfaringObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 2 } }),
    ), // Placeholder
    sertifikatObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 3 } }),
    ), // Placeholder
    forerkort: optionalNullable(() =>
      coreDataFaker.helpers.multiple(
        () => ({
          fraDato: coreDataFaker.date.past().toISOString(),
          tilDato: coreDataFaker.date.future().toISOString(),
          utsteder: coreDataFaker.company.name(),
          forerkortKode: coreDataFaker.string.alphanumeric(3),
          forerkortKodeKlasse: coreDataFaker.vehicle.type(),
          alternativKlasse: coreDataFaker.vehicle.vin().substring(0, 3),
        }),
        { count: { min: 0, max: 2 } },
      ),
    ),
    sprak: optionalNullable(() =>
      coreDataFaker.helpers.multiple(
        () => ({ sprakKodeTekst: coreDataFaker.lorem.word() }), // Placeholder
        { count: { min: 0, max: 2 } },
      ),
    ),
    kursObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 2 } }),
    ), // Placeholder
    vervObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    geografiJobbonsker: optionalNullable(() =>
      coreDataFaker.helpers.multiple(
        (): GeografiJobbonskerSchemaDTO => ({
          geografiKodeTekst: coreDataFaker.location.city(),
          geografiKode: `NO${coreDataFaker.string.numeric(2)}.${coreDataFaker.string.numeric(4)}`,
        }),
        { count: { min: 1, max: 3 } },
      ),
    ),
    yrkeJobbonskerObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(
        (): YrkejobbOnskerSchemaDTO => {
          const jobTitle = coreDataFaker.person.jobTitle();
          return {
            styrkBeskrivelse: jobTitle,
            sokeTitler: coreDataFaker.helpers
              .multiple(() => coreDataFaker.person.jobTitle(), {
                count: { min: 1, max: 5 },
              })
              .concat([jobTitle]),
            primaertJobbonske: coreDataFaker.datatype.boolean(0.3),
            styrkKode: null,
          };
        },
        { count: { min: 1, max: 3 } },
      ),
    ),
    omfangJobbonskerObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    ansettelsesformJobbonskerObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    arbeidstidsordningJobbonskerObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    arbeidsdagerJobbonskerObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    arbeidstidJobbonskerObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    samletKompetanseObj: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
    totalLengdeYrkeserfaring:
      optional(() => coreDataFaker.number.int({ min: 0, max: 300 })) ?? 0,
    synligForArbeidsgiverSok: optionalNullable(() =>
      coreDataFaker.datatype.boolean(),
    ),
    synligForVeilederSok: optional(() => coreDataFaker.datatype.boolean()),
    oppstartKode: optionalNullable(() =>
      coreDataFaker.helpers.arrayElement([
        'LEDIG_NAA',
        'ETTER_AVTALE',
        'SNAREST',
      ]),
    ),
    veileder: optionalNullable(() => rawVeilederVisningsnavn),
    veilederIdent: optionalNullable(() => rawVeilederIdent),
    veilederVisningsnavn: optionalNullable(() => rawVeilederVisningsnavn),
    veilederEpost: optionalNullable(() => rawVeilederEpost),
    godkjenninger: optionalNullable(() =>
      coreDataFaker.helpers.multiple(() => ({}), { count: { min: 0, max: 1 } }),
    ), // Placeholder
  };
}

// mapToKandidatDataSchema function is now removed.

export function mapToKandidatSokKandidat(
  fullKandidat: KandidatDataSchemaDTO,
): KandidatsokKandidat | null {
  const arenaKandidatnr =
    fullKandidat.arenaKandidatnr ||
    `fallback-arenaKandidatnr-${fullKandidat.aktorId || 'unknown'}`;

  if (!fullKandidat.fodselsnummer) {
    return null;
  }

  return {
    yrkeJobbonskerObj:
      fullKandidat.yrkeJobbonskerObj?.map((yrke) => ({
        styrkBeskrivelse: yrke.styrkBeskrivelse || undefined,
        sokeTitler: yrke.sokeTitler,
        primaertJobbonske: yrke.primaertJobbonske,
        styrkKode: yrke.styrkKode || undefined, // Convert null to undefined
      })) || [],
    etternavn: fullKandidat.etternavn || 'Mangler etternavn',
    postnummer: fullKandidat.postnummer || '0000',
    arenaKandidatnr: arenaKandidatnr,
    kommuneNavn: fullKandidat.kommuneNavn || 'Mangler kommune',
    geografiJobbonsker:
      fullKandidat.geografiJobbonsker?.map((geo) => ({
        geografiKodeTekst: geo.geografiKodeTekst || '',
        geografiKode: geo.geografiKode || '',
      })) || [],
    innsatsgruppe: fullKandidat.innsatsgruppe || Innsatsgruppe.STANDARD_INNSATS,
    fornavn: fullKandidat.fornavn || 'Mangler fornavn',
    fodselsnummer: fullKandidat.fodselsnummer,
    poststed: fullKandidat.poststed || 'Mangler poststed',
  };
}

// mapToKandidatSammendrag now takes KandidatDataSchemaDTO as input
function mapToKandidatSammendrag(
  kandidatData: KandidatDataSchemaDTO,
  // seed: number, // Seed might not be directly needed if all info comes from kandidatData
  // arenaKandidatnrInput: string, // arenaKandidatnr is now on kandidatData
): KandidatsammendragDTO {
  // Use values from kandidatData, providing defaults if they are null/undefined
  // and the sammendrag requires them to be non-nullable.
  return {
    fornavn: kandidatData.fornavn || 'Ukjent', // Fallback for non-nullable summary field
    etternavn: kandidatData.etternavn || 'Ukjent', // Fallback
    fodselsdato: kandidatData.fodselsdato
      ? kandidatData.fodselsdato.split('T')[0]
      : new Date().toISOString().split('T')[0], // Fallback
    epostadresse: kandidatData.epostadresse ?? null, // Already nullable in summary
    telefon: kandidatData.telefon ?? null, // Already nullable in summary
    adresselinje1: kandidatData.adresselinje1 ?? null, // Already nullable
    postnummer: kandidatData.postnummer ?? null, // Already nullable
    poststed: kandidatData.poststed ?? null, // Already nullable
    orgenhet: kandidatData.orgenhet ?? null, // Already nullable
    veilederIdent: kandidatData.veilederIdent ?? null, // Already nullable
    veilederEpost: kandidatData.veilederEpost ?? null, // Already nullable
    veilederVisningsnavn: kandidatData.veilederVisningsnavn ?? null, // Already nullable
    arenaKandidatnr: kandidatData.arenaKandidatnr ?? '', // Should always exist
    fodselsnummer: kandidatData.fodselsnummer || '00000000000', // Fallback
  };
}

export function createFullKandidatMock(seed: number): {
  kandidatData: KandidatDataSchemaDTO;
  kandidatSammendrag: KandidatsammendragDTO;
} {
  coreDataFaker.seed(seed);
  coreDecisionFaker.seed(seed); // Seed decision faker for consistent optional/nullable choices

  const kandidatData = generateKandidatData(seed); // Step 1: Generate full DTO

  // Re-seed decision faker for summary mapping if it involves different optional/nullable logic
  // For now, mapToKandidatSammendrag primarily uses fallbacks or direct mapping of nullable fields.
  // If it were to use optionalNullable helpers with different probabilities, re-seeding would be important.
  // coreDecisionFaker.seed(seed);
  const kandidatSammendrag = mapToKandidatSammendrag(kandidatData);

  return { kandidatData, kandidatSammendrag };
}

// --- Generating lists and providing access ---
export const mockKandidatDataList: KandidatDataSchemaDTO[] = [];
const mockKandidatSammendragMap = new Map<string, KandidatsammendragDTO>();

for (let i = 1; i <= 20; i++) {
  kandidatSeedCounter = i;
  const { kandidatData, kandidatSammendrag } =
    createFullKandidatMock(kandidatSeedCounter);
  mockKandidatDataList.push(kandidatData);
  if (kandidatData.aktorId) {
    mockKandidatSammendragMap.set(kandidatData.aktorId, kandidatSammendrag);
  }
}

export function getSammendragForAktorId(
  aktorId: string,
): KandidatsammendragDTO | undefined {
  // This function could also generate on the fly if needed,
  // but currently uses the pre-generated map.
  // To generate on the fly based on aktorId (if seed can be derived):
  // const seed = parseInt(aktorId.split('-').pop() || "0", 10);
  // if (isNaN(seed)) return undefined;
  // return createFullKandidatMock(seed).kandidatSammendrag;
  return mockKandidatSammendragMap.get(aktorId);
}

export function getSingleKandidatDataSchema( // Renamed for clarity
  seed: number,
): KandidatDataSchemaDTO {
  coreDataFaker.seed(seed);
  coreDecisionFaker.seed(seed);
  return generateKandidatData(seed);
}

export function getSingleKandidatSammendrag(
  seed: number,
  // arenaKandidatnr: string, // arenaKandidatnr is now part of KandidatDataSchemaDTO
): KandidatsammendragDTO {
  coreDataFaker.seed(seed);
  coreDecisionFaker.seed(seed);
  const kandidatData = generateKandidatData(seed);
  return mapToKandidatSammendrag(kandidatData);
}

// Add this function near the other mapping functions
export function mapToKandidatStillingssøk(
  fullKandidat: KandidatDataSchemaDTO,
): KandidatStillingssøkDTO {
  return {
    yrkeJobbonskerObj:
      fullKandidat.yrkeJobbonskerObj?.map((yrke) => ({
        styrkBeskrivelse: yrke.styrkBeskrivelse || '',
        sokeTitler: yrke.sokeTitler || [],
        primaertJobbonske: yrke.primaertJobbonske || false,
        styrkKode: yrke.styrkKode ?? null,
      })) || [],
    geografiJobbonsker:
      fullKandidat.geografiJobbonsker?.map((geo) => ({
        geografiKodeTekst: geo.geografiKodeTekst || '',
        geografiKode: geo.geografiKode || '',
      })) || [],
    kommunenummerstring: fullKandidat.kommunenummerstring ?? null,
    kommuneNavn: fullKandidat.kommuneNavn ?? null,
  };
}

// Add a convenience function to get stillingssøk data directly by seed
export function getSingleKandidatStillingssøk(
  seed: number,
): KandidatStillingssøkDTO {
  const kandidatData = getSingleKandidatDataSchema(seed);
  return mapToKandidatStillingssøk(kandidatData);
}
