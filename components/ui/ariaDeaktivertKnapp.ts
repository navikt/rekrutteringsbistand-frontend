// Gir Aksel-knapper med aria-disabled samme utseende som disabled, men de kan
// fortsatt få fokus slik at tooltipen med forklaringen kan åpnes med tastatur.
// Ved fokus beholder knappen full opasitet, så fokusmarkeringen får full kontrast.
const ariaDeaktivertFellesKlasse =
  'aria-disabled:cursor-not-allowed aria-disabled:opacity-(--ax-opacity-disabled) aria-disabled:focus-visible:opacity-100';

export const ariaDeaktivertKnappKlasse = `${ariaDeaktivertFellesKlasse} aria-disabled:bg-[transparent] aria-disabled:focus-visible:*:opacity-(--ax-opacity-disabled)`;
// Primærknappen har hvit tekst, som ser lik ut med og uten nedtoning, så ved
// fokus tones bare bakgrunnen ned.
export const ariaDeaktivertPrimærknappKlasse = `${ariaDeaktivertFellesKlasse} aria-disabled:bg-(--ax-bg-strong) aria-disabled:hover:bg-(--ax-bg-strong) aria-disabled:active:bg-(--ax-bg-strong) aria-disabled:focus-visible:bg-[color-mix(in_srgb,var(--ax-bg-strong)_calc(var(--ax-opacity-disabled)*100%),transparent)]`;
