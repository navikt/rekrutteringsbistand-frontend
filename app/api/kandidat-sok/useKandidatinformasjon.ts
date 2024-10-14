import useSWRImmutable from 'swr/immutable';
import { KandidatSøkAPI } from '../api-routes';
import { postApiWithSchemaEs } from '../fetcher';
import { kandidatInformasjonMock } from './mocks/kandidatinformasjonMock';
import { KandidatDataSchema } from './schema/cvSchema.zod';

const kandidatinformasjonEndepunkt = `${KandidatSøkAPI.internUrl}/lookup-cv`;

// export const kandidatinformasjonSchema = z.object({
//   aktorId: z.string().nullable(),
//   fodselsnummer: z.string().nullable(),
//   fornavn: z.string().nullable(),
//   etternavn: z.string().nullable(),
//   fodselsdato: z.string().nullable(),
//   fodselsdatoErDnr: z.boolean(),
//   formidlingsgruppekode: z.string().nullable(),
//   epostadresse: z.string().nullable(),
//   mobiltelefon: z.null(),
//   harKontaktinformasjon: z.boolean(),
//   telefon: z.string().nullable(),
//   statsborgerskap: z.null(),
//   kandidatnr: z.string().nullable(),
//   arenaKandidatnr: z.string().nullable(),
//   beskrivelse: z.string().nullable(),
//   samtykkeStatus: z.string().nullable(),
//   samtykkeDato: z.string().nullable(),
//   adresselinje1: z.string().nullable(),
//   adresselinje2: z.string().nullable(),
//   adresselinje3: z.string().nullable(),
//   postnummer: z.string().nullable(),
//   poststed: z.string().nullable(),
//   landkode: z.null(),
//   kommunenummer: z.number().nullable(),
//   kommunenummerstring: z.string().nullable(),
//   fylkeNavn: z.string().nullable(),
//   kommuneNavn: z.string().nullable().nullable(),
//   disponererBil: z.null(),
//   tidsstempel: z.string().nullable(),
//   doed: z.boolean(),
//   frKode: z.string().nullable(),
//   kvalifiseringsgruppekode: z.string().nullable(),
//   hovedmaalkode: z.string().nullable(),
//   orgenhet: z.string().nullable(),
//   navkontor: z.string().nullable(),
//   fritattKandidatsok: z.null(),
//   fritattAgKandidatsok: z.null(),
//   utdanning: z.array(
//     z
//       .object({
//         fraDato: z.string().nullable(),
//         tilDato: z.string().nullable(),
//         utdannelsessted: z.string().nullable(),
//         nusKode: z.string().nullable(),
//         alternativGrad: z.string().nullable(),
//         yrkestatus: z.string().nullable(),
//         beskrivelse: z.string().nullable(),
//       })
//       .nullable(),
//   ),
//   fagdokumentasjon: z.array(z.object({ type: z.string(), tittel: z.string() })),
//   yrkeserfaring: z.array(
//     z
//       .object({
//         fraDato: z.string().nullable(),
//         tilDato: z.string().nullable(),
//         arbeidsgiver: z.string().nullable(),
//         styrkKode: z.string().nullable(),
//         styrkKode4Siffer: z.string().nullable(),
//         styrkKode3Siffer: z.string().nullable(),
//         stillingstittel: z.string().nullable(),
//         stillingstitlerForTypeahead: z.array(z.string().nullable()),
//         alternativStillingstittel: z.string().nullable(),
//         sokeTitler: z.array(z.string().nullable()),
//         organisasjonsnummer: z.null(),
//         naceKode: z.null(),
//         yrkeserfaringManeder: z.number().nullable(),
//         utelukketForFremtiden: z.boolean(),
//         beskrivelse: z.string().nullable(),
//         sted: z.string().nullable(),
//       })
//       .nullable(),
//   ),
//   kompetanseObj: z.array(z.unknown()),
//   annenerfaringObj: z.array(z.unknown()),
//   sertifikatObj: z.array(z.unknown()),
//   forerkort: z.array(
//     z
//       .object({
//         fraDato: z.string().nullable(),
//         tilDato: z.string().nullable(),
//         forerkortKode: z.number().nullable(),
//         forerkortKodeKlasse: z.string().nullable(),
//         alternativKlasse: z.string().nullable(),
//         utsteder: z.string().nullable(),
//       })
//       .nullable(),
//   ),
//   sprak: z.array(
//     z
//       .object({
//         fraDato: z.string().nullable(),
//         sprakKode: z.number().nullable(),
//         sprakKodeTekst: z.string().nullable(),
//         alternativTekst: z.string().nullable(),
//         beskrivelse: z.string().nullable(),
//         ferdighetMuntlig: z.string().nullable(),
//         ferdighetSkriftlig: z.string().nullable(),
//       })
//       .nullable(),
//   ),
//   kursObj: z.array(z.unknown()),
//   vervObj: z.array(z.unknown()),
//   geografiJobbonsker: z
//     .array(
//       z.object({
//         geografiKodeTekst: z.string().nullable(),
//         geografiKode: z.string().nullable(),
//       }),
//     )
//     .nullable(),
//   yrkeJobbonskerObj: z.array(
//     z
//       .object({
//         styrkKode: z.string().nullable(),
//         styrkBeskrivelse: z.string().nullable(),
//         sokeTitler: z.array(z.string().nullable()),
//         primaertJobbonske: z.boolean(),
//       })
//       .nullable(),
//   ),
//   omfangJobbonskerObj: z
//     .array(
//       z.object({
//         omfangKode: z.string().nullable(),
//         omfangKodeTekst: z.string().nullable(),
//       }),
//     )
//     .nullable(),
//   ansettelsesformJobbonskerObj: z
//     .array(
//       z.object({
//         ansettelsesformKode: z.string().nullable(),
//         ansettelsesformKodeTekst: z.string().nullable(),
//       }),
//     )
//     .nullable(),
//   arbeidstidsordningJobbonskerObj: z.array(z.unknown()),
//   arbeidsdagerJobbonskerObj: z.array(z.unknown()),
//   arbeidstidJobbonskerObj: z.array(
//     z
//       .object({
//         arbeidstidKode: z.string().nullable(),
//         arbeidstidKodeTekst: z.string().nullable(),
//       })
//       .nullable(),
//   ),
//   samletKompetanseObj: z.array(z.unknown()),
//   totalLengdeYrkeserfaring: z.number().nullable(),
//   synligForArbeidsgiverSok: z.boolean(),
//   synligForVeilederSok: z.boolean(),
//   oppstartKode: z.string().nullable(),
//   veileder: z.string().nullable(),
//   veilederIdent: z.string().nullable(),
//   veilederVisningsnavn: z.string().nullable(),
//   veilederEpost: z.string().nullable(),
//   godkjenninger: z.array(z.unknown()),
//   perioderMedInaktivitet: z.object({
//     startdatoForInnevarendeInaktivePeriode: z.string().nullable(),
//     sluttdatoerForInaktivePerioderPaToArEllerMer: z.array(
//       z.string().nullable(),
//     ),
//   }),
// });

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
      return postApiWithSchemaEs(KandidatDataSchema)(data);
    },
  );

export const kandidatinformasjonMirage = (server: any) => {
  return server.post(
    kandidatinformasjonEndepunkt,
    () => kandidatInformasjonMock,
  );
};
