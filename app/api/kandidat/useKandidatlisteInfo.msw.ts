import { KandidatAPI } from '@/app/api/api-routes';
import { getMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

const kandidatlisteInfoEndepunkt = (stillingsId: string) =>
  `${KandidatAPI.internUrl}/veileder/stilling/${stillingsId}/kandidatlisteinfo`;

export const kandidatlisteInfoMSWHandler = getMock(
  kandidatlisteInfoEndepunkt('*'),
  () =>
    HttpResponse.json({
      kandidatlisteId: 'kandidatlisteId',
      antallKandidater: 10,
      kandidatlisteStatus: 'ÅPEN',
      opprettetDato: '2025-11-27T10:16:30.499+01:00',
      eier: 'Z993141',
    }),
);
