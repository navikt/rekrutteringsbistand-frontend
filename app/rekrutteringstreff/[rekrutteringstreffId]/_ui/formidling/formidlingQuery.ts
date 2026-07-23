import { parseAsArrayOf, parseAsString } from 'nuqs';

export const FORMIDLING_ARBEIDSGIVERE_QUERY_PARAM = 'formidlingArbeidsgivere';

export const formidlingArbeidsgivereParser = parseAsArrayOf(
  parseAsString,
).withDefault([]);
