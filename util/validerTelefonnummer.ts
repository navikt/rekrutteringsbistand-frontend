export const validerTelefonnummer = (
  telefonnummer: string,
): { erGodkjent: boolean; feilmelding: string } => {
  const telefonRegex = /^(0047|\+47|47)?[2-9]\d{7}$/;
  const formatertTlf = telefonnummer.trim().replace(/[^0-9+]/g, '');
  return formatertTlf === ''
    ? { erGodkjent: false, feilmelding: 'Telefonnummer kan ikke være tomt' }
    : telefonRegex.test(formatertTlf)
      ? { erGodkjent: true, feilmelding: '' }
      : {
          erGodkjent: false,
          feilmelding:
            'Ugyldig telefonnummer. Riktig format må inneholde 8 siffer og det kan ikke ' +
            'begynne med 1. Det godkjennes både med eller uten landskode (+47, 0047, eller 47)',
        };
};
