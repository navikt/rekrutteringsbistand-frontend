'use client';
export enum Miljø {
  DevGcp = 'dev-gcp',
  ProdGcp = 'prod-gcp',
  Lokalt = 'local',
}

export const getMiljø = (): string => {
  if (typeof window === 'undefined') {
    return Miljø.Lokalt;
  }

  const { hostname } = window.location;

  if (hostname.includes('intern.dev.nav.no')) {
    return Miljø.DevGcp;
  } else if (hostname.includes('intern.nav.no')) {
    return Miljø.ProdGcp;
  } else {
    return Miljø.Lokalt;
  }
};
