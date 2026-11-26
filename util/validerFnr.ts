import { idnr } from '@navikt/fnrvalidator';
import { skalMocke } from '@navikt/toi-next-frontend/miljo';

export const validerFnr = (fnr: string): boolean =>
  skalMocke() ? /^\d{11}$/.test(fnr) : idnr(fnr).status === 'valid';
