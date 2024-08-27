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
  internUrl: "",
  scope: `api://${gcp}.personoversikt.modiacontextholder/.default`,
};

export const StatistikkAPI: Iroute = {
  api_url: process.env.STATISTIKK_API ?? "",
  internUrl: "/api/statistikk",
  scope: `api://${fss}.toi.rekrutteringsbistand-statistikk-api/.default`,
};

export const ForespørselDelingAvCvAPI: Iroute = {
  api_url: process.env.FORESPORSEL_OM_DELING_AV_CV_API ?? "",
  internUrl: "/api/foresporsel-om-deling-av-cv",
  scope: `api://${fss}.arbeidsgiver-inkludering.foresporsel-om-deling-av-cv-api/.default`,
};

export const StillingAPI: Iroute = {
  api_url: process.env.STILLING_API ?? "",
  internUrl: "/api/stilling",
  scope: `api://${gcp}.toi.rekrutteringsbistand-stilling-api/.default`,
};
