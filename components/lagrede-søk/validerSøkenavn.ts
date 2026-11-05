import { MAKS_NAVNELENGDE_LAGRET_SØK } from '@/app/api/bruker/lagrede-sok/lagredeSøkTyper';
import { inneholderFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';

export const validerSøkenavn = (navn: string): string | undefined => {
  if (navn.length === 0) {
    return 'Du må skrive et navn på søket.';
  }
  if (navn.length > MAKS_NAVNELENGDE_LAGRET_SØK) {
    return `Navnet kan ha maks ${MAKS_NAVNELENGDE_LAGRET_SØK} tegn.`;
  }
  if (inneholderFødselsnummer(navn)) {
    return 'Navnet inneholder noe som kan være et fødselsnummer.';
  }
};
