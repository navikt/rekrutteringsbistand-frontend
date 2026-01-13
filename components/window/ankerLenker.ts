const setRef = (id: string, verdi: string) => {
  const currentParams = new URLSearchParams(window.location.search);

  if (verdi) {
    currentParams.set(id, verdi);
  } else {
    currentParams.delete(id);
  }
  const query = currentParams.toString();

  return query;
};

export const personTreffAnker = (
  rekrutteringstreffId: string,
  personTreffId: string,
) => {
  const basePath = `/rekrutteringstreff/${rekrutteringstreffId}`;

  return {
    href: `${basePath}/person/${personTreffId}`,
    windowRef: basePath + '?' + setRef('visPersonId', personTreffId),
  };
};
