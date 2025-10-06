'use client';

import { nyheterMirage } from '@/app/api/bruker/nyheter/useNyheter';
import { brukerMirage } from '@/app/api/bruker/useBruker';
import { foresporselOmDelingAvCVMirage } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { foresporselOmDelingAvCVStatistikkMirage } from '@/app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { arenaKandidatnrMirage } from '@/app/api/kandidat-sok/useArenaKandidatnr';
import { kandidatNavnMirage } from '@/app/api/kandidat-sok/useKandidatNavn';
import { kandidatStillingsSøkMirage } from '@/app/api/kandidat-sok/useKandidatStillingssøk';
import { kandidatinformasjonMirage } from '@/app/api/kandidat-sok/useKandidatinformasjon';
import { kandidagsammendragMirage } from '@/app/api/kandidat-sok/useKandidatsammendrag';
import { kandidatSokMirage } from '@/app/api/kandidat-sok/useKandidatsøk';
import { kontorSøkMirage } from '@/app/api/kandidat-sok/useKontorSøk';
import { formidleUsynligKandidatMirage } from '@/app/api/kandidat/formidleKandidat';
import { kandidatlisteoversiktMirage } from '@/app/api/kandidat/useKandidatListeoversikt';
import { kandidatlisteMirage } from '@/app/api/kandidat/useKandidatlisteForEier';
import { kandidatlisteInfoMirage } from '@/app/api/kandidat/useKandidatlisteInfo';
import { mineKandidatlisterMirage } from '@/app/api/kandidat/useMineKandidatlister';
import { meldingsmalerMirage } from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import { kandidatvarselMirage } from '@/app/api/kandidatvarsel/kandidatvarsel';
import { mockModiaContext } from '@/app/api/modia/context/setModiaContext';
import { modiaAktivBrukerMirage } from '@/app/api/modia/context/useModiaAktivBruker';
import { modiaAktivEnhetMirage } from '@/app/api/modia/context/useModiaAktivEnhet';
import { decoratorDataMirage } from '@/app/api/modia/decorator/useDecoratorData';
import { pamPostdataMirage } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { pamGeografiMirage } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { stillingsTittelMirage } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { arbeidsgiverMirage } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { arbeidsgiverMutationsMirage } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { rekruteringstreffArbeidsgivereMirage } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { leggTilNyJobbsøkerMirage } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations';
import { jobbsøkereMirage } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { alleHendelserMirage } from '@/app/api/rekrutteringstreff/[...slug]/useAlleHendelser';
import { arbeidsgiverHendelserMirage } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgiverHendelser';
import { innleggMirage } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { jobbsøkerHendelserMirage } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkerHendelser';
import { kandidatnummerMirage } from '@/app/api/rekrutteringstreff/[...slug]/useKandidatnummer';
import { inviterJobbsøkereMirage } from '@/app/api/rekrutteringstreff/inviterJobbsokere/inviterJobbsokere';
import {
  listKiLoggMirage,
  oppdaterKiLoggLagretMirage,
  oppdaterKiLoggManuellMirage,
} from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { validerRekrutteringstreffMirage } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
import { rekrutteringstreffMutationsMirage } from '@/app/api/rekrutteringstreff/mutations';
import {
  oppdaterInnleggfMirage,
  opprettInnleggfMirage,
} from '@/app/api/rekrutteringstreff/opprettEllerOppdaterInnlegg';
import { rekrutteringstreffMirage } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { rekrutteringstreffOversiktMirage } from '@/app/api/rekrutteringstreff/useRekrutteringstreffOversikt';
import { statistikkMirage } from '@/app/api/statistikk/useStatistikk';
import { opprettNyStillingMirage } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { oppdaterStillingMirage } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { stillingMirage } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { brukerStandardSøkMirage } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { stillingssøkMirage } from '@/app/api/stillings-sok/useStillingssøk';
import { synlighetsevalueringMirage } from '@/app/api/synlighet/evaluering/useSynlighetsevaluering';
import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,

    models: {
      movie: Model,
    },

    routes() {
      this.logging = false;
      arenaKandidatnrMirage(this);
      brukerMirage(this);
      brukerStandardSøkMirage(this);
      decoratorDataMirage(this);
      foresporselOmDelingAvCVStatistikkMirage(this);
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

      // Rekrutteringstreff
      rekrutteringstreffOversiktMirage(this);
      rekrutteringstreffMirage(this);
      rekrutteringstreffMutationsMirage(this);
      validerRekrutteringstreffMirage(this);
      listKiLoggMirage(this);
      oppdaterKiLoggManuellMirage(this);
      oppdaterKiLoggLagretMirage(this);
      jobbsøkereMirage(this);
      leggTilNyJobbsøkerMirage(this);
      rekruteringstreffArbeidsgivereMirage(this);
      arbeidsgiverMutationsMirage(this);
      jobbsøkerHendelserMirage(this);
      arbeidsgiverHendelserMirage(this);
      alleHendelserMirage(this);
      innleggMirage(this);
      opprettInnleggfMirage(this);
      oppdaterInnleggfMirage(this);
      inviterJobbsøkereMirage(this);
      kandidatnummerMirage(this);
      modiaAktivEnhetMirage(this);
      modiaAktivBrukerMirage(this);
      mockModiaContext(this);
      kandidagsammendragMirage(this);
      nyheterMirage(this);
      // stillingssøk mock kan disables ved ES søk
      stillingssøkMirage(this);
      this.passthrough('*');
    },
  });

  return server;
}
