'use client';
export enum Miljø {
  DevGcp = 'dev-gcp',
  ProdGcp = 'prod-gcp',
  Lokalt = 'local',
}

export const getMiljø = (): string => {
  const { hostname } = window.location;

  if (hostname.includes('intern.dev.nav.no')) {
    return Miljø.DevGcp;
  } else if (hostname.includes('intern.nav.no')) {
    return Miljø.ProdGcp;
  } else {
    return Miljø.Lokalt;
  }
};

export const getCluster = (onPrem?: boolean) => {
  const cluster = process.env.NAIS_CLUSTER_NAME;
  const clusterOnPrem = cluster === 'prod-gcp' && onPrem ? 'prod-fss' : cluster;
  return clusterOnPrem;
};

export const erIkkeProd = getMiljø() !== Miljø.ProdGcp;
