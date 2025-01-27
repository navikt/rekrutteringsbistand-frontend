'use client';
import { createServer, Model } from 'miragejs';
import { brukerMirage } from '../app/api/bruker/useBruker';
import { decoratorDataMirage } from '../app/api/decorator/useDecoratorData';
import { foresporselOmDelingAvCVStatistikkMirage } from '../app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { arenaKandidatnrMirage } from '../app/api/kandidat-sok/useArenaKandidatnr';
import { kandidatinformasjonMirage } from '../app/api/kandidat-sok/useKandidatinformasjon';
import { kandidatNavnMirage } from '../app/api/kandidat-sok/useKandidatNavn';
import { kandidagsammendragMirage } from '../app/api/kandidat-sok/useKandidatsammendrag';
import { kandidatStillingsSøkMirage } from '../app/api/kandidat-sok/useKandidatStillingssøk';
import { kandidatSokMirage } from '../app/api/kandidat-sok/useKandidatsøk';
import { kontorSøkMirage } from '../app/api/kandidat-sok/useKontorSøk';
import { antallKandidaterMirage } from '../app/api/kandidat/useAntallKandidater';
import { kandidatlisteMirage } from '../app/api/kandidat/useKandidatliste';
import { kandidatlisteIdMirage } from '../app/api/kandidat/useKandidatlisteId';
import { kandidatlisteoversiktMirage } from '../app/api/kandidat/useKandidatListeoversikt';
import { stillingsTittelMirage } from '../app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { statistikkMirage } from '../app/api/statistikk/useStatistikk';
import { finnArbeidsgiverMirage } from '../app/api/stilling/finn-arbeidsgiver/useFinnArbeidsgiver';
import { postDataMirage } from '../app/api/stilling/geografi/postData/usePostData';
import { geografiMirage } from '../app/api/stilling/geografi/useGeografi';
import { opprettNyStillingMirage } from '../app/api/stilling/ny-stilling/opprettNyStilling';
import { oppdaterStillingMirage } from '../app/api/stilling/oppdater-stilling/oppdaterStilling';
import { stillingMirage } from '../app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { brukerStandardSøkMirage } from '../app/api/stilling/standardsok/useBrukersStandardsøk';
import { stillingssøkMirage } from '../app/api/stillings-sok/useStillingssøk';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      movie: Model,
    },

    routes() {
      antallKandidaterMirage(this);
      arenaKandidatnrMirage(this);
      brukerMirage(this);
      brukerStandardSøkMirage(this);
      decoratorDataMirage(this);
      finnArbeidsgiverMirage(this);
      foresporselOmDelingAvCVStatistikkMirage(this);
      geografiMirage(this);
      kandidagsammendragMirage(this);
      kandidatinformasjonMirage(this);
      kandidatlisteIdMirage(this);
      kandidatlisteMirage(this);
      kandidatlisteoversiktMirage(this);
      kandidatNavnMirage(this);
      kandidatSokMirage(this);
      kandidatStillingsSøkMirage(this);
      kontorSøkMirage(this);
      oppdaterStillingMirage(this);
      opprettNyStillingMirage(this);
      postDataMirage(this);
      statistikkMirage(this);
      stillingMirage(this);
      stillingsTittelMirage(this);

      // stillingssøk mock kan disables ved ES søk
      stillingssøkMirage(this);
      this.passthrough('*');
    },
  });

  return server;
}
