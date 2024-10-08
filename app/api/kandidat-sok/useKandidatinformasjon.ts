import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchemaEs } from '../fetcher';
import { kandidatInformasjonMock } from './mocks/kandidatinformasjonMock';

const kandidatinformasjonEndepunkt = `${KandidatSøkAPI.internUrl}/lookup-cv`;

export const kandidatinformasjonSchema = z.object({
  aktorId: z.string(),
  fodselsnummer: z.string(),
  fornavn: z.string(),
  etternavn: z.string(),
  fodselsdato: z.string(),
  fodselsdatoErDnr: z.boolean(),
  formidlingsgruppekode: z.string(),
  epostadresse: z.string(),
  mobiltelefon: z.null(),
  harKontaktinformasjon: z.boolean(),
  telefon: z.string(),
  statsborgerskap: z.null(),
  kandidatnr: z.string(),
  arenaKandidatnr: z.string(),
  beskrivelse: z.string(),
  samtykkeStatus: z.string(),
  samtykkeDato: z.string(),
  adresselinje1: z.string(),
  adresselinje2: z.string(),
  adresselinje3: z.string(),
  postnummer: z.string(),
  poststed: z.string(),
  landkode: z.null(),
  kommunenummer: z.number(),
  kommunenummerkw: z.number(),
  kommunenummerstring: z.string(),
  fylkeNavn: z.string(),
  kommuneNavn: z.string(),
  disponererBil: z.null(),
  tidsstempel: z.string(),
  doed: z.boolean(),
  frKode: z.string(),
  kvalifiseringsgruppekode: z.string(),
  hovedmaalkode: z.string(),
  orgenhet: z.string(),
  navkontor: z.string(),
  fritattKandidatsok: z.null(),
  fritattAgKandidatsok: z.null(),
  utdanning: z.array(
    z
      .object({
        fraDato: z.string(),
        tilDato: z.string(),
        utdannelsessted: z.string(),
        nusKode: z.string(),
        alternativGrad: z.string(),
        yrkestatus: z.string(),
        beskrivelse: z.string(),
      })
      .nullable(),
  ),
  fagdokumentasjon: z.array(z.unknown()),
  yrkeserfaring: z.array(
    z
      .object({
        fraDato: z.string(),
        tilDato: z.string(),
        arbeidsgiver: z.string(),
        styrkKode: z.string(),
        styrkKode4Siffer: z.string(),
        styrkKode3Siffer: z.string(),
        stillingstittel: z.string(),
        stillingstitlerForTypeahead: z.array(z.string()),
        alternativStillingstittel: z.string(),
        sokeTitler: z.array(z.string()),
        organisasjonsnummer: z.null(),
        naceKode: z.null(),
        yrkeserfaringManeder: z.number(),
        utelukketForFremtiden: z.boolean(),
        beskrivelse: z.string(),
        sted: z.string(),
      })
      .nullable(),
  ),
  kompetanseObj: z.array(z.unknown()),
  annenerfaringObj: z.array(z.unknown()),
  sertifikatObj: z.array(z.unknown()),
  forerkort: z.array(
    z
      .object({
        fraDato: z.null(),
        tilDato: z.null(),
        forerkortKode: z.null(),
        forerkortKodeKlasse: z.string(),
        alternativKlasse: z.null(),
        utsteder: z.null(),
      })
      .nullable(),
  ),
  sprak: z.array(
    z
      .object({
        fraDato: z.null(),
        sprakKode: z.null(),
        sprakKodeTekst: z.string(),
        alternativTekst: z.string(),
        beskrivelse: z.string(),
        ferdighetMuntlig: z.string(),
        ferdighetSkriftlig: z.string(),
      })
      .nullable(),
  ),
  kursObj: z.array(z.unknown()),
  vervObj: z.array(z.unknown()),
  geografiJobbonsker: z
    .array(
      z.object({ geografiKodeTekst: z.string(), geografiKode: z.string() }),
    )
    .nullable(),
  yrkeJobbonskerObj: z.array(
    z
      .object({
        styrkKode: z.null(),
        styrkBeskrivelse: z.string(),
        sokeTitler: z.array(z.string()),
        primaertJobbonske: z.boolean(),
      })
      .nullable(),
  ),
  omfangJobbonskerObj: z
    .array(z.object({ omfangKode: z.string(), omfangKodeTekst: z.string() }))
    .nullable(),
  ansettelsesformJobbonskerObj: z
    .array(
      z.object({
        ansettelsesformKode: z.string(),
        ansettelsesformKodeTekst: z.string(),
      }),
    )
    .nullable(),
  arbeidstidsordningJobbonskerObj: z.array(z.unknown()),
  arbeidsdagerJobbonskerObj: z.array(z.unknown()),
  arbeidstidJobbonskerObj: z.array(
    z
      .object({ arbeidstidKode: z.string(), arbeidstidKodeTekst: z.string() })
      .nullable(),
  ),
  samletKompetanseObj: z.array(z.unknown()),
  totalLengdeYrkeserfaring: z.number(),
  synligForArbeidsgiverSok: z.boolean(),
  synligForVeilederSok: z.boolean(),
  oppstartKode: z.string(),
  veileder: z.string(),
  veilederIdent: z.string(),
  veilederVisningsnavn: z.null(),
  veilederEpost: z.null(),
  godkjenninger: z.array(z.unknown()),
  perioderMedInaktivitet: z.object({
    startdatoForInnevarendeInaktivePeriode: z.string(),
    sluttdatoerForInaktivePerioderPaToArEllerMer: z.array(z.string()),
  }),
});

export type KandidatinformasjonDTO = z.infer<typeof kandidatinformasjonSchema>;

export interface kandidatinformasjonProps {
  kandidatnr: string;
}

export const useKandidatinformasjon = (kandidatnr: string) =>
  useSWRImmutable(
    {
      url: kandidatinformasjonEndepunkt,
      body: { kandidatnr },
    },
    (data) => {
      return postApiWithSchemaEs(kandidatinformasjonSchema)(data);
    },
  );

export const kandidatinformasjonMirage = (server: any) => {
  return server.post(
    kandidatinformasjonEndepunkt,
    () => kandidatInformasjonMock,
  );
};
