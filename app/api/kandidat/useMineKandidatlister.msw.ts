import { KandidatAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

export const mineKandidatlisterMSWHandler = getMock(
  `${KandidatAPI.internUrl}/veileder/kandidatlister`,
  () =>
    HttpResponse.json({
      liste: [
        {
          kandidatlisteId: '4e61831a-38e0-4d5b-ab0c-ffda4a0aa729',
          tittel: 'Stilling tittel 1',
          organisasjonReferanse: '824391122',
          organisasjonNavn: 'TEST.NO',
          stillingId: '3d0a4bec-f7b0-434b-a22e-d681504124e7',
          opprettetAv: { ident: 'TestIdent', navn: 'F_993141 E_993141' },
          opprettetTidspunkt: '2025-02-18T14:55:47.305',
          antallKandidater: 0,
          kanEditere: true,
          erEier: true,
          kanSlette: 'HAR_STILLING',
          antallUsynligeKandidater: 0,
          status: 'ÅPEN',
          antallStillinger: 1,
          stillingskategori: 'FORMIDLING',
        },
      ],
      antall: 88,
    }),
);
