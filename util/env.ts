import {
  erLokalt,
  erTestmodus,
  skalMocke as pakkeSkalMocke,
} from '@navikt/toi-next-frontend/miljø';

export const isLocal = erLokalt();
export const isTestMode = erTestmodus();
export const skalMocke = pakkeSkalMocke();

const onPremCLuster = () => {
  if (process.env.NAIS_CLUSTER_NAME === 'prod-gcp') {
    return 'prod-fss';
  } else {
    return 'dev-fss';
  }
};

export const getCluster = (onPrem?: boolean) => {
  const cluster = process.env.NAIS_CLUSTER_NAME;
  const clusterOnPrem = onPrem ? onPremCLuster() : cluster;
  return clusterOnPrem;
};
