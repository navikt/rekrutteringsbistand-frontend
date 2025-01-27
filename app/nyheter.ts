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
    dato: '01.02.2024',
    tittel: 'Rekrutteringsbistand NEXT',
    innhold: 'Ny rekrutteringsbistand-app er ute til testing.',
  },
];
