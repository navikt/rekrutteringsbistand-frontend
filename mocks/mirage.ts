'use client';
import { createServer, Model } from 'miragejs';
import { brukerMirage } from '../app/api/bruker/useBruker';
import { decoratorDataMirage } from '../app/api/decorator/useDecoratorData';
import { foresporselOmDelingAvCVMirage } from '../app/api/foresporsel-om-deling-av-cv/foresporsler/[slug]/useForespurteOmDelingAvCv';
import { foresporselOmDelingAvCVStatistikkMirage } from '../app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { arenaKandidatnrMirage } from '../app/api/kandidat-sok/useArenaKandidatnr';
import { kandidatinformasjonMirage } from '../app/api/kandidat-sok/useKandidatinformasjon';
import { kandidatNavnMirage } from '../app/api/kandidat-sok/useKandidatNavn';
import { kandidagsammendragMirage } from '../app/api/kandidat-sok/useKandidatsammendrag';
import { kandidatStillingsSøkMirage } from '../app/api/kandidat-sok/useKandidatStillingssøk';
import { kandidatSokMirage } from '../app/api/kandidat-sok/useKandidatsøk';
import { kontorSøkMirage } from '../app/api/kandidat-sok/useKontorSøk';
import { formidleUsynligKandidatMirage } from '../app/api/kandidat/formidleKandidat';
import { kandidatlisteMirage } from '../app/api/kandidat/useKandidatliste';
import { kandidatlisteInfoMirage } from '../app/api/kandidat/useKandidatlisteInfo';
import { kandidatlisteoversiktMirage } from '../app/api/kandidat/useKandidatListeoversikt';
import { mineKandidatlisterMirage } from '../app/api/kandidat/useMineKandidatlister';
import { meldingsmalerMirage } from '../app/api/kandidatvarsel/hentMeldingsmaler';
import { kandidatvarselMirage } from '../app/api/kandidatvarsel/kandidatvarsel';
import { pamPostdataMirage } from '../app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { pamGeografiMirage } from '../app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { stillingsTittelMirage } from '../app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { arbeidsgiverMirage } from '../app/api/pam-search/underenhet/useArbeidsgiver';
import { statistikkMirage } from '../app/api/statistikk/useStatistikk';
import { opprettNyStillingMirage } from '../app/api/stilling/ny-stilling/opprettNyStilling';
import { oppdaterStillingMirage } from '../app/api/stilling/oppdater-stilling/oppdaterStilling';
import { stillingMirage } from '../app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { brukerStandardSøkMirage } from '../app/api/stilling/standardsok/useBrukersStandardsøk';
import { synlighetsevalueringMirage } from '../app/api/synlighet/useSynlighetsevaluering';
import { rekrutteringstreffOversiktMirage } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import { stillingssøkMirage } from '../app/api/stillings-sok/useStillingssøk';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      movie: Model,
    },

    routes() {
      arenaKandidatnrMirage(this);
      brukerMirage(this);
      brukerStandardSøkMirage(this);
      decoratorDataMirage(this);
      foresporselOmDelingAvCVStatistikkMirage(this);
      kandidagsammendragMirage(this);
      kandidatinformasjonMirage(this);
      kandidatlisteMirage(this);
      kandidatlisteoversiktMirage(this);
      kandidatNavnMirage(this);
      kandidatSokMirage(this);
      kandidatStillingsSøkMirage(this);
      kontorSøkMirage(this);
      oppdaterStillingMirage(this);
      opprettNyStillingMirage(this);
      statistikkMirage(this);
      stillingMirage(this);
      stillingsTittelMirage(this);
      meldingsmalerMirage(this);
      kandidatvarselMirage(this);
      foresporselOmDelingAvCVMirage(this);
      synlighetsevalueringMirage(this);
      arbeidsgiverMirage(this);
      pamGeografiMirage(this);
      pamPostdataMirage(this);
      formidleUsynligKandidatMirage(this);
      kandidatlisteInfoMirage(this);
      mineKandidatlisterMirage(this);
      rekrutteringstreffOversiktMirage(this);
      // stillingssøk mock kan disables ved ES søk
      stillingssøkMirage(this);
      this.passthrough('*');
    },
  });

  return server;
}
