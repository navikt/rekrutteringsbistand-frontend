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

export const rekrutteringstreffAnker = (rekTreffId: string) => {
  const basePath = `/rekrutteringstreff`;

  return {
    href: basePath + `/${rekTreffId}`,
    windowRef: basePath + '?' + setRef('visRekrutteringstreffId', rekTreffId),
  };
};

export const kandidatAnker = (kandidatId: string) => {
  const basePath = `/kandidat`;

  return {
    href: `${basePath}/${kandidatId}`,
    windowRef: basePath + '?' + setRef('visKandidatId', kandidatId),
  };
};

export const finnKandidaterAnker = (
  stillingsId: string,
  kandidatId: string,
) => {
  const basePath = `/stilling/${stillingsId}/finn-kandidater`;

  return {
    href: `${basePath}/${kandidatId}`,
    windowRef: basePath + '?' + setRef('visKandidatId', kandidatId),
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

  return {
    href: `${basePath}/${stillingsId}`,
    windowRef: basePath + '?' + setRef('visStillingId', stillingsId),
  };
};

export const finnStillingForKandidatAnker = (
  kandidatId: string,
  stillingsId: string,
) => {
  const basePath = `/kandidat/${kandidatId}/finn-stilling`;

  return {
    href: `${basePath}/${stillingsId}`,
    windowRef: basePath + '?' + setRef('visStillingId', stillingsId),
  };
};

export const etterregistreringAnker = (stillingsId: string) => {
  const basePath = `/etterregistrering`;

  return {
    href: `${basePath}/${stillingsId}`,
    windowRef: basePath + '?' + setRef('visStillingId', stillingsId),
  };
};
