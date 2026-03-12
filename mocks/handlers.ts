import { arbeidsgiverNotifikasjonTemplateMSWHandler } from '@/app/api/arbeidsgiver-notifikasjon/template/template.msw';
import { nyheterMSWHandler } from '@/app/api/bruker/nyheter/useNyheter.msw';
import { tilbakemeldingerMSWHandler } from '@/app/api/bruker/tilbakemeldinger/useTilbakemeldinger.msw';
import { brukerMSWHandler } from '@/app/api/bruker/useBruker.msw';
import { foresporselOmDelingAvCVMSWHandler } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv.msw';
import { foresporselOmDelingAvCVStatistikkMSWHandler } from '@/app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV.msw';
import { arenaKandidatnrMSWHandler } from '@/app/api/kandidat-sok/useArenaKandidatnr';
import { kandidatNavnMSWHandler } from '@/app/api/kandidat-sok/useKandidatNavn';
import { kandidatStillingssøkMSWHandler } from '@/app/api/kandidat-sok/useKandidatStillingssøk.msw';
import { kandidatinformasjonMSWHandler } from '@/app/api/kandidat-sok/useKandidatinformasjon.msw';
import { kandidatsammendragMSWHandler } from '@/app/api/kandidat-sok/useKandidatsammendrag';
import { kandidatSokMSWHandler } from '@/app/api/kandidat-sok/useKandidatsøk.msw';
import { kontorSøkMSWHandler } from '@/app/api/kandidat-sok/useKontorSøk.msw';
import { formidleUsynligKandidatMSWHandler } from '@/app/api/kandidat/formidleKandidat.msw';
import { setKandidatlisteStatusMSWHandler } from '@/app/api/kandidat/setKandidatlisteStatus';
import { kandidatlisteoversiktMSWHandler } from '@/app/api/kandidat/useKandidatListeoversikt.msw';
import { kandidaterMSWHandler } from '@/app/api/kandidat/useKandidater.msw';
import { kandidatlisteInfoMSWHandler } from '@/app/api/kandidat/useKandidatlisteInfo.msw';
import { mineKandidatlisterMSWHandler } from '@/app/api/kandidat/useMineKandidatlister.msw';
import {
  meldingsmalerRekrutteringstreffMSWHandler,
  meldingsmalerStillingMSWHandler,
} from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import { kandidatvarselMSWHandler } from '@/app/api/kandidatvarsel/kandidatvarsel.msw';
import { modiaContextMSWHandler } from '@/app/api/modia/context/setModiaContext';
import { modiaAktivBrukerMSWHandler } from '@/app/api/modia/context/useModiaAktivBruker.msw';
import { modiaAktivEnhetMSWHandler } from '@/app/api/modia/context/useModiaAktivEnhet.msw';
import { aktivBrukerMSWHandler } from '@/app/api/modia/context/v2/aktivbruker/aktivBrukerMSW';
import { aktivEnhetMSWHandler } from '@/app/api/modia/context/v2/aktivenhet/aktivBrukerMSW';
import { dekoratørMSWHandler } from '@/app/api/modia/decorator/mocks/dekoratørMSWHandler';
import { decoratorDataMSWHandler } from '@/app/api/modia/decorator/useDecoratorData';
import { pamPostdataMSWHandler } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata.msw';
import { pamGeografiMSWHandler } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi.msw';
import { stillingsTittelMSWHandler } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel.msw';
import { arbeidsgiverMSWHandler } from '@/app/api/pam-search/underenhet/useArbeidsgiver.msw';
import { registrerEndringMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/endringer/mutations';
import {
  oppdaterInnleggMSWHandler,
  opprettInnleggMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/mutations';
import { inviterJobbsøkereMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/inviterJobbsøkere';
import {
  alleHendelserMSWHandler,
  arbeidsgiverHendelserMSWHandler,
  innleggMSWHandler,
  jobbsøkereMSWHandler,
  jobbsøkerHendelserMSWHandler,
  jobbsøkerSlettMSWHandler,
  kandidatnummerMSWHandler,
  leggTilMegSomEierMSWHandler,
  listKiLoggMSWHandler,
  oppdaterKiLoggLagretMSWHandler,
  oppdaterKiLoggManuellMSWHandler,
  oppdaterRekrutteringstreffMSWHandler,
  opprettArbeidsgiverMSWHandler,
  opprettJobbsøkereMSWHandler,
  opprettRekrutteringstreffMSWHandler,
  rekrutteringstreffArbeidsgivereMSWHandler,
  rekrutteringstreffMittKontorMSWHandler,
  rekrutteringstreffMSWHandler,
  rekrutteringstreffOversiktMSWHandler,
  slettArbeidsgiverMSWHandler,
  slettRekrutteringstreffMSWHandler,
  statusHendelserMSWHandlers,
  validerRekrutteringstreffMSWHandler,
} from '@/app/api/rekrutteringstreff/rekrutteringstreff.msw';
import { statistikkMSWHandler } from '@/app/api/statistikk/useStatistikk.msw';
import { opprettNyStillingMSWHandler } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { oppdaterStillingMSWHandler } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { brukerStandardSøkMSWHandler } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import {
  stillingMSWHandlers,
  stillingssøkMSWHandler,
  synlighetsevalueringMSWHandler,
} from '@/app/api/stilling/stilling.msw';
import { loggerMSWHandlers } from '@/mocks/loggerMSW';
import { umamiMSWHandlers } from '@/mocks/umamiMSW';

export const mswHandlers = [
  brukerMSWHandler,
  modiaAktivBrukerMSWHandler,
  modiaAktivEnhetMSWHandler,
  opprettNyStillingMSWHandler,
  oppdaterStillingMSWHandler,
  kandidatNavnMSWHandler,
  arenaKandidatnrMSWHandler,
  kandidatinformasjonMSWHandler,
  kandidatsammendragMSWHandler,
  kandidatStillingssøkMSWHandler,
  kandidatSokMSWHandler,
  ...stillingMSWHandlers,
  kandidatlisteoversiktMSWHandler,
  kandidaterMSWHandler,
  statistikkMSWHandler,
  pamPostdataMSWHandler,
  pamGeografiMSWHandler,
  nyheterMSWHandler,
  meldingsmalerStillingMSWHandler,
  meldingsmalerRekrutteringstreffMSWHandler,
  kandidatvarselMSWHandler,
  brukerStandardSøkMSWHandler,
  decoratorDataMSWHandler,
  stillingssøkMSWHandler,
  arbeidsgiverMSWHandler,
  synlighetsevalueringMSWHandler,
  kandidatlisteInfoMSWHandler,
  mineKandidatlisterMSWHandler,
  foresporselOmDelingAvCVMSWHandler,
  foresporselOmDelingAvCVStatistikkMSWHandler,
  stillingsTittelMSWHandler,
  kontorSøkMSWHandler,
  formidleUsynligKandidatMSWHandler,
  setKandidatlisteStatusMSWHandler,
  opprettRekrutteringstreffMSWHandler,
  rekrutteringstreffOversiktMSWHandler,
  rekrutteringstreffMittKontorMSWHandler,
  rekrutteringstreffMSWHandler,
  leggTilMegSomEierMSWHandler,
  oppdaterRekrutteringstreffMSWHandler,
  slettRekrutteringstreffMSWHandler,
  rekrutteringstreffArbeidsgivereMSWHandler,
  opprettArbeidsgiverMSWHandler,
  slettArbeidsgiverMSWHandler,
  arbeidsgiverHendelserMSWHandler,
  kandidatnummerMSWHandler,
  validerRekrutteringstreffMSWHandler,
  listKiLoggMSWHandler,
  oppdaterKiLoggManuellMSWHandler,
  oppdaterKiLoggLagretMSWHandler,
  inviterJobbsøkereMSWHandler,
  innleggMSWHandler,
  opprettInnleggMSWHandler,
  oppdaterInnleggMSWHandler,
  jobbsøkereMSWHandler,
  jobbsøkerHendelserMSWHandler,
  jobbsøkerSlettMSWHandler,
  opprettJobbsøkereMSWHandler,
  alleHendelserMSWHandler,
  registrerEndringMSWHandler,
  ...statusHendelserMSWHandlers,
  ...umamiMSWHandlers,
  ...loggerMSWHandlers,
  modiaContextMSWHandler,
  aktivEnhetMSWHandler,
  aktivBrukerMSWHandler,
  dekoratørMSWHandler,
  ...tilbakemeldingerMSWHandler,
  arbeidsgiverNotifikasjonTemplateMSWHandler,
];
