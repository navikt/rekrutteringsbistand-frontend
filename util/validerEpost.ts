export const validerEpost = (
  epost: string,
): { erGodkjent: boolean; feilmelding: string } => {
  const emailRegex = /^[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.\p{L}{2,}$/u;
  return epost.trim() === ''
    ? { erGodkjent: false, feilmelding: 'E-post kan ikke være tom' }
    : emailRegex.test(epost)
      ? { erGodkjent: true, feilmelding: '' }
      : { erGodkjent: false, feilmelding: 'Ugyldig e-postadresse' };
};