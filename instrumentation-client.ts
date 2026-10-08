import { filtrerApmHendelse } from '@/util/apm';
import { lastPåNyttVedChunkfeil } from '@/util/lastPåNyttVedChunkfeil';
import { initNaisAPMClient } from '@nais/apm/react';

window.addEventListener('error', (hendelse) =>
  lastPåNyttVedChunkfeil(hendelse.error),
);
window.addEventListener('unhandledrejection', (hendelse) =>
  lastPåNyttVedChunkfeil(hendelse.reason),
);

if (process.env.NEXT_PUBLIC_PLAYWRIGHT_TEST_MODE !== 'true') {
  initNaisAPMClient({
    namespace: 'toi',
    tracing: true,
    sessionReplay: { enabled: false },
    screenshotOnError: false,
    beforeSend: filtrerApmHendelse,
  });
}
