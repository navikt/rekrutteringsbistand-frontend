import { getCluster } from '../../util/env';

const cluster = getCluster(true);

export const routeScope = {
  MODIA_DECORATOR_SCOPE: `api://${cluster}.personoversikt.modiacontextholder/.default`,
  STATISTIKK_SCOPE: `api://${cluster}.toi.rekrutteringsbistand-statistikk-api/.default`,
  FORESPØRSEL_DELING_AV_CV_SCOPE: `api://${cluster}.arbeidsgiver-inkludering.foresporsel-om-deling-av-cv-api/.default`,
};

export const routeUrl = {
  MODIA_DECORATOR_API: process.env.MODIA_CONTEXT_HOLDER_API,
  STATISTIKK_API: process.env.STATISTIKK_API_URL,
  FORESPØRSEL_DELING_AV_CV_API: process.env.FORESPORSEL_OM_DELING_AV_CV_API,
};
