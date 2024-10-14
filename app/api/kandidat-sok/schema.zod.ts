// import { z } from 'zod';

// export type KandidatDataSchemaDTO = z.infer<typeof KandidatDataSchema>;
// export type FørerkortSchemaDTO = z.infer<typeof ForerkortSchema>;
// export type SprakSchemaDTO = z.infer<typeof SprakSchema>;

// // const z.string().optional().nullable() = z
// //   .union([z.string(), z.array(z.string())])
// //   .optional()
// //   .nullable();
// // const z.string().optional().nullable() = z.string().optional().nullable();
// // const z.string().optional().nullable() = z.string().optional().nullable();
// // const z.boolean().optional().nullable() = z.boolean().optional().nullable();
// // const z.number().optional().nullable(); = z.number().int().optional().nullable();
// // const z.number().optional().nullable(); = z.number().optional().nullable();

// // const NavKontorSchema = z
// //   .object({
// //     navkontor: z.string().optional().nullable(),
// //     text: z.string().optional().nullable(),
// //     completion: z.string().optional().nullable(),
// //   })
// //   .optional()
// //   .nullable();

// const UtdanningSchema = z
//   .object({
//     fraDato: z.string().optional().nullable(),
//     tilDato: z.string().optional().nullable(),
//     utdannelsessted: z.string().optional().nullable(),
//     nusKode: z.string().optional().nullable(),
//     nusKodeGrad: z.string().optional().nullable(),
//     alternativGrad: z.string().optional().nullable(),
//     yrkestatus: z.string().optional().nullable(),
//     beskrivelse: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const FagdokumentasjonSchema = z
//   .object({
//     type: z.string().optional().nullable(),
//     tittel: z.string().optional().nullable(),
//     beskrivelse: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const YrkeserfaringSchema = z
//   .object({
//     fraDato: z.string().optional().nullable(),
//     tilDato: z.string().optional().nullable().nullable(), // Kan være null
//     arbeidsgiver: z.string().optional().nullable(),
//     styrkKode: z.string().optional().nullable(),
//     styrkKode4Siffer: z.string().optional().nullable(),
//     styrkKode3Siffer: z.string().optional().nullable(),
//     stillingstittel: z.string().optional().nullable(),
//     stillingstitlerForTypeahead: z.array(z.string()).optional().nullable(),
//     alternativStillingstittel: z.string().optional().nullable(),
//     sokeTitler: z.array(z.string()).optional().nullable(),
//     organisasjonsnummer: z.string().optional().nullable(),
//     naceKode: z.string().optional().nullable(),
//     yrkeserfaringManeder: z.number().optional().nullable(),
//     utelukketForFremtiden: z.boolean().optional().nullable(),
//     beskrivelse: z.string().optional().nullable(),
//     sted: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const KompetanseObjektSchema = z
//   .object({
//     kompKodeNavn: z.string().optional().nullable(),
//     sokeNavn: z.array(z.string()).optional().nullable(),
//     alternativtNavn: z.string().optional().nullable(),
//     beskrivelse: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const GodkjenningSchema = z
//   .object({
//     tittel: z.string().optional().nullable(),
//     gjennomfoert: z.string().optional().nullable(),
//     utloeper: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const AnnenErfaringSchema = z
//   .object({
//     fraDato: z.string().optional().nullable(),
//     tilDato: z.string().optional().nullable(),
//     beskrivelse: z.string().optional().nullable(),
//     rolle: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const SertifikatObjektSchema = z
//   .object({
//     sertifikatKodeNavn: z.string().optional().nullable(),
//     alternativtNavn: z.string().optional().nullable(),
//     utsteder: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const ForerkortSchema = z
//   .object({
//     fraDato: z.string().optional().nullable(),
//     tilDato: z.string().optional().nullable(),
//     forerkortKode: z.string().optional().nullable(),
//     forerkortKodeKlasse: z.string().optional().nullable(),
//     alternativKlasse: z.string().optional().nullable(),
//     utsteder: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const SprakSchema = z
//   .object({
//     sprakKodeTekst: z.string().optional().nullable(),
//     alternativTekst: z.string().optional().nullable(),
//     beskrivelse: z.string().optional().nullable(),
//     ferdighetMuntlig: z.string().optional().nullable(),
//     ferdighetSkriftlig: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const KursSchema = z
//   .object({
//     tittel: z.string().optional().nullable(),
//     arrangor: z.string().optional().nullable(),
//     beskrivelse: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const VervSchema = z
//   .object({
//     organisasjon: z.string().optional().nullable(),
//     tittel: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const GeografiJobbonskeSchema = z
//   .object({
//     geografiKodeTekst: z.string().optional().nullable(),
//     geografiKode: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const YrkeJobbonskeSchema = z
//   .object({
//     styrkBeskrivelse: z.string().optional().nullable(),
//     sokeTitler: z.array(z.string()).optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const OmfangJobbonskeSchema = z
//   .object({
//     omfangKodeTekst: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const AnsettelsesformJobbonskeSchema = z
//   .object({
//     ansettelsesformKode: z.string().optional().nullable(),
//     ansettelsesformKodeTekst: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const ArbeidstidsordningJobbonskeSchema = z
//   .object({
//     arbeidstidsordningKode: z.string().optional().nullable(),
//     arbeidstidsordningKodeTekst: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const ArbeidsdagerJobbonskeSchema = z
//   .object({
//     arbeidsdagerKode: z.string().optional().nullable(),
//     arbeidsdagerKodeTekst: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// const ArbeidstidJobbonskeSchema = z
//   .object({
//     arbeidstidKode: z.string().optional().nullable(),
//     arbeidstidKodeTekst: z.string().optional().nullable(),
//   })
//   .optional()
//   .nullable();

// // const SamletKompetanseSchema = z
// //   .object({
// //     samletKompetanseTekst: z.string().optional().nullable(),
// //   })
// //   .optional()
// //   .nullable();

// const PerioderMedInaktivitetSchema = z
//   .object({
//     startdatoForInnevarendeInaktivePeriode: z.string().optional().nullable(),
//     sluttdatoerForInaktivePerioderPaToArEllerMer: z
//       .array(z.string().optional().nullable())
//       .optional()
//       .nullable(),
//   })
//   .optional()
//   .nullable();

// export const KandidatDataSchema = z.object({
//   fritekst: z.string().optional().nullable(),
//   aktorId: z.string().optional().nullable(),
//   fodselsnummer: z.string().optional().nullable(),
//   fornavn: z.string().optional().nullable(),
//   etternavn: z.string().optional().nullable(),
//   fodselsdato: z.string().optional().nullable(),
//   fodselsdatoErDnr: z.boolean().optional().nullable(),
//   formidlingsgruppekode: z.string().optional().nullable(),
//   epostadresse: z.string().optional().nullable(),
//   mobiltelefon: z.string().optional().nullable(),
//   harKontaktinformasjon: z.boolean().optional().nullable(),
//   telefon: z.string().optional().nullable(),
//   statsborgerskap: z.string().optional().nullable(),
//   kandidatnr: z.string().optional().nullable(),
//   arenaKandidatnr: z.string().optional().nullable(),
//   beskrivelse: z.string().optional().nullable(),
//   samtykkeStatus: z.string().optional().nullable(),
//   samtykkeDato: z.string().optional().nullable(),
//   adresselinje1: z.string().optional().nullable(),
//   adresselinje2: z.string().optional().nullable(),
//   adresselinje3: z.string().optional().nullable(),
//   postnummer: z.string().optional().nullable(),
//   poststed: z.string().optional().nullable(),
//   landkode: z.string().optional().nullable(),
//   kommunenummer: z.number().optional().nullable(),
//   kommunenummerkw: z.union([z.string(), z.number()]).optional().nullable(),
//   kommunenummerstring: z.string().optional().nullable(),
//   kommuneNavn: z.string().optional().nullable(),
//   fylkeNavn: z.string().optional().nullable(),
//   disponererBil: z.boolean().optional().nullable(),
//   tidsstempel: z.string().optional().nullable(),
//   doed: z.boolean().optional().nullable(),
//   frKode: z.string().optional().nullable(),
//   kvalifiseringsgruppekode: z.string().optional().nullable(),
//   hovedmaalkode: z.string().optional().nullable(),
//   orgenhet: z.string().optional().nullable(),
//   // navkontor: NavKontorSchema,
//   fritattKandidatsok: z.boolean().optional().nullable(),
//   fritattAgKandidatsok: z.boolean().optional().nullable(),
//   utdanning: z.array(UtdanningSchema).optional().nullable(),
//   fagdokumentasjon: z.array(FagdokumentasjonSchema).optional().nullable(),
//   yrkeserfaring: z.array(YrkeserfaringSchema).optional().nullable(),
//   kompetanseObj: z.array(KompetanseObjektSchema).optional().nullable(),
//   godkjenning: z.array(GodkjenningSchema).optional().nullable(),
//   annenerfaringObj: z.array(AnnenErfaringSchema).optional().nullable(),
//   sertifikatObj: z.array(SertifikatObjektSchema).optional().nullable(),
//   forerkort: z.array(ForerkortSchema).optional().nullable(),
//   sprak: z.array(SprakSchema).optional().nullable(),
//   kursObj: z.array(KursSchema).optional().nullable(),
//   vervObj: z.array(VervSchema).optional().nullable(),
//   geografiJobbonsker: z.array(GeografiJobbonskeSchema).optional().nullable(),
//   yrkeJobbonskerObj: z.array(YrkeJobbonskeSchema).optional().nullable(),
//   omfangJobbonskerObj: z.array(OmfangJobbonskeSchema).optional().nullable(),
//   ansettelsesformJobbonskerObj: z
//     .array(AnsettelsesformJobbonskeSchema)
//     .optional()
//     .nullable(),
//   arbeidstidsordningJobbonskerObj: z
//     .array(ArbeidstidsordningJobbonskeSchema)
//     .optional()
//     .nullable(),
//   arbeidsdagerJobbonskerObj: z
//     .array(ArbeidsdagerJobbonskeSchema)
//     .optional()
//     .nullable(),
//   arbeidstidJobbonskerObj: z
//     .array(ArbeidstidJobbonskeSchema)
//     .optional()
//     .nullable(),
//   // samletKompetanseObj: SamletKompetanseSchema,
//   totalLengdeYrkeserfaring: z.number().optional().nullable(),
//   synligForArbeidsgiverSok: z.boolean().optional().nullable(),
//   synligForVeilederSok: z.boolean().optional().nullable(),
//   oppstartKode: z.string().optional().nullable(),
//   veileder: z.string().optional().nullable(),
//   veilederIdent: z.string().optional().nullable(),
//   veilederVisningsnavn: z.string().optional().nullable(),
//   veilederEpost: z.string().optional().nullable(),
//   perioderMedInaktivitet: z
//     .array(PerioderMedInaktivitetSchema)
//     .optional()
//     .nullable(),
// });
