/**
 * WorkOp viser navn med fornavn først, fordi navnene der leses høyt og søkes
 * opp i lista mens møtedagen pågår. Resten av rekrutteringstreffet sorterer og
 * viser på etternavn.
 */
export const formaterWorkOpNavn = (
  fornavn: string | null | undefined,
  etternavn: string | null | undefined,
  fallback = '',
): string => {
  if (fornavn && etternavn) return `${fornavn} ${etternavn}`;
  return fornavn || etternavn || fallback;
};
