'use client';

import { PamOntologiAPI } from '@/app/api/api-routes';
import { getAPIwithSchema } from '@/app/api/fetcher';
import { http, HttpResponse } from 'msw';
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';

const pamEndepunkt = (søkeord: string) =>
  PamOntologiAPI.internUrl + `/stillingsTittel?q=${søkeord}`;

export const JanzzTittelSchema = z.object({
  konseptId: z.number(),
  styrk08: z.string(),
  styrk08Label: z.string().optional(),
  esco: z.string(),
  escoLabel: z.string(),
  label: z.string(),
  undertype: z.string(),
});

export const stillingsTittelTreffSchema = z.array(JanzzTittelSchema);

export type JanzzTittelDTO = z.infer<typeof JanzzTittelSchema>;

export const useStillingsTittel = (søkeOrd?: string) =>
  useSWRImmutable(
    søkeOrd ? pamEndepunkt(søkeOrd) : null,
    getAPIwithSchema(stillingsTittelTreffSchema),
  );

export const stillingsTittelMSWHandler = http.get(
  PamOntologiAPI.internUrl + `/stillingsTittel`,
  () =>
    HttpResponse.json([
      {
        konseptId: 175819,
        styrk08: '3411',
        esco: '',
        escoLabel: '',
        label: 'Testamentåpningsrepresentant',
        undertype: '',
      },
      {
        konseptId: 216011,
        styrk08: '2519',
        esco: 'http://data.europa.eu/esco/occupation/106f79e4-6264-45f1-9e7a-297435cd684b',
        escoLabel: 'programvaretester',
        label: 'Test automatiseringsingeniør',
        undertype: '',
      },
      {
        konseptId: 109237,
        styrk08: '7543',
        esco: 'http://data.europa.eu/esco/isco/C7543',
        escoLabel: 'Produkttestere (ikke matprodukter)',
        label: 'Tester',
        undertype: '',
      },
      {
        konseptId: 327556,
        styrk08: '3112',
        esco: 'http://data.europa.eu/esco/occupation/adf9257e-78cb-467d-b259-59ed65bd7aed',
        escoLabel: 'branntekniker',
        label: 'Tester af brannsikkerhet, materialtester',
        undertype: '',
      },
      {
        konseptId: 2486745,
        styrk08: '2519',
        esco: 'http://data.europa.eu/esco/occupation/50af07f0-7a75-424e-a66d-5a9deea10f4c',
        escoLabel: 'IKT-tilgjengelighetstester',
        label: 'Tester av IKT-tilgjengelighet',
        undertype: '',
      },
      {
        konseptId: 164706,
        styrk08: '7515',
        esco: '',
        escoLabel: '',
        label: 'Tester av ølkvalitet',
        undertype: '',
      },
      {
        konseptId: 327679,
        styrk08: '3115',
        esco: 'http://data.europa.eu/esco/occupation/80a648c5-ecb7-40e6-a4d4-7680291ffa74',
        escoLabel: 'motorkontrollør, rullende materiell',
        label: 'Tester for lokomotivdrift',
        undertype: '',
      },
      {
        konseptId: 97173,
        styrk08: '2149',
        esco: 'http://data.europa.eu/esco/occupation/c8fa93eb-7c2c-42c3-b135-c2e825a6615e',
        escoLabel: 'testingeniør',
        label: 'Testingeniør',
        undertype: '',
      },
      {
        konseptId: 241051,
        styrk08: '2152',
        esco: 'http://data.europa.eu/esco/occupation/2026adb2-62d7-4b92-9ccb-105abdebe37d',
        escoLabel: 'ingeniør, elektromagnetisme',
        label: 'Testingeniør electro magnetic compatibility (EMC)',
        undertype: '',
      },
      {
        konseptId: 113983,
        styrk08: '3114',
        esco: 'http://data.europa.eu/esco/isco/C2153',
        escoLabel: 'Sivilingeniører (telekommunikasjon)',
        label: 'Testingeniør elektronikk og telekommunikasjon',
        undertype: '',
      },
      {
        konseptId: 2481251,
        styrk08: '1330',
        esco: 'http://data.europa.eu/esco/occupation/52d5edc9-7902-4cd3-8b06-6bd77c98d440',
        escoLabel: 'IKT-systemtester',
        label: 'Testingeniør IT',
        undertype: '',
      },
    ]),
);
