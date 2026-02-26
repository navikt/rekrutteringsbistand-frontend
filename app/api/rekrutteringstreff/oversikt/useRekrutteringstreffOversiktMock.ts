import { RekrutteringstreffFraSøkeresultatDTO } from './useRekrutteringstreffOversikt';
import {
  ikkeEierTreffMock,
  rekrutteringstreffMockPerStatus,
} from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';
import { RekrutteringstreffStatus } from '@/app/rekrutteringstreff/_types/constants';

const mapTilOversikt = ({
  id,
  tittel,
  beskrivelse,
  fraTid,
  tilTid,
  gateadresse,
  postnummer,
  poststed,
  status,
  opprettetAvPersonNavident,
  opprettetAvNavkontorEnhetId,
  opprettetAvTidspunkt,
  antallArbeidsgivere,
  antallJobbsøkere,
}: (typeof rekrutteringstreffMockPerStatus)[keyof typeof rekrutteringstreffMockPerStatus]): RekrutteringstreffFraSøkeresultatDTO => ({
  id,
  tittel,
  beskrivelse,
  fraTid,
  tilTid,
  gateadresse,
  postnummer,
  poststed,
  status,
  opprettetAvPersonNavident,
  opprettetAvNavkontorEnhetId,
  opprettetAvTidspunkt,
  antallArbeidsgivere: antallArbeidsgivere ?? 0,
  antallJobbsøkere: antallJobbsøkere ?? 0,
});

export const rekrutteringstreffOversiktMock: RekrutteringstreffFraSøkeresultatDTO[] =
  [
    ...Object.values(rekrutteringstreffMockPerStatus).map(mapTilOversikt),
    mapTilOversikt({
      ...rekrutteringstreffMockPerStatus[RekrutteringstreffStatus.PUBLISERT],
      id: 'ingen-svart-ja',
      tittel: 'Treff uten ja-svar',
    }),
    ...Object.values(ikkeEierTreffMock).map(mapTilOversikt),
  ];
