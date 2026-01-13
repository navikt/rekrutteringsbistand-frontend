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
  const query = setRef('visPersonId', personTreffId);

  return {
    href: `${basePath}/person/${personTreffId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};

export const rekrutteringstreffAnker = (rekTreffId: string) => {
  const basePath = `/rekrutteringstreff`;
  const query = setRef('visRekrutteringstreffId', rekTreffId);

  return {
    href: `${basePath}/${rekTreffId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};

export const kandidatAnker = (kandidatId: string) => {
  const basePath = `/kandidat`;
  const query = setRef('visKandidatId', kandidatId);

  return {
    href: `${basePath}/${kandidatId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};

export const finnKandidaterAnker = (
  stillingsId: string,
  kandidatId: string,
) => {
  const basePath = `/stilling/${stillingsId}/finn-kandidater`;
  const query = setRef('visKandidatId', kandidatId);

  return {
    href: `${basePath}/${kandidatId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};

export const kandidatlisteAnker = (stillingsId: string, kandidatId: string) => {
  const currentParams = new URLSearchParams(window.location.search);
  currentParams.set('stillingFane', 'kandidater');
  currentParams.set('visKandidatId', kandidatId);

  const basePath = `/stilling/${stillingsId}`;
  const query = currentParams.toString();

  return {
    href: `${basePath}/kandidatliste/${kandidatId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};

export const stillingsAnker = (stillingsId: string) => {
  const basePath = `/stilling`;
  const query = setRef('visStillingId', stillingsId);

  return {
    href: `${basePath}/${stillingsId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};

export const finnStillingForKandidatAnker = (
  kandidatId: string,
  stillingsId: string,
) => {
  const basePath = `/kandidat/${kandidatId}/finn-stilling`;
  const query = setRef('visStillingId', stillingsId);

  return {
    href: `${basePath}/${stillingsId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};

export const etterregistreringAnker = (stillingsId: string) => {
  const basePath = `/etterregistrering`;
  const query = setRef('visStillingId', stillingsId);

  return {
    href: `${basePath}/${stillingsId}`,
    windowRef: query ? `${basePath}?${query}` : basePath,
  };
};
