export const validerTelefonnummer = (
  telefonnummer: string,
): { erGodkjent: boolean; feilmelding: string } => {
  const telefonRegex = /^\+?\d{8,15}$/;
  const formatertTlf = telefonnummer.trim().replace(/\s+/g, "")
  return formatertTlf === ''
    ? { erGodkjent: false, feilmelding: 'Telefonnummer kan ikke være tomt' }
    : formatertTlf.length < 8
      ? { erGodkjent: false, feilmelding: 'Telefonnummer må være minst 8 siffer' }
      : telefonRegex.test(formatertTlf)
        ? { erGodkjent: true, feilmelding: '' }
        : { erGodkjent: false, feilmelding: 'Ugyldig telefonnummer' };
}