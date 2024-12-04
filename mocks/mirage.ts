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
import { statistikkMirage } from '../app/api/statistikk/useStatistikk';
import { finnArbeidsgiverMirage } from '../app/api/stilling/finn-arbeidsgiver/useFinnArbeidsgiver';
import { geografiMirage } from '../app/api/stilling/geografi/useGeografi';
import { opprettNyStillingMirage } from '../app/api/stilling/ny-stilling/opprettNyStilling';
import { oppdaterStillingMirage } from '../app/api/stilling/oppdater-stilling/oppdaterStilling';
import { stillingMirage } from '../app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { stillingssøkMirage } from '../app/api/stillings-sok/useStillingssøk';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      movie: Model,
    },

    routes() {
      brukerMirage(this);
      kandidatlisteIdMirage(this);
      geografiMirage(this);
      kandidatlisteMirage(this);
      antallKandidaterMirage(this);
      kandidatSokMirage(this);
      statistikkMirage(this);
      foresporselOmDelingAvCVStatistikkMirage(this);
      stillingMirage(this);
      opprettNyStillingMirage(this);
      oppdaterStillingMirage(this);
      finnArbeidsgiverMirage(this);
      decoratorDataMirage(this);
      kandidagsammendragMirage(this);
      kandidatinformasjonMirage(this);
      kontorSøkMirage(this);
      kandidatlisteoversiktMirage(this);
      kandidatStillingsSøkMirage(this);
      // stillingssøk
      stillingssøkMirage(this);
      kandidatNavnMirage(this);
      arenaKandidatnrMirage(this);
      this.passthrough('*');
    },
  });

  return server;
}
