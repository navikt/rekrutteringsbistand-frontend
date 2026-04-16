import { getSingleKandidatDataSchema } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { KandidatDataSchemaDTO } from '@/app/api/kandidat-sok/schema/cvSchema.zod';
import { KandidatListeKandidatDTO } from '@/app/api/kandidat/schema.zod';
import { Innsatsgruppe } from '@/app/kandidat/_ui/innsatsgrupper';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { fastRefDato } from '@/mocks/datoKonstanter';
import { Faker, en, nb_NO } from '@faker-js/faker';

const listDataFaker = new Faker({ locale: [nb_NO, en] });
const listDecisionFaker = new Faker({ locale: [nb_NO, en] });

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
    tidspunkt: listDataFaker.date
      .past({ years: 1, refDate: fastRefDato })
      .toISOString(),
    sendtTilArbeidsgiversKandidatliste: listDecisionFaker.datatype.boolean(),
  };
}

export function mapKandidatDataToKandidatListeKandidat(
  kandidatData: KandidatDataSchemaDTO,
  idNummer: number,
): KandidatListeKandidatDTO {
  const erArkivert = listDecisionFaker.datatype.boolean(0.1);

  return {
    kandidatId: `kandidat-arenaKandidatnr-${idNummer}`,
    kandidatnr: `kandidat-aktorId-${idNummer}`,
    status: listDataFaker.helpers.arrayElement(
      Object.values(InternKandidatstatus),
    ),
    lagtTilTidspunkt: listDataFaker.date
      .past({ years: 1, refDate: fastRefDato })
      .toISOString(),
    lagtTilAv: {
      ident:
        kandidatData.veilederIdent || `Z${listDataFaker.string.numeric(6)}`,
      navn:
        kandidatData.veilederVisningsnavn || listDataFaker.person.fullName(),
    },
    fornavn: kandidatData.fornavn || 'Fornavn mangler',
    etternavn: kandidatData.etternavn || 'Etternavn mangler',
    fodselsdato:
      kandidatData.fodselsdato ||
      listDataFaker.date.birthdate({ refDate: fastRefDato }).toISOString(),
    fodselsnr: kandidatData.fodselsnummer ?? null,
    utfall: listDataFaker.helpers.arrayElement([
      KandidatutfallTyper.IKKE_PRESENTERT,
      KandidatutfallTyper.FATT_JOBBEN,
      KandidatutfallTyper.PRESENTERT,
    ]),
    telefon: kandidatData.mobiltelefon || kandidatData.telefon || null,
    epost: kandidatData.epostadresse ?? null,
    innsatsgruppe: kandidatData.innsatsgruppe || Innsatsgruppe.STANDARD_INNSATS,
    antallNotater: 0,
    arkivert: erArkivert,
    arkivertTidspunkt: erArkivert
      ? listDataFaker.date
          .past({ years: 1, refDate: fastRefDato })
          .toISOString()
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
  count: number = 100,
): KandidatListeKandidatDTO[] {
  listDataFaker.seed(42);
  listDecisionFaker.seed(42);
  const kandidater: KandidatListeKandidatDTO[] = [];
  for (let i = 0; i < count; i++) {
    const currentSeed = i + 1;
    const baseKandidatData = getSingleKandidatDataSchema(currentSeed);
    kandidater.push(
      mapKandidatDataToKandidatListeKandidat(baseKandidatData, i + 1),
    );
  }
  return kandidater;
}

export const mockKandidatliste = {
  kandidatlisteId: 'minStilling',
  tittel: null,
  organisasjonReferanse: '312113341',
  organisasjonNavn: 'ORDKNAPP BLOMSTRETE TIGER AS',
  stillingId: '05ed6a01-d55c-4b9c-98d6-e6d40a3b6fc7',

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
