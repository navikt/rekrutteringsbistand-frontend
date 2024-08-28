import { getCluster } from '../../util/env';

const gcp = getCluster();
const fss = getCluster(true);

export interface Iroute {
  api_route: string;
  api_url: string;
  internUrl: string;
  scope: string;
}

export const ModiaDecoratorAPI: Iroute = {
  api_route: '',
  api_url: process.env.MODIA_CONTEXT_HOLDER_API ?? '',
  internUrl: '',
  scope: `api://${gcp}.personoversikt.modiacontextholder/.default`,
};

export const StatistikkAPI: Iroute = {
  api_route: '/rekrutteringsbistand-statistikk-api/statistikk',
  api_url: process.env.STATISTIKK_API ?? '',
  internUrl: '/api/statistikk',
  scope: `api://${fss}.toi.rekrutteringsbistand-statistikk-api/.default`,
};

export const ForespørselDelingAvCvAPI: Iroute = {
  api_route: '',
  api_url: process.env.FORESPORSEL_OM_DELING_AV_CV_API ?? '',
  internUrl: '/api/foresporsel-om-deling-av-cv',
  scope: `api://${fss}.arbeidsgiver-inkludering.foresporsel-om-deling-av-cv-api/.default`,
};

export const StillingAPI: Iroute = {
  api_route: '/stilling-api',
  api_url: process.env.STILLING_API ?? '',
  internUrl: '/api/stilling',
  scope: `api://${gcp}.toi.rekrutteringsbistand-stilling-api/.default`,
};

export const KandidatsøkAPI: Iroute = {
  api_route: '/api',
  api_url: process.env.KANDIDATSOK_API ?? '',
  internUrl: '/api/kandidatsok',
  scope: `api://${gcp}.toi.rekrutteringsbistand-kandidatsok-api/.default`,
};
