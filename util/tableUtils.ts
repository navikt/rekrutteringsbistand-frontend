export type NestedKeys<T> = {
  [K in keyof T & string]: T[K] extends object
    ? `${K}.${NestedKeys<T[K]>}` | K
    : K;
}[keyof T & string];

export interface TableSortState<T> {
  orderBy: NestedKeys<T>;
  direction: 'ascending' | 'descending';
}

export const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export function comparator<T>(a: T, b: T, orderBy: NestedKeys<T>): number {
  const aValue = getNestedValue(a, orderBy);
  const bValue = getNestedValue(b, orderBy);

  if (bValue === null || bValue === undefined || bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

export const applySortDirection = <T>(sort?: TableSortState<T>) => {
  return (a: T, b: T): number => {
    if (sort) {
      return sort.direction === 'ascending'
        ? comparator<T>(b, a, sort.orderBy)
        : comparator<T>(a, b, sort.orderBy);
    }
    return 1;
  };
};

export function handleSort<T>(
  sortKey: NestedKeys<T>,
  setSort: (ss?: TableSortState<T> | undefined) => void,
  sort?: TableSortState<T>,
) {
  setSort(
    sort && sortKey === sort.orderBy && sort.direction === 'descending'
      ? undefined
      : {
          orderBy: sortKey,
          direction:
            sort && sortKey === sort.orderBy && sort.direction === 'ascending'
              ? 'descending'
              : 'ascending',
        },
  );
}

export function isSymbol(x: unknown): x is symbol {
  return typeof x === 'symbol';
}

export function isNumber(n: unknown): n is number {
  return typeof n === 'number';
}

export function hasKey<T extends object>(
  o: T,
  key: string | number | symbol | undefined,
): key is keyof T | NestedKeys<T> {
  if (!key) return false;
  if (isNumber(key)) return false;
  if (isSymbol(key)) return false;

  const keys = (key as string).split('.');
  let current: any = o;

  for (const k of keys) {
    if (!current || typeof current !== 'object' || !(k in current)) {
      return false;
    }
    current = current[k];
  }

  return true;
}

export function firstOf<T>(array: Array<T>): T {
  return array.reduce((a) => a);
}
