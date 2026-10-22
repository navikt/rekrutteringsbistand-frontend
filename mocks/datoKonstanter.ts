import { erTestmodus } from '@navikt/toi-next-frontend/miljo';

/**
 * Fast tidspunkt for Playwright-testene. Nettleserklokka i testene låses til
 * dette, slik at snapshots ikke endrer seg med dagens dato.
 */
export const TEST_NÅ = new Date('2026-01-15T10:00:00.000Z');

/**
 * Felles «nå» for alle mocker. I testmodus er den lik TEST_NÅ. Ved lokal
 * utvikling brukes dagens dato, så treff og frister i mockene ligger i
 * framtiden slik de gjør i nettleseren.
 */
export const MOCK_NÅ = erTestmodus() ? TEST_NÅ : new Date();
