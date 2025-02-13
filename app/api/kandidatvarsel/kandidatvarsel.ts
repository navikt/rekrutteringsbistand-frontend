import useSWR, { SWRResponse, useSWRConfig } from 'swr';
import { z } from 'zod';
import { Fødselsnummer } from '../../stilling/[stillingsId]/kandidater/KandidatIKandidatlisteTyper';
import { KandidatvarselAPI } from '../api-routes';
import { getAPI, postApi } from '../fetcher';
// import { fetchJson, postJson } from '../../kandidat/api/fetchUtils';

const varselStillingEndepunkt = (stillingId: string) => {
  if (stillingId === undefined) throw new Error('stillingId === undefined');
  return `${KandidatvarselAPI.internUrl}/varsler/stilling/${stillingId}`;
};
const varselQueryEndepunkt = `${KandidatvarselAPI.internUrl}/varsler/query`;

export enum Meldingsmal {
  VurdertSomAktuell = 'VURDERT_SOM_AKTUELL',
  FunnetPassendeStilling = 'PASSENDE_STILLING',
  Jobbarrangement = 'PASSENDE_JOBBARRANGEMENT',
  // EtterspurtPgaKorona = 'etterspurt_pga_korona',
  // Webinar = 'webinar',
}

export enum MinsideStatus {
  /** Det kommer ingen beskjed på min side, fordi varselet ble
   * opprettet før vi hadde minside-integrasjon. */
  IKKE_BESTILT = 'IKKE_BESTILT',

  /** Vi jobber med å få opprettet beskjeden  på minside. */
  UNDER_UTSENDING = 'UNDER_UTSENDING',

  /** Minside har bekreftet av de har opprettet beskjeden. */
  OPPRETTET = 'OPPRETTET',

  /** Beskjeden er slettet og ikke lenger synlig for bruker eller saksbehandler. */
  SLETTET = 'SLETTET',
}

const MinsideStatusSchema = z
  .literal(MinsideStatus.IKKE_BESTILT)
  .or(z.literal(MinsideStatus.UNDER_UTSENDING))
  .or(z.literal(MinsideStatus.OPPRETTET))
  .or(z.literal(MinsideStatus.SLETTET));

export enum BeskjedEksternStatus {
  /** Vi jobber med å sende ut eksternt varsel. Status er ikke avklart enda. */
  UNDER_UTSENDING = 'UNDER_UTSENDING',

  /** Vi har fått bekreftet at en SMS er sendt. */
  VELLYKKET_SMS = 'VELLYKKET_SMS',

  /** Vi har fått bekreftet at en e-post er sendt. */
  VELLYKKET_EPOST = 'VELLYKKET_EPOST',

  /** Varsling er ferdigstilt*/
  FERDIGSTILT = 'FERDIGSTILT',

  /** Det skjedde en feil, og vi vil ikke prøve å sende varselet igjen. */
  FEIL = 'FEIL',
}

export enum EksternKanal {
  SMS = 'SMS',
  EPOST = 'EPOST',
}

const EksternStatusSchema = z
  .literal(BeskjedEksternStatus.UNDER_UTSENDING)
  .or(z.literal(BeskjedEksternStatus.VELLYKKET_SMS))
  .or(z.literal(BeskjedEksternStatus.VELLYKKET_EPOST))
  .or(z.literal(BeskjedEksternStatus.FERDIGSTILT))
  .or(z.literal(BeskjedEksternStatus.FEIL));

const EksternKanalSchema = z
  .literal(null)
  .or(z.literal(EksternKanal.SMS))
  .or(z.literal(EksternKanal.EPOST));

const SmsSchema = z
  .object({
    id: z.string(),
    opprettet: z.string(),
    mottakerFnr: z.string(),
    stillingId: z.string(),
    avsenderNavident: z.string(),
    minsideStatus: MinsideStatusSchema,
    eksternStatus: EksternStatusSchema,
    eksternFeilmelding: z.string().nullable(),
    eksternKanal: EksternKanalSchema,
  })
  .partial({ eksternFeilmelding: true });

export type Sms = z.infer<typeof SmsSchema>;

const SmsArraySchema = z.array(SmsSchema);

export const useSmserForStilling = (
  stillingId: string | null | undefined,
): SWRResponse<Record<string, Sms>> =>
  useSWR(
    stillingId ? varselStillingEndepunkt(stillingId) : null,
    async (url: string) => {
      const rawResponse = await getAPI(url);
      const parsedResponse = SmsArraySchema.parse(rawResponse);
      const smser: Record<string, Sms> = {};
      parsedResponse.forEach((sms) => {
        smser[sms.mottakerFnr] = sms;
      });
      return smser;
    },
    {
      refreshInterval: 3_000,
    },
  );

type smserForKandidatRequest = { fnr: string | undefined | null };

export const useSmserForKandidat = ({
  fnr,
}: smserForKandidatRequest): SWRResponse<Sms[]> =>
  useSWR(
    typeof fnr === 'string' ? { url: varselQueryEndepunkt, fnr } : null,
    async ({ url, fnr }) =>
      SmsArraySchema.parse(await postApi(url, JSON.stringify({ fnr }))),
  );

type postSmsTilKandidaterRequest = {
  mal: Meldingsmal;
  fnr: string[];
  stillingId: string;
};
export const usePostSmsTilKandidater = () => {
  const { mutate } = useSWRConfig();

  return async ({ stillingId, mal, fnr }: postSmsTilKandidaterRequest) => {
    try {
      const response = await postApi(varselStillingEndepunkt(stillingId), {
        mal,
        fnr,
      });

      // Oppdater cache for både stilling og kandidat-spørringer
      await Promise.all([
        mutate(varselStillingEndepunkt(stillingId)),
        mutate(
          (key) =>
            key !== null &&
            typeof key === 'object' &&
            'url' in key &&
            key.url === varselQueryEndepunkt,
        ),
      ]);

      return response;
    } catch (e) {
      throw e; // La kallet som bruker hooken håndtere feilen
    }
  };
};
// export const usePostSmsTilKandidater = (): (({
//   mal,
//   fnr,
//   stillingId,
// }: postSmsTilKandidaterRequest) => Promise<'ok' | 'error'>) => {
//   const { mutate } = useSWRConfig();

//   return async ({ stillingId, mal, fnr }) => {
//     let result: 'ok' | 'error' = 'ok';
//     try {
//       await postApi(varselStillingEndepunkt(stillingId), {
//         mal,
//         fnr,
//       });
//     } catch (e) {
//       console.error(e);
//       result = 'error';
//     }

//     mutate(varselStillingEndepunkt(stillingId)).then();
//     mutate(
//       (key) =>
//         key !== null &&
//         typeof key === 'object' &&
//         'url' in key &&
//         key.url === varselQueryEndepunkt,
//     ).then();
//     return result;
//   };
// };

export const useSendtKandidatmelding = (
  kandidatensFnr: Fødselsnummer | null,
  stillingId: string | null,
  stillingskategori: string | null,
): Sms | undefined => {
  const erFormidling = stillingskategori === 'FORMIDLING';
  const { data: smser } = useSmserForStilling(erFormidling ? null : stillingId);

  if (typeof kandidatensFnr === 'string' && smser !== undefined) {
    return smser[kandidatensFnr];
  }
  return undefined;
};

// export const kandidatvarselMock = [
//   http.post<{ stillingId: string }>(
//     varselStillingEndepunkt(':stillingId'),
//     () => new HttpResponse(null, { status: 201 }),
//   ),

//   http.get<{ stillingId: string }>(
//     varselStillingEndepunkt(':stillingId'),
//     async ({ params }) => {
//       const { stillingId } = params;

//       if (stillingId === 'minIntern') {
//         return HttpResponse.json([
//           {
//             id: 'minIntern',
//             stillingId: 'minIntern',
//             mottakerFnr: '14114536327',
//             avsenderNavident: mockVeileder.navIdent,
//             opprettet: new Date().toISOString(),
//             minsideStatus: MinsideStatus.OPPRETTET,
//             eksternStatus: EksternStatus.VELLYKKET_SMS,
//           },
//         ]);
//       }

//       const sms = mockSms.filter((sms) => sms.stillingId === stillingId);

//       if (!sms) {
//         return new HttpResponse(null, { status: 404 });
//       } else {
//         return HttpResponse.json(sms);
//       }
//     },
//   ),

//   http.post<object, smserForKandidatRequest>(
//     varselQueryEndepunkt,
//     async ({ request }) => {
//       const { fnr } = await request.json();
//       const sms = mockSms.filter((sms) => sms.mottakerFnr === fnr);

//       if (!sms) {
//         return new HttpResponse(null, { status: 404 });
//       } else {
//         return HttpResponse.json(sms);
//       }
//     },
//   ),
// ];

const smsExampleMock = [
  {
    id: 'A69',
    opprettet: '2024-11-22T15:02:25.197824',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '13898799837',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A71',
    opprettet: '2024-11-22T15:10:49.650041',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '02518046937',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A68',
    opprettet: '2024-11-22T14:58:45.995817',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '16847496766',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A70',
    opprettet: '2024-11-22T15:02:55.871186',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '17838298621',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A112',
    opprettet: '2025-02-07T13:11:03.489174',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '29528910708',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A107',
    opprettet: '2025-02-04T15:22:08.340198',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '28869099653',
    avsenderNavident: 'Z993141',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A113',
    opprettet: '2025-02-07T13:11:11.095482',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '04479208765',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A114',
    opprettet: '2025-02-07T13:11:17.706953',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '17418940123',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A115',
    opprettet: '2025-02-07T13:11:28.071744',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '07476508902',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
  {
    id: 'A116',
    opprettet: '2025-02-07T13:11:38.16235',
    stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
    mottakerFnr: '21506801084',
    avsenderNavident: 'Z994886',
    minsideStatus: 'OPPRETTET',
    eksternStatus: 'FEIL',
    eksternFeilmelding: 'person_ikke_funnet',
    eksternKanal: null,
  },
];
export const kandidatvarselMirage = (server: any) => {
  return server.get(varselStillingEndepunkt('*'), () => smsExampleMock);
};

// const mockSms: Sms[] = [smsExampleMock];
