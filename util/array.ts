export function parseAsArray(value: string | null): string[] {
  if (!value) return [];
  return value.split(',');
}

export function serializeArray(value: string[]): string {
  return value.join(',');
}
