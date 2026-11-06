export const parseJsonArray = (
  value: string | null | undefined,
  separator = ', ',
): string => {
  if (!value) return '';
  const trimmed = value.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((verdi: unknown) =>
            typeof verdi === 'string' ? verdi.trim() : verdi,
          )
          .filter(Boolean)
          .join(separator);
      }
    } catch {
      /* ignore */
    }
  }
  return value;
};
