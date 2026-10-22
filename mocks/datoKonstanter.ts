/**
 * Felles «nå» for alle mocker og Playwright-tester. Mockdata og nettleserklokka
 * i testene bruker denne, slik at snapshots ikke endrer seg med dagens dato.
 */
export const MOCK_NÅ = new Date('2026-01-15T10:00:00.000Z');
