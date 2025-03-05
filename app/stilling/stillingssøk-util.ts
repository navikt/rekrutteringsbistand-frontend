export const formaterEiernavn = (eierNavn: string | null) => {
  if (eierNavn == null) return null;
  const navnDel = eierNavn.split(',');
  return navnDel.length !== 2
    ? eierNavn
    : navnDel[1].trim() + ' ' + navnDel[0].trim();
};

export const hentEierFraStilling = (rekrutteringsbistandstilling: any) => {
  const eierNavn = rekrutteringsbistandstilling.stillingsinfo?.eierNavn;
  const reportee =
    rekrutteringsbistandstilling.stilling.administration?.reportee;
  return eierNavn != null ? eierNavn : reportee != null ? reportee : null;
};

export const hentIdentFraStilling = (
  rekrutteringsbistandstilling: any,
): string => {
  if (
    rekrutteringsbistandstilling &&
    'administration' in rekrutteringsbistandstilling &&
    rekrutteringsbistandstilling?.administration?.navIdent
  ) {
    return rekrutteringsbistandstilling?.administration?.navIdent;
  } else if (
    rekrutteringsbistandstilling &&
    'eierNavident' in rekrutteringsbistandstilling &&
    rekrutteringsbistandstilling?.eierNavident
  ) {
    return rekrutteringsbistandstilling?.eierNavident;
  } else if (
    rekrutteringsbistandstilling &&
    'stilling' in rekrutteringsbistandstilling &&
    rekrutteringsbistandstilling?.stilling?.administration?.navIdent
  ) {
    return rekrutteringsbistandstilling?.stilling?.administration?.navIdent;
  } else if (
    rekrutteringsbistandstilling &&
    'stillingsinfo' in rekrutteringsbistandstilling &&
    rekrutteringsbistandstilling?.stillingsinfo?.eierNavident
  ) {
    return rekrutteringsbistandstilling?.stillingsinfo?.eierNavident;
  }
  return '';
};

export const hentArbeidssted = (locations: any[]): string | null => {
  const filtrerteLocations: string[] = [];

  locations.forEach((location) => {
    if (location.municipal) {
      filtrerteLocations.push(location.municipal);
    } else if (location.county) {
      filtrerteLocations.push(location.county);
    }
  });

  return filtrerteLocations.join(', ');
};

// export const hentArbeidsgiversNavn = (stilling: any) =>
//   stilling.businessName && stilling.businessName.length > 0
//     ? formaterMedStoreOgSmåBokstaver(stilling.businessName)
//     : formaterMedStoreOgSmåBokstaver(stilling.employer?.name);
