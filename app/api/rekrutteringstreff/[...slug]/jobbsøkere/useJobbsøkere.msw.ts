import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import {
  jobbsøkereAvlystMock,
  jobbsøkereFullførtMock,
  jobbsøkereIngenSvartJaMock,
  jobbsøkereMock,
  jobbsøkereTomtMock,
  jobbsøkereUtkastMock,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMock';
import { deleteMock, getMock, postMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

type JobbsøkereResponseDTO = {
  jobbsøkere: Array<Record<string, unknown>>;
  antallSynlige: number;
  antallSkjulte: number;
  antallSlettede: number;
};

export const jobbsøkereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker`,
  ({ params }) => {
    const id = params.rekrutteringstreffId as string;
    const mockPerTreffId: Record<string, () => JobbsøkereResponseDTO> = {
      utkast: jobbsøkereUtkastMock,
      avlyst: jobbsøkereAvlystMock,
      fullfort: jobbsøkereFullførtMock,
      slettet: jobbsøkereTomtMock,
      'ingen-svart-ja': jobbsøkereIngenSvartJaMock,
    };
    const mockFn = mockPerTreffId[id] ?? jobbsøkereMock;
    return HttpResponse.json(mockFn());
  },
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  () => HttpResponse.json({}),
);

export const jobbsøkerSlettMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id1/jobbsoker/:id2/slett`,
  () => HttpResponse.json({ success: true }),
);
