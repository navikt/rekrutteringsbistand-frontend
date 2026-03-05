import { KandidatvarselAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { RekbisError } from '@/util/rekbisError';
import { HttpResponse } from 'msw';

export const varselStillingEndepunkt = (stillingId: string) => {
  if (stillingId === undefined)
    throw new RekbisError({ message: 'stillingId === undefined' });
  return `${KandidatvarselAPI.internUrl}/varsler/stilling/${stillingId}`;
};

export const varselQueryEndepunkt = `${KandidatvarselAPI.internUrl}/varsler/query`;

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

export const kandidatvarselMSWHandler = getMock(
  varselStillingEndepunkt('*'),
  () => HttpResponse.json(smsExampleMock),
);
