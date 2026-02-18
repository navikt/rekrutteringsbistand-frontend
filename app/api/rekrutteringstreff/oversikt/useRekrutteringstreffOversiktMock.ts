import { RekrutteringstreffFraSøkeresultatDTO } from './useRekrutteringstreffOversikt';
import { rekrutteringstreffMockPerStatus } from '@/app/api/rekrutteringstreff/[...slug]/rekrutteringstreffMock';

export const rekrutteringstreffOversiktMock: RekrutteringstreffFraSøkeresultatDTO[] =
  Object.values(rekrutteringstreffMockPerStatus).map(
    ({
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
    }) => ({
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
    }),
  );
