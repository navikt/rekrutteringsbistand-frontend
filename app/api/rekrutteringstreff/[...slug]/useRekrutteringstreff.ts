'use client';

import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { Endringsfelttype } from '@/app/api/rekrutteringstreff/[...slug]/endringer/mutations';
import { useSWRGet } from '@/app/api/useSWRGet';
import {
  RekrutteringstreffKategori,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import { z } from 'zod';

export const RekrutteringstreffStatusEnum = z.enum(
  Object.values(RekrutteringstreffStatus) as [string, ...string[]],
);
export type RekrutteringstreffStatusType = z.infer<
  typeof RekrutteringstreffStatusEnum
>;

export const RekrutteringstreffKategoriEnum = z.enum(
  RekrutteringstreffKategori,
);

/**
 * Endepunkt /useRekrutteringstreff
 */

const rekrutteringstreffEndepunkt = (id: string) =>
  `${RekrutteringstreffAPI.internUrl}/${id}`;

export const MinsideVarselSvarDataSchema = z.object({
  varselId: z.string(),
  avsenderReferanseId: z.string(),
  fnr: z.string(),
  eksternStatus: z.string().nullable(),
  minsideStatus: z.string().nullable(),
  opprettet: z.string().nullable(),
  avsenderNavident: z.string().nullable(),
  eksternFeilmelding: z.string().nullable(),
  eksternKanal: z.string().nullable(),
  mal: z.string().nullable(),
  flettedata: z.array(z.string()).nullable(),
});

export type MinsideVarselSvarData = z.infer<typeof MinsideVarselSvarDataSchema>;

export const RekrutteringstreffendringerSchema = z.object({
  endredeFelter: z.array(z.enum(Endringsfelttype)),
});

export type Rekrutteringstreffendringer = z.infer<
  typeof RekrutteringstreffendringerSchema
>;

export const OppmøteRegistrertDataSchema = z.object({
  deltakernummer: z.number().nullable().optional(),
});

export type OppmøteRegistrertData = z.infer<typeof OppmøteRegistrertDataSchema>;

export const VurderingHendelseDataSchema = z.object({
  arbeidsgiverTreffId: z.string().nullable().optional(),
  vurdering: z.string().nullable().optional(),
  forrigeVurdering: z.string().nullable().optional(),
});

export type VurderingHendelseData = z.infer<typeof VurderingHendelseDataSchema>;

/** `notat` er en kodeverdi fra Vurderingsnotat, aldri fritekst. */
export const NotatHendelseDataSchema = z.object({
  arbeidsgiverTreffId: z.string().nullable().optional(),
  notat: z.string().nullable().optional(),
});

export type NotatHendelseData = z.infer<typeof NotatHendelseDataSchema>;

export const AvtaltIntervjuHendelseDataSchema = z.object({
  arbeidsgiverTreffId: z.string().nullable().optional(),
  dato: z.string().nullable().optional(),
});

export type AvtaltIntervjuHendelseData = z.infer<
  typeof AvtaltIntervjuHendelseDataSchema
>;

export const ArbeidsgiverkontekstDataSchema = z.object({
  arbeidsgiverTreffId: z.string().nullable().optional(),
});

export type ArbeidsgiverkontekstData = z.infer<
  typeof ArbeidsgiverkontekstDataSchema
>;

export type HendelseData =
  | MinsideVarselSvarData
  | Rekrutteringstreffendringer
  | OppmøteRegistrertData
  | VurderingHendelseData
  | NotatHendelseData
  | AvtaltIntervjuHendelseData
  | ArbeidsgiverkontekstData;

export const parseHendelseData = (
  hendelsestype: string,
  data: unknown,
): HendelseData | null => {
  if (data == null) return null;
  switch (hendelsestype) {
    case 'MOTTATT_SVAR_FRA_MINSIDE':
      return MinsideVarselSvarDataSchema.parse(data);
    case 'TREFF_ENDRET_ETTER_PUBLISERING_NOTIFIKASJON':
      return RekrutteringstreffendringerSchema.parse(data);
    case 'REGISTRERT_OPPMØTE':
      return OppmøteRegistrertDataSchema.parse(data);
    case 'VURDERT':
      return VurderingHendelseDataSchema.parse(data);
    case 'NOTAT_LAGT_TIL':
    case 'NOTAT_FJERNET':
      return NotatHendelseDataSchema.parse(data);
    case 'AVTALT_INTERVJU':
      return AvtaltIntervjuHendelseDataSchema.parse(data);
    case 'AVTALT_INTERVJU_ANGRET':
    case 'JOBBTILBUD_GITT':
    case 'ANGRE_JOBBTILBUD_GITT':
      return ArbeidsgiverkontekstDataSchema.parse(data);
    default:
      return null;
  }
};

const HendelseRawSchema = z.object({
  id: z.string(),
  tidspunkt: z.string(),
  hendelsestype: z.string(),
  opprettetAvAktørType: z.string(),
  aktørIdentifikasjon: z.string().nullable(),
  hendelseData: z.unknown().nullable().optional(),
});

export const HendelseSchema = HendelseRawSchema.transform((h) => ({
  ...h,
  hendelseData: parseHendelseData(h.hendelsestype, h.hendelseData),
}));

export const RekrutteringstreffBaseSchema = z.object({
  id: z.string(),
  tittel: z.string(),
  beskrivelse: z.string().nullable(),
  fraTid: z.string().nullable(),
  tilTid: z.string().nullable(),
  svarfrist: z.string().nullable(),
  gateadresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  poststed: z.string().nullable(),
  kommune: z.string().nullable(),
  kommunenummer: z.string().nullable(),
  fylke: z.string().nullable(),
  fylkesnummer: z.string().nullable(),
  kategori: RekrutteringstreffKategoriEnum,
  status: RekrutteringstreffStatusEnum,
  opprettetAvPersonNavident: z.string(),
  opprettetAvNavkontorEnhetId: z.string(),
  opprettetAvTidspunkt: z.string(),
  antallArbeidsgivere: z.int(),
  antallJobbsøkere: z.int(),
  antallJobbsøkereSvartJa: z.int(),
  antallJobbsøkereFåttJobb: z.int(),
  eiere: z.array(z.string()),
  kontorer: z.array(z.string()),
  sistEndret: z.string(),
  sistEndretAv: z.string(),
});

export const RekrutteringstreffUtenHendelserSchema =
  RekrutteringstreffBaseSchema;

export type RekrutteringstreffDTO = z.infer<
  typeof RekrutteringstreffBaseSchema
>;

export type RekrutteringstreffUtenHendelserDTO = z.infer<
  typeof RekrutteringstreffUtenHendelserSchema
>;
export type HendelseDTO = z.output<typeof HendelseSchema>;

export type HendelseMedMinsideSvar = HendelseDTO & {
  hendelsestype: 'MOTTATT_SVAR_FRA_MINSIDE';
  hendelseData: MinsideVarselSvarData;
};

export const useRekrutteringstreff = (id?: string) => {
  return useSWRGet(
    id ? rekrutteringstreffEndepunkt(id) : null,
    RekrutteringstreffBaseSchema,
  );
};
