export const isLocal =
  typeof window !== 'undefined'
    ? window.location.hostname === 'localhost'
    : process.env.NODE_ENV !== 'development';

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
