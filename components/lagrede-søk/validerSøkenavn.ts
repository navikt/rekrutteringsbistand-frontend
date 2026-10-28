import { MAKS_NAVNELENGDE_STANDARDSØK } from '@/app/api/bruker/standardsok/standardsøkTyper';
import { inneholderFødselsnummer } from '@/components/lagrede-søk/fødselsnummer';

export const validerSøkenavn = (navn: string): string | undefined => {
  if (navn.length === 0) {
    return 'Du må skrive et navn på søket.';
  }
  if (navn.length > MAKS_NAVNELENGDE_STANDARDSØK) {
    return `Navnet kan ha maks ${MAKS_NAVNELENGDE_STANDARDSØK} tegn.`;
  }
  if (inneholderFødselsnummer(navn)) {
    return 'Navnet inneholder noe som kan være et fødselsnummer.';
  }
};
