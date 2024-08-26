import { getCluster } from "../../util/env";

const gcp = getCluster();
const fss = getCluster(true);

interface Iroute {
  api_url: string;
  scope: string;
  internUrl: string;
}

export const ModiaDecoratorAPI: Iroute = {
  api_url: process.env.MODIA_CONTEXT_HOLDER_API ?? "",
  scope: `api://${gcp}.personoversikt.modiacontextholder/.default`,
  internUrl: "",
};

export const StatistikkAPI: Iroute = {
  api_url: process.env.STATISTIKK_API_UR ?? "",
  scope: `api://${fss}.toi.rekrutteringsbistand-statistikk-api/.default`,
  internUrl: "/api/statistikk",
};

export const ForespørselDelingAvCvAPI: Iroute = {
  scope: `api://${fss}.arbeidsgiver-inkludering.foresporsel-om-deling-av-cv-api/.default`,
  api_url:
    process.env.FORESPORSEL_OM_DELING_AV_CV_API ?? "",
  internUrl: "/api/statistikk/foresporsel-om-deling-av-cv",
};

export const StillingAPI: Iroute = {
  api_url: process.env.STILLING_API_URL ?? "",
  scope: `api://${gcp}.toi.rekrutteringsbistand-stilling-api/.default`,
  internUrl: "/api/stilling",
};
