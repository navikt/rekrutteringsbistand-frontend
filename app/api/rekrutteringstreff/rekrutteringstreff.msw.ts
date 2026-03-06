import { RekrutteringstreffAPI } from '@/app/api/api-routes';
import { alleHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/alleHendelserMock';
import { arbeidsgiverHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgiverHendelserMock';
import { arbeidsgivereMock } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/arbeidsgivereMock';
import { innleggMock } from '@/app/api/rekrutteringstreff/[...slug]/innlegg/innleggMock';
import { jobbsøkerHendelserMock } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkerHendelserMock';
import {
  jobbsøkereAvlystMock,
  jobbsøkereFullførtMock,
  jobbsøkereIngenSvartJaMock,
  jobbsøkereMock,
  jobbsøkereTomtMock,
  jobbsøkereUtkastMock,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/jobbsøkereMock';
import { oppdaterRekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/oppdaterRekrutteringstreffMock';
import { rekrutteringstreffMock } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { kiLoggMock } from '@/app/api/rekrutteringstreff/kiValidering/kiLoggMock';
import { validerRekrutteringstreffMock } from '@/app/api/rekrutteringstreff/kiValidering/validerRekrutteringstreffMock';
import { rekrutteringstreffMittKontorMock } from '@/app/api/rekrutteringstreff/mittkontor/useRekrutteringstreffMittKontorMock';
import { rekrutteringstreffOversiktMock } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversiktMock';
import { deleteMock, getMock, postMock, putMock } from '@/mocks/mockUtils';
import { HttpResponse } from 'msw';

type JobbsøkereResponseDTO = {
  jobbsøkere: Array<Record<string, unknown>>;
  antallSynlige: number;
  antallSkjulte: number;
  antallSlettede: number;
};

const tekniskHendelsePathMap: Record<string, string> = {
  PUBLISER: 'publiser',
  GJENÅPN: 'gjenapn',
  FULLFØR: 'fullfor',
  AVLYS: 'avlys',
  AVPUBLISER: 'avpubliser',
};

const kiBase = (
  id: string | ':rekrutteringstreffId' = ':rekrutteringstreffId',
) => `${RekrutteringstreffAPI.internUrl}/${id}/ki`;

const kiLoggEndepunkt = (
  id: string | ':rekrutteringstreffId' = ':rekrutteringstreffId',
) => `${kiBase(id)}/logg`;

const manuellEndepunkt = (
  rekrutteringstreffId:
    | string
    | ':rekrutteringstreffId' = ':rekrutteringstreffId',
  id: string | ':id' = ':id',
) => `${kiLoggEndepunkt(rekrutteringstreffId)}/${id}/manuell`;

const lagretEndepunkt = (
  rekrutteringstreffId:
    | string
    | ':rekrutteringstreffId' = ':rekrutteringstreffId',
  id: string | ':id' = ':id',
) => `${kiLoggEndepunkt(rekrutteringstreffId)}/${id}/lagret`;

const validerRekrutteringstreffEndepunkt = (id: string | ':id' = ':id') =>
  `${RekrutteringstreffAPI.internUrl}/${id}/ki/valider`;

export const alleHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/allehendelser`,
  () => HttpResponse.json(alleHendelserMock()),
);

export const opprettArbeidsgiverMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  () => HttpResponse.json(arbeidsgivereMock()[0]),
);

export const slettArbeidsgiverMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/:arbeidsgiverId`,
  () => new HttpResponse(null, { status: 204 }),
);

export const arbeidsgiverHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver/hendelser`,
  () => HttpResponse.json(arbeidsgiverHendelserMock()),
);

export const rekrutteringstreffArbeidsgivereMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/arbeidsgiver`,
  () => HttpResponse.json(arbeidsgivereMock()),
);

export const innleggMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/innlegg`,
  () => HttpResponse.json(innleggMock),
);

export const jobbsøkerSlettMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id1/jobbsoker/:id2/slett`,
  () => HttpResponse.json({ success: true }),
);

export const opprettJobbsøkereMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}/:id/jobbsoker`,
  () => HttpResponse.json({}),
);

export const jobbsøkerHendelserMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/hendelser`,
  () => HttpResponse.json(jobbsøkerHendelserMock()),
);

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

export const oppdaterRekrutteringstreffMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  ({ params }) =>
    HttpResponse.json(oppdaterRekrutteringstreffMock(params.id as string)),
);

export const slettRekrutteringstreffMSWHandler = deleteMock(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  () => new HttpResponse(null, { status: 204 }),
);

export const statusHendelserMSWHandlers = Object.values(
  tekniskHendelsePathMap,
).map((hendelsePath) =>
  postMock(
    `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/${hendelsePath}`,
    () => HttpResponse.json({}),
  ),
);

export const rekrutteringstreffMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:id`,
  ({ params }) =>
    HttpResponse.json(rekrutteringstreffMock(params.id as string)),
);

export const kandidatnummerMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/jobbsoker/:personTreffId/kandidatnummer`,
  () => HttpResponse.json({ kandidatnummer: 'PAM0123ABCDE' }),
);

export const listKiLoggMSWHandler = getMock(
  kiLoggEndepunkt(':rekrutteringstreffId'),
  () => HttpResponse.json(kiLoggMock),
);

export const oppdaterKiLoggManuellMSWHandler = putMock(
  manuellEndepunkt(':rekrutteringstreffId', ':id'),
  () => new HttpResponse(null, { status: 204 }),
);

export const oppdaterKiLoggLagretMSWHandler = putMock(
  lagretEndepunkt(':rekrutteringstreffId', ':id'),
  () => new HttpResponse(null, { status: 204 }),
);

export const validerRekrutteringstreffMSWHandler = postMock(
  validerRekrutteringstreffEndepunkt(':id'),
  () => HttpResponse.json(validerRekrutteringstreffMock()),
);

export const rekrutteringstreffMittKontorMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}/mittkontor`,
  () => HttpResponse.json(rekrutteringstreffMittKontorMock),
);

export const opprettRekrutteringstreffMSWHandler = postMock(
  `${RekrutteringstreffAPI.internUrl}`,
  () =>
    HttpResponse.json({
      id: '1231-1234-1234-1234',
      tittel: 'Treff uten navn',
    }),
);

export const rekrutteringstreffOversiktMSWHandler = getMock(
  `${RekrutteringstreffAPI.internUrl}`,
  () => HttpResponse.json(rekrutteringstreffOversiktMock),
);

export const leggTilMegSomEierMSWHandler = putMock(
  `${RekrutteringstreffAPI.internUrl}/:rekrutteringstreffId/eiere/meg`,
  () => new HttpResponse(null, { status: 204 }),
);
