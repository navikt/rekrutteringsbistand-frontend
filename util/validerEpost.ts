export const validerEpost = (
  epost: string,
): { erGodkjent: boolean; feilmelding: string } => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return epost === ''
    ? { erGodkjent: false, feilmelding: 'E-post kan ikke være tom' }
    : emailRegex.test(epost)
      ? { erGodkjent: true, feilmelding: '' }
      : { erGodkjent: false, feilmelding: 'Ugyldig e-postadresse' };
};