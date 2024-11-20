'use client';
/**
 * Endepunkt /useKandidatListeoversikt
 */
import useSWRImmutable from 'swr/immutable';
import { z } from 'zod';
import { KandidatAPI } from '../api-routes';
import { getAPIwithSchema } from '../fetcher';
import { kandidatHistorikkSchema } from './schema.zod';

const kandidatListeoversiktEndepunkt = (kandidatId: string) =>
  `${KandidatAPI.internUrl}/veileder/kandidater/${kandidatId}/listeoversikt?inkluderSlettede=true`;

const KandidatListeoversiktSchema = z.array(kandidatHistorikkSchema);

export const useKandidatListeoversikt = (kandidatId?: string) =>
  useSWRImmutable(
    kandidatId ? kandidatListeoversiktEndepunkt(kandidatId) : null,
    getAPIwithSchema(KandidatListeoversiktSchema),
  );

export const kandidatlisteoversiktMirage = (server: any) => {
  return server.get(kandidatListeoversiktEndepunkt('*'), () => [
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-17T13:58:25.213',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '21a78e8f-7a5f-4753-87eb-e9a5ceb5929e',
      tittel: 'Jobbmesse',
      organisasjonReferanse: null,
      organisasjonNavn: 'ALFABETISK PLUTSELIG KATT OVERSKRIFT',
      stillingId: null,
      slettet: false,
      utfallsendringer: [],
      stillingskategori: null,
      opprettetAvIdent: 'Z994440',
      erMaskert: true,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-13T17:17:31.918',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'FATT_JOBBEN',
      uuid: 'ab576819-dd6d-4b6e-a158-e800ee723324',
      tittel: 'Kandidatliste',
      organisasjonReferanse: null,
      organisasjonNavn: 'BARMHJERTIG EFFEKTIV TIGER AS',
      stillingId: null,
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-06-13T17:36:46.437',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-06-13T17:36:44.608',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'IKKE_PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-06-13T17:36:41.746',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-06-13T17:36:39.019',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-06-13T17:20:35.265',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-06-13T17:20:35.265',
          sendtTilArbeidsgiversKandidatliste: false,
        },
      ],
      stillingskategori: null,
      opprettetAvIdent: 'Z994440',
      erMaskert: true,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-19T15:36:02.978',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'bf3d8d1e-ee9b-4635-af9d-84e9df136a43',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: '4dbcfa50-e5f5-4100-be23-8267bfea2056',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-26T14:03:11.486',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'adc68669-392e-45aa-ab9c-4b3cf460525c',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: 'd6eacf78-a79f-4db4-8007-3ef804a58aec',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-26T14:45:48.682',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '8fb55c1a-f647-40e1-8bbe-a35d0801760a',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: '93aedbda-9f35-4a9f-881c-29b154c74e10',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-21T14:50:20.138',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'aa31c933-350f-4c08-8e3f-3d5b22b8e14c',
      tittel: null,
      organisasjonReferanse: '312328712',
      organisasjonNavn: 'OMTENKSOM LOJAL STRUTS PLC',
      stillingId: '71344525-ad9c-4e37-b4e7-265c19b889b4',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'FORMIDLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-26T15:05:44.786',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'AKTUELL',
      utfall: 'IKKE_PRESENTERT',
      uuid: '7e5ac9c3-122e-4184-a9dc-688912efdae7',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: 'fbef62ad-f217-4f74-bb1d-e1b790e82430',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-27T08:44:19.315',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '1aaec870-b24b-41b1-8818-e46080d312b5',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: '239f6f8d-b0b5-4b5e-b97c-d38ee2dff612',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-27T11:37:41.129',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '077bba8f-ae51-41fb-ac8e-0917c5df1876',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: '7ee10191-5882-4e63-8b44-29211bcb8449',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-28T09:52:36.725',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'PRESENTERT',
      uuid: '1739053d-28e1-4120-9808-77d70add772f',
      tittel: null,
      organisasjonReferanse: '315414822',
      organisasjonNavn: 'ALFABETISK PLUTSELIG KATT OVERSKRIFT',
      stillingId: '44142941-1fff-401f-8072-98889d9c41d4',
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-06-28T09:53:03.974',
          sendtTilArbeidsgiversKandidatliste: false,
        },
      ],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-28T12:46:29.068',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'c95906bc-71bd-42af-95d4-ce507566616c',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: '33485624-9a1f-4eeb-a762-b6e701dcfd35',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-06-28T13:07:26.741',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'bb5e9527-74e2-4802-847f-304638e2809f',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: 'ccee19fc-360d-4396-a503-c0f1b4c2ca1f',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-07-01T10:28:23.588',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'f8608785-a3fc-4d91-8856-400ef97241ea',
      tittel: null,
      organisasjonReferanse: null,
      organisasjonNavn: null,
      stillingId: '9853deb9-7d25-408f-b70c-c0a8aa4bb65d',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-07-09T13:31:13.004',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'ac28ca8c-171c-40d2-b870-d302097cfaea',
      tittel: 'Kandidatliste',
      organisasjonReferanse: null,
      organisasjonNavn: 'ORDKNAPP BLOMSTRETE TIGER AS',
      stillingId: null,
      slettet: false,
      utfallsendringer: [],
      stillingskategori: null,
      opprettetAvIdent: 'Z994092',
      erMaskert: true,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-07-09T13:42:26.252',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '92e59ecd-c9dd-478a-adeb-c10ca3bc0982',
      tittel: null,
      organisasjonReferanse: '315090334',
      organisasjonNavn: 'STRENG KRITISK TIGER AS',
      stillingId: '9a22ee86-dbef-4496-b498-e47e6817a4f0',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'JOBBMESSE',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-07-09T14:04:07.089',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'b9eef66e-6f6c-40ef-a040-fd15f8a3fca7',
      tittel: null,
      organisasjonReferanse: '312328712',
      organisasjonNavn: 'OMTENKSOM LOJAL STRUTS PLC',
      stillingId: '8fa424d9-df37-439e-a0f6-60ec756aab96',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'JOBBMESSE',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-07-10T12:00:42.447',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '84610b0c-5497-4748-abed-d1e1067d3b36',
      tittel: 'Kandidatliste',
      organisasjonReferanse: null,
      organisasjonNavn: 'TESTUDO',
      stillingId: null,
      slettet: false,
      utfallsendringer: [],
      stillingskategori: null,
      opprettetAvIdent: 'Z994440',
      erMaskert: true,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-07-10T12:19:56.952',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '491c132c-7e91-445e-a4e7-ce3f8ac01bc0',
      tittel: null,
      organisasjonReferanse: '312113341',
      organisasjonNavn: 'ORDKNAPP BLOMSTRETE TIGER AS',
      stillingId: '0c8fc967-888c-4c0c-8bb8-6a77ef0658ad',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-07-10T13:55:50.239',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: 'c1d0596e-6c6b-4308-8b30-e5ef388134e5',
      tittel: null,
      organisasjonReferanse: '312328712',
      organisasjonNavn: 'OMTENKSOM LOJAL STRUTS PLC',
      stillingId: '2ebc0910-b374-4239-bf52-a5f0095477ef',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'JOBBMESSE',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-08-06T12:37:29.362',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '0cb4821b-b2e2-4fce-b8f0-836d5b9a0dea',
      tittel: 'Jobbmesse',
      organisasjonReferanse: null,
      organisasjonNavn: 'OMTENKSOM LOJAL STRUTS PLC',
      stillingId: null,
      slettet: false,
      utfallsendringer: [],
      stillingskategori: null,
      opprettetAvIdent: 'Z994440',
      erMaskert: true,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-08-16T13:29:28.356',
      lagtTilAvIdent: 'Z993098',
      lagtTilAvEpost: 'F_Z993098.E_Z993098@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993098 E_Z993098',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '8082f5aa-b348-4e90-b0c9-de91cbb2e33a',
      tittel: null,
      organisasjonReferanse: '919817402',
      organisasjonNavn: 'LAVANGSNES WUNDERKAMMER AS',
      stillingId: '1028fae9-33ad-40a6-9960-a498093d5301',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: null,
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-09-10T12:13:42.294',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'FATT_JOBBEN',
      uuid: '461ffbf1-92f9-4d55-a37f-60c9c364f76c',
      tittel: null,
      organisasjonReferanse: '315090334',
      organisasjonNavn: 'STRENG KRITISK TIGER AS',
      stillingId: 'cd217cb1-1ea4-498f-b463-09e95eb74bb1',
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-11T10:53:01.484',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-11T10:53:01.484',
          sendtTilArbeidsgiversKandidatliste: false,
        },
      ],
      stillingskategori: 'FORMIDLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-08-20T08:29:47.536',
      lagtTilAvIdent: 'Z994886',
      lagtTilAvEpost: 'F_Z994886.E_Z994886@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z994886 E_Z994886',
      status: 'VURDERES',
      utfall: 'FATT_JOBBEN',
      uuid: '5ad6707c-44bb-49ad-9ba0-57565bbee227',
      tittel: null,
      organisasjonReferanse: '312328712',
      organisasjonNavn: 'OMTENKSOM LOJAL STRUTS PLC',
      stillingId: '79c79661-e52c-420c-a12c-f76839cdbaab',
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-11T10:58:42.055',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-11T10:58:42.055',
          sendtTilArbeidsgiversKandidatliste: false,
        },
      ],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-09-13T09:40:40.232',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'FATT_JOBBEN',
      uuid: '779e8c60-5c32-4c7c-b600-48abb9df4c2c',
      tittel: null,
      organisasjonReferanse: '315090334',
      organisasjonNavn: 'STRENG KRITISK TIGER AS',
      stillingId: '8ad24298-9d46-4bc2-9e47-ad91b2b1b6b0',
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-13T12:56:05.429',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-13T12:54:09.026',
          sendtTilArbeidsgiversKandidatliste: true,
        },
      ],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-09-03T09:46:16.056',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'FATT_JOBBEN',
      uuid: '1dc22d22-d80d-41e4-acc2-5ab93e7c9404',
      tittel: null,
      organisasjonReferanse: '312113341',
      organisasjonNavn: 'ORDKNAPP BLOMSTRETE TIGER AS',
      stillingId: 'abc2e1f4-fe5b-4d8d-96b8-75db2245ce22',
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-10-10T14:37:01.088',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-10-10T14:37:01.088',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'IKKE_PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-12T13:18:40.473',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-12T13:17:25.731',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-12T13:17:16.769',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-12T13:16:39.907',
          sendtTilArbeidsgiversKandidatliste: true,
        },
      ],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-09-17T15:35:50.54',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '6356678f-a927-4839-bc53-56342e5c97c7',
      tittel: null,
      organisasjonReferanse: '312113341',
      organisasjonNavn: 'ORDKNAPP BLOMSTRETE TIGER AS',
      stillingId: '81d763bd-5858-4479-9113-1d8bcdd4b1f4',
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'IKKE_PRESENTERT',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-17T15:36:55.169',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993141',
          tidspunkt: '2024-09-17T15:35:50.766',
          sendtTilArbeidsgiversKandidatliste: false,
        },
      ],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-09-19T12:07:41.49',
      lagtTilAvIdent: 'Z993098',
      lagtTilAvEpost: 'F_Z993098.E_Z993098@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993098 E_Z993098',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '53971017-415b-4291-88dc-da4f899f08af',
      tittel: 'Kandidatliste',
      organisasjonReferanse: null,
      organisasjonNavn: 'OMTENKSOM LOJAL STRUTS PLC',
      stillingId: null,
      slettet: false,
      utfallsendringer: [
        {
          utfall: 'IKKE_PRESENTERT',
          registrertAvIdent: 'Z993098',
          tidspunkt: '2024-09-19T12:08:31.314',
          sendtTilArbeidsgiversKandidatliste: false,
        },
        {
          utfall: 'FATT_JOBBEN',
          registrertAvIdent: 'Z993098',
          tidspunkt: '2024-09-19T12:08:21.122',
          sendtTilArbeidsgiversKandidatliste: false,
        },
      ],
      stillingskategori: null,
      opprettetAvIdent: 'Z993098',
      erMaskert: true,
    },
    {
      kandidatnr: 'PAM012t1avh27',
      fornavn: 'Våken',
      etternavn: 'Gravemaskin',
      lagtTilTidspunkt: '2024-11-12T16:34:12.911',
      lagtTilAvIdent: 'Z993141',
      lagtTilAvEpost: 'F_Z993141.E_Z993141@trygdeetaten.no',
      lagtTilAvNavn: 'F_Z993141 E_Z993141',
      status: 'VURDERES',
      utfall: 'IKKE_PRESENTERT',
      uuid: '9d41b7c5-c192-43cc-9810-12ff14b71c9b',
      tittel: null,
      organisasjonReferanse: '312328712',
      organisasjonNavn: 'OMTENKSOM LOJAL STRUTS PLC',
      stillingId: '293daff1-ca1d-42f7-9895-41c69d8c8d5e',
      slettet: false,
      utfallsendringer: [],
      stillingskategori: 'STILLING',
      opprettetAvIdent: 'Z993141',
      erMaskert: false,
    },
  ]);
};