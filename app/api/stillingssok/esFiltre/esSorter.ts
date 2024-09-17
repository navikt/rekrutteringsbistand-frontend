export const esSorter = (sorter: string) => {
  switch (sorter) {
    case 'utløpsdato':
      return 'asc';
    case 'publiseringsdato':
      return 'desc';
    default:
      return 'desc';
  }
};
