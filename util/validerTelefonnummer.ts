export const validerTelefonnummer = (
  telefonnummer: string,
): { erGodkjent: boolean; feilmelding: string } => {
  const telefonRegex = /^\d{8}$/;
  const formatertTlf = telefonnummer.trim().replace(/\D/g, "")
  return formatertTlf === ''
    ? { erGodkjent: false, feilmelding: 'Telefonnummer kan ikke være tomt' }
    : telefonRegex.test(formatertTlf)
      ? { erGodkjent: true, feilmelding: '' }
      : { erGodkjent: false, feilmelding: 'Ugyldig telefonnummer. Det må inneholde 8 siffer' };
}