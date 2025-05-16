/**
 * Nyheter for Rekrutteringsbistand
 */

export interface NyhetDTO {
  dato: string;
  tittel: string;
  innhold: React.ReactNode | string;
  lenke?: string;
  utløper?: string;
}

export const nyheter: NyhetDTO[] = [
  {
    dato: '15.05.2025',
    tittel: 'Rekrutteringsbistand NEXT',
    innhold: 'Ny rekrutteringsbistand-app publisert.',
  },
];
