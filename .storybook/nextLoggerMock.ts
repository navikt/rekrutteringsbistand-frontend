/**
 * Stub for `@navikt/next-logger` som brukes i Storybook.
 *
 * Pakken er ment for server-side (Node) og feiler i nettleseren fordi
 * en transitiv avhengighet (next/dist/compiled/@opentelemetry/api) bruker
 * `__dirname` som ikke finnes i browser-kontekst.
 *
 * Vi erstatter hele pakken med en konsollbasert logger som har samme
 * API-overflate (pino-lignende), slik at stories kan importere den uten feil.
 */

const noop = () => {};

const loggerMethods = {
  trace: console.debug,
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
  fatal: console.error,
  silent: noop,
  child: () => logger,
  level: 'info',
  isLevelEnabled: () => true,
  bindings: () => ({}),
  flush: noop,
  on: noop,
  off: noop,
};

export const logger = loggerMethods;

export const createChildLogger = (_requestId: string) => logger;

export const configureLogger = noop;

export const backendLogger = logger;
