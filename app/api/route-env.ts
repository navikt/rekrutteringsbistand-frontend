import { getCluster } from '../../util/env';

const gcp = getCluster();
const fss = getCluster(true);

export const routeScope = {
  MODIA_DECORATOR_SCOPE: `api://${gcp}.personoversikt.modiacontextholder/.default`,
  STATISTIKK_SCOPE: `api://${fss}.toi.rekrutteringsbistand-statistikk-api/.default`,
  FORESPØRSEL_DELING_AV_CV_SCOPE: `api://${fss}.arbeidsgiver-inkludering.foresporsel-om-deling-av-cv-api/.default`,
};

export const routeUrl = {
  MODIA_DECORATOR_API: process.env.MODIA_CONTEXT_HOLDER_API,
  STATISTIKK_API: process.env.STATISTIKK_API_URL,
  FORESPØRSEL_DELING_AV_CV_API: process.env.FORESPORSEL_OM_DELING_AV_CV_API,
};
