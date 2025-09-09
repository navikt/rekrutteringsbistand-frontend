export type Hendelse = { hendelsestype?: string };
export type TreffLike = { hendelser?: Hendelse[] } | null | undefined;

export const erEditMode = (): boolean => {
  try {
    return (
      typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('mode') === 'edit'
    );
  } catch {
    return false;
  }
};

export const erPublisert = (treff: TreffLike): boolean => {
  const hendelser = (treff?.hendelser ?? []) as Hendelse[];
  return hendelser.some((h) => h?.hendelsestype === 'PUBLISER');
};

export const skalHindreAutosave = (
  treff: TreffLike,
  force?: boolean,
): boolean => {
  if (force) return false;
  return erPublisert(treff) && erEditMode();
};
