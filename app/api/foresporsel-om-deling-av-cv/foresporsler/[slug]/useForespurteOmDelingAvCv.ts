'use client';
/**
 * Endepunkt /useForespurteOmDelingAvCv
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { ForespørselDelingAvCvAPI } from '../../../api-routes';
import { getAPIwithSchema } from '../../../fetcher';

const ForespurteOmDelingAvCvEndepunkt = (stillingsId: string) => {
  return `${ForespørselDelingAvCvAPI.internUrl}/foresporsler/${stillingsId}`;
};

const forespørselSvar = z.object({
  harSvartJa: z.boolean(),
  svarTidspunkt: z.string(),
  svartAv: z.object({
    ident: z.string(),
    identType: z.string(),
  }),
});

const ForespurtOmDelingSchema = z.object({
  aktørId: z.string(),
  stillingsId: z.string(),
  deltStatus: z.string(),
  deltTidspunkt: z.string(),
  deltAv: z.string(),
  svarfrist: z.string(),
  tilstand: z.string(),
  svar: forespørselSvar.nullable(),
  begrunnelseForAtAktivitetIkkeBleOpprettet: z.null(),
  navKontor: z.string(),
});

const ForespurteOmDelingAvCvSchema = z.record(
  z.string(),
  z.array(ForespurtOmDelingSchema),
);

export type KandidatForespurtOmDelingSchema = z.infer<
  typeof ForespurtOmDelingSchema
>;

export type ForespurteOmDelingAvCvDTO = z.infer<
  typeof ForespurteOmDelingAvCvSchema
>;

export const useForespurteOmDelingAvCv = (stillingsId: string) =>
  useSWRImmutable(
    ForespurteOmDelingAvCvEndepunkt(stillingsId),
    getAPIwithSchema(ForespurteOmDelingAvCvSchema),
  );

export const foresporselOmDelingAvCVMirage = (server: any) => {
  server.get(ForespurteOmDelingAvCvEndepunkt('*'), () => {
    return {
      '2433932565652': [
        {
          aktørId: '2433932565652',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-09-25T12:09:38.835',
          deltAv: 'Z993141',
          svarfrist: '2024-09-28T00:00:00+02:00',
          tilstand: 'AVBRUTT',
          svar: null,
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0321',
        },
      ],
      '2488782814541': [
        {
          aktørId: '2488782814541',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-09-16T14:05:18.136',
          deltAv: 'Z994440',
          svarfrist: '2024-09-24T00:00:00+02:00',
          tilstand: 'HAR_SVART',
          svar: {
            harSvartJa: true,
            svarTidspunkt: '2024-09-16T12:05:53.835',
            svartAv: {
              ident: 'Z994440',
              identType: 'NAV_IDENT',
            },
          },
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0403',
        },
      ],
      '2977908225906': [
        {
          aktørId: '2977908225906',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-09-16T14:13:35.79',
          deltAv: 'Z994440',
          svarfrist: '2024-09-24T00:00:00+02:00',
          tilstand: 'HAR_SVART',
          svar: {
            harSvartJa: true,
            svarTidspunkt: '2024-09-16T12:13:51.787',
            svartAv: {
              ident: 'Z994440',
              identType: 'NAV_IDENT',
            },
          },
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0403',
        },
      ],
      '2362910521169': [
        {
          aktørId: '2362910521169',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-09-16T14:20:14.082',
          deltAv: 'Z994440',
          svarfrist: '2024-09-24T00:00:00+02:00',
          tilstand: 'HAR_SVART',
          svar: {
            harSvartJa: true,
            svarTidspunkt: '2024-09-16T12:20:29.945',
            svartAv: {
              ident: 'Z994440',
              identType: 'NAV_IDENT',
            },
          },
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0403',
        },
      ],
      '2017078441904': [
        {
          aktørId: '2017078441904',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-09-17T15:46:11.569',
          deltAv: 'Z993141',
          svarfrist: '2024-09-20T00:00:00+02:00',
          tilstand: 'HAR_SVART',
          svar: {
            harSvartJa: true,
            svarTidspunkt: '2024-09-17T13:46:25.734',
            svartAv: {
              ident: 'Z993141',
              identType: 'NAV_IDENT',
            },
          },
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0321',
        },
      ],
      '2148092574647': [
        {
          aktørId: '2148092574647',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-11-14T12:34:08.799',
          deltAv: 'Z993141',
          svarfrist: '2024-11-17T00:00:00+01:00',
          tilstand: 'HAR_SVART',
          svar: {
            harSvartJa: false,
            svarTidspunkt: '2024-11-14T11:34:39.128',
            svartAv: {
              ident: 'Z993141',
              identType: 'NAV_IDENT',
            },
          },
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0321',
        },
      ],
      '2605683014182': [
        {
          aktørId: '2605683014182',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-11-06T12:47:35.894',
          deltAv: 'Z993141',
          svarfrist: '2024-11-09T00:00:00+01:00',
          tilstand: 'HAR_SVART',
          svar: {
            harSvartJa: true,
            svarTidspunkt: '2024-11-06T11:57:23.17',
            svartAv: {
              ident: 'Z993141',
              identType: 'NAV_IDENT',
            },
          },
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0321',
        },
      ],
      '2656264140912': [
        {
          aktørId: '2656264140912',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-11-18T13:29:42.124',
          deltAv: 'Z994440',
          svarfrist: '2024-11-21T00:00:00+01:00',
          tilstand: 'AVBRUTT',
          svar: null,
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0403',
        },
      ],
      '2019125840326': [
        {
          aktørId: '2019125840326',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2024-11-18T14:02:02.248',
          deltAv: 'Z994886',
          svarfrist: '2024-11-21T00:00:00+01:00',
          tilstand: 'AVBRUTT',
          svar: null,
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0300',
        },
      ],
      '2043300676293': [
        {
          aktørId: '2043300676293',
          stillingsId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
          deltStatus: 'SENDT',
          deltTidspunkt: '2025-02-04T16:20:21.492',
          deltAv: 'Z993141',
          svarfrist: '2025-02-07T00:00:00+01:00',
          tilstand: 'KAN_IKKE_VARSLE',
          svar: null,
          begrunnelseForAtAktivitetIkkeBleOpprettet: null,
          navKontor: '0321',
        },
      ],
    };
  });
};
