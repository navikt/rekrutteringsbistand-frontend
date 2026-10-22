// Gir Aksel-knapper med aria-disabled samme utseende som disabled, men de kan
// fortsatt få fokus slik at tooltipen med forklaringen kan åpnes med tastatur.
// Ved fokus tones bare innholdet ned, så fokusmarkeringen får full kontrast.
export const ariaDeaktivertKnappKlasse =
  'aria-disabled:cursor-not-allowed aria-disabled:bg-[transparent] aria-disabled:opacity-(--ax-opacity-disabled) aria-disabled:focus-visible:opacity-100 aria-disabled:focus-visible:*:opacity-(--ax-opacity-disabled)';
