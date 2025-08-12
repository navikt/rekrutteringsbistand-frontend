import {
  KategoriSchema,
  LocationSchema,
} from '../../../api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { StillingSynlighet } from './mapStilling';
import { z } from 'zod';

export const OmVirksomhetenSchema = z.object({
  beskrivelse: z.string().optional().nullable(),
  employerhomepage: z.string().optional().nullable(),
  facebookpage: z.string().optional().nullable(),
  linkedinpage: z.string().optional().nullable(),
  twitteraddress: z.string().optional().nullable(),
  kontaktPersoner: z
    .array(
      z
        .object({
          name: z.string().min(1, 'Navn er påkrevd').nullable(),
          title: z.string().min(1, 'Tittel er påkrevd').nullable(),
          email: z
            .string()
            .refine(
              (val) => !val || /^[^@]+@[^@]+\.[^@]+$/.test(val),
              'Ugyldig e-postadresse',
            )
            .optional()
            .nullable(),
          phone: z
            .string()
            .refine(
              (val) => !val || val.length >= 8,
              'Telefonnummer må være minst 8 siffer',
            )
            .optional()
            .nullable(),
        })
        .refine(
          (data) => {
            return !!(data.email || data.phone);
          },
          {
            error: 'Du må fylle ut enten e-post eller telefonnummer',
            path: ['email'],
          },
        ),
    )
    .min(1, 'Minst én kontaktperson er påkrevd'),
});

export const OmTilretteleggingSchema = z
  .object({
    statligeInkluderingsdugnade: z.boolean().nullable(),
    tags: z.array(z.string()),
  })
  .optional()
  .nullable();

export const OmStillingenSchema = z
  .object({
    categoryList: z.array(KategoriSchema).min(1, 'Velg en yrkeskategori'),
    beskrivelse: z
      .string()
      .min(1, 'Beskrivelse om stillingen er påkrevd')
      .nullable(),
    lokasjoner: z.array(LocationSchema).optional().nullable(),
    adresser: z
      .array(LocationSchema)
      .optional()
      .nullable()
      .refine(
        (val) =>
          !val ||
          val.length === 0 ||
          !val.some((l) => !l.address || !l.postalCode || !l.city),
        {
          message:
            'Alle adressefelt må fylles ut (adresse, postnummer og poststed)',
        },
      ),
  })
  .superRefine((data, ctx) => {
    const lokEmpty = !data.lokasjoner || data.lokasjoner.length === 0;
    const adrEmpty = !data.adresser || data.adresser.length === 0;
    if (lokEmpty && adrEmpty) {
      ctx.addIssue({
        code: 'custom',
        path: ['lokasjoner'],
        message: 'Du må fylle ut minst én lokasjon eller adresse',
      });
    }
  });
export const PraktiskInfoSchema = z
  .object({
    sektor: z.string().min(1, 'Sektor må velges').nullable(),
    omfangKode: z.string().min(1, 'Omfang må velges'),
    omfangProsent: z.string().nullable(),
    antallStillinger: z
      .preprocess((val) => {
        if (val === null || val === undefined) return val;

        if (typeof val === 'string' && val === '') return null;

        if (typeof val === 'number' && !isNaN(val)) return val;

        const num = typeof val === 'string' ? Number(val) : NaN;

        return isNaN(num) ? null : num;
      }, z.number().nullable().optional())
      .refine((val) => val !== null && val !== undefined && val > 0, {
        error: 'Antall stillinger må fylles ut',
      }),
    oppstart: z.string().nullable(),
    oppstartEtterAvtale: z.boolean(),
    søknadsfrist: z.string().nullable(),
    søknadsfristSnarest: z.boolean(),
    arbeidstidsordning: z.string().nullable(),
    ansettelsesform: z
      .string()
      .nullable()
      .refine((val) => val !== null && val !== '', {
        error: 'Ansettelsesform må velges',
      }),
    dager: z
      .array(z.string({ error: 'Arbeidsdager må velges' }))
      .min(1, 'Velg minst én arbeidsdag'),
    tid: z
      .array(
        z.string({
          error: 'Arbeidstid må velges',
        }),
      )
      .min(1, 'Velg minst én arbeidstid'),
  })
  .superRefine((data, ctx) => {
    if (data.omfangKode === 'Deltid' && !data.omfangProsent) {
      ctx.addIssue({
        code: 'custom',
        error: 'Du må fylle ut omfang i prosent for deltid',
        path: ['omfangProsent'],
      });
    }

    if (!data.oppstart && !data.oppstartEtterAvtale) {
      ctx.addIssue({
        code: 'custom',
        error: 'Du må fylle ut enten oppstart eller oppstart etter avtale',
        path: ['oppstart'],
      });
    }

    if (!data.søknadsfrist && !data.søknadsfristSnarest) {
      ctx.addIssue({
        code: 'custom',
        error: 'Du må fylle ut enten søknadsfrist eller velge snarest',
        path: ['søknadsfrist'],
      });
    }
  });

export const InnspurtSchema = z
  .object({
    publiseres: z.string().min(1, 'Publiseringsdato er påkrevd').nullable(),
    avsluttes: z.string().min(1, 'Avsluttingsdato er påkrevd').nullable(),
    stillingType: z.string().min(1, 'Stillingstype er påkrevd'),
    epost: z.string().email('Ugyldig e-postadresse').optional().nullable(),
    lenke: z.string().url('Ugyldig URL').optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (
      data.stillingType === StillingSynlighet.EKSTERN &&
      !data.epost &&
      !data.lenke
    ) {
      ctx.addIssue({
        code: 'custom',
        error: 'Du må fylle ut enten e-post eller lenke',
        path: ['epost'],
      });
    }
  });

export type OmVirksomhetenType = z.infer<typeof OmVirksomhetenSchema>;
export type OmStillingenType = z.infer<typeof OmStillingenSchema>;
export type PraktiskInfoType = z.infer<typeof PraktiskInfoSchema>;
export type OmTilretteleggingType = z.infer<typeof OmTilretteleggingSchema>;
export type InnspurtType = z.infer<typeof InnspurtSchema>;

export const StillingsDataFormSchema = z.object({
  omVirksomheten: OmVirksomhetenSchema,
  omTilrettelegging: OmTilretteleggingSchema,
  omStillingen: OmStillingenSchema,
  praktiskInfo: PraktiskInfoSchema,
  innspurt: InnspurtSchema,
});

export type StillingsDataForm = z.infer<typeof StillingsDataFormSchema>;
