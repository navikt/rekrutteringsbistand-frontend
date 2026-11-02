import { erChunkfeil } from '@/util/lastPåNyttVedChunkfeil';
import {
  filtrerApmHendelse as filtrerFellesApmHendelse,
  lagApmFeilrapportering,
} from '@navikt/toi-next-frontend/apm';

export function filtrerApmHendelse<
  T extends Parameters<typeof filtrerFellesApmHendelse>[0],
>(hendelse: T): T | null {
  if (hendelse.type === 'exception') {
    const payload = hendelse.payload;
    if (
      erChunkfeil({
        name: 'type' in payload ? payload.type : undefined,
        message: 'value' in payload ? payload.value : undefined,
      }) ||
      ('originalError' in payload && erChunkfeil(payload.originalError))
    ) {
      return null;
    }
  }
  return filtrerFellesApmHendelse(hendelse);
}

export const { rapporterFeil } = lagApmFeilrapportering({
  aktiv: process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE !== 'true',
  // Dynamisk import: SDK-et er ESM-only og skal ikke lastes på server eller i enhetstester.
  captureException: (feil, valg) =>
    import('@nais/apm').then(({ captureException }) =>
      captureException(feil, valg),
    ),
});
