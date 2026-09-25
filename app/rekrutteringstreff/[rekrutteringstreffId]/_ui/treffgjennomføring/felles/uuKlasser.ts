/**
 * Fryst førstekolonne i brede tabeller, så radoverskrifta står i ro ved
 * horisontal rulling. `stickyHeader` i Aksel låser bare kolonneoverskriftene.
 *
 * `z-1` løfter cella over posisjonert innhold i cellene til høyre, for
 * eksempel avkrysningsikonet i Aksel.
 *
 * Skillelinja er en innfelt skygge fordi `border-collapse: collapse` lar
 * tabellen male kantlinjene, og de følger ikke med den faste cella. Inne i
 * `Rullefelt` viser `::after` en skygge til høyre for kolonnen når innhold er
 * rullet inn under den.
 */
export const FRYST_KOLONNE_KLASSE =
  'sticky left-0 z-1 bg-[var(--ax-bg-default)] shadow-[inset_-1px_0_0_0_var(--ax-border-neutral-subtle)] after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-3 after:bg-linear-to-r after:from-[var(--rulleskygge)] after:to-transparent after:opacity-0 after:transition-opacity group-data-[skjult-venstre]/rullefelt:after:opacity-100';
