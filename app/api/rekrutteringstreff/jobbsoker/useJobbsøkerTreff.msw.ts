import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { RekrutteringstreffKategori } from '@/app/rekrutteringstreff/_types/constants';
import { postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const jobbsøkerTreffMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/jobbsoker/treff`,
  () =>
    HttpResponse.json([
      {
        id: '71344525-ad9c-4e37-b4e7-265c19b889b4',
        tittel: 'Jobbtreff innen helse',
        lagtTilTidspunkt: '2026-09-15T08:30:00Z',
        treffStartTidspunkt: '2026-10-10T07:00:00Z',
        lagtTilAvNavn: 'Ola Nordmann',
        lagtTilAvIdent: 'A123456',
        status: 'INVITERT',
        kategori: RekrutteringstreffKategori.REKRUTTERINGSTREFF,
        antallArbeidsgivere: 2,
      },
      {
        id: null,
        tittel: 'WorkOp innen teknologi',
        lagtTilTidspunkt: '2025-08-20T09:00:00Z',
        treffStartTidspunkt: '2025-09-12T08:00:00Z',
        lagtTilAvNavn: 'Kari Nordmann',
        lagtTilAvIdent: 'A654321',
        status: 'MØTT_OPP',
        kategori: RekrutteringstreffKategori.WORKOP,
        antallArbeidsgivere: 0,
      },
    ]),
);
