import formaterMedStoreOgSmåBokstaver from '../../util/tekst';

export const formaterEiernavn = (eierNavn: string | null) => {
  if (eierNavn == null) return null;
  const navnDel = eierNavn.split(',');
  return navnDel.length !== 2
    ? eierNavn
    : navnDel[1].trim() + ' ' + navnDel[0].trim();
};

export const hentEier = (rekrutteringsbistandstilling: any) => {
  const eierNavn = rekrutteringsbistandstilling.stillingsinfo?.eierNavn;
  const reportee =
    rekrutteringsbistandstilling.stilling.administration?.reportee;
  return eierNavn != null ? eierNavn : reportee != null ? reportee : null;
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

const hentArbeidsgiversNavn = (stilling: any) =>
  stilling.businessName && stilling.businessName.length > 0
    ? formaterMedStoreOgSmåBokstaver(stilling.businessName)
    : formaterMedStoreOgSmåBokstaver(stilling.employer?.name);
