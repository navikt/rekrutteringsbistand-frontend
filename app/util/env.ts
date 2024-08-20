export const isLocal = process.env.NAIS_CLUSTER_NAME === 'local';
export const getCluster = (onPrem?: boolean) => {
  const cluster = process.env.NAIS_CLUSTER_NAME;
  const clusterOnPrem = cluster === 'prod-gcp' && onPrem ? 'prod-fss' : cluster;
  return clusterOnPrem;
};
