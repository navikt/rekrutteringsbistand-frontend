// Sentral liste over MSW-handlere. Legg til nye her.
import { nyheterMSWHandler } from '@/app/api/bruker/nyheter/useNyheter';
import { brukerMSWHandler } from '@/app/api/bruker/useBruker';
import { foresporselOmDelingAvCVMSWHandler } from '@/app/api/foresporsel-om-deling-av-cv/foresporsler/[...slug]/useForespurteOmDelingAvCv';
import { foresporselOmDelingAvCVStatistikkMSWHandler } from '@/app/api/foresporsel-om-deling-av-cv/statistikk/useForesporselOmdelingAvCV';
import { arenaKandidatnrMSWHandler } from '@/app/api/kandidat-sok/useArenaKandidatnr';
import { kandidatNavnMSWHandler } from '@/app/api/kandidat-sok/useKandidatNavn';
import { kandidatStillingssøkMSWHandler } from '@/app/api/kandidat-sok/useKandidatStillingssøk';
import { kandidatinformasjonMSWHandler } from '@/app/api/kandidat-sok/useKandidatinformasjon';
import { kandidatsammendragMSWHandler } from '@/app/api/kandidat-sok/useKandidatsammendrag';
import { kandidatSokMSWHandler } from '@/app/api/kandidat-sok/useKandidatsøk';
import { kontorSøkMSWHandler } from '@/app/api/kandidat-sok/useKontorSøk';
import { formidleUsynligKandidatMSWHandler } from '@/app/api/kandidat/formidleKandidat';
import { kandidatlisteoversiktMSWHandler } from '@/app/api/kandidat/useKandidatListeoversikt';
import { kandidatlisteMSWHandler } from '@/app/api/kandidat/useKandidatlisteForEier';
import { kandidatlisteInfoMSWHandler } from '@/app/api/kandidat/useKandidatlisteInfo';
import { mineKandidatlisterMSWHandler } from '@/app/api/kandidat/useMineKandidatlister';
import { meldingsmalerMSWHandler } from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import { kandidatvarselMSWHandler } from '@/app/api/kandidatvarsel/kandidatvarsel';
import { modiaContextMSWHandler } from '@/app/api/modia/context/setModiaContext';
import { modiaAktivBrukerMSWHandler } from '@/app/api/modia/context/useModiaAktivBruker';
import { modiaAktivEnhetMSWHandler } from '@/app/api/modia/context/useModiaAktivEnhet';
import { decoratorDataMSWHandler } from '@/app/api/modia/decorator/useDecoratorData';
import { pamPostdataMSWHandler } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { pamGeografiMSWHandler } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { stillingsTittelMSWHandler } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel';
import { arbeidsgiverMSWHandler } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import {
  opprettArbeidsgiverMSWHandler,
  slettArbeidsgiverMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/mutations';
import { arbeidsgiverHendelserMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import { rekrutteringstreffArbeidsgivereMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  oppdaterInnleggMSWHandler,
  opprettInnleggMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/mutations';
import { inviterJobbsøkereMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/inviterJobbsøkere';
import {
  oppdaterRekrutteringstreffMSWHandler,
  slettRekrutteringstreffMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/mutations';
import { statusHendelserMSWHandlers } from '@/app/api/rekrutteringstreff/[...slug]/statushendelser/mutations';
import { rekrutteringstreffMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { kandidatnummerMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/utils/useKandidatnummer';
import {
  listKiLoggMSWHandler,
  oppdaterKiLoggLagretMSWHandler,
  oppdaterKiLoggManuellMSWHandler,
} from '@/app/api/rekrutteringstreff/kiValidering/useKiLogg';
import { validerRekrutteringstreffMSWHandler } from '@/app/api/rekrutteringstreff/kiValidering/useValiderRekrutteringstreff';
// Rekrutteringstreff MSW-handlere
import { opprettRekrutteringstreffMSWHandler } from '@/app/api/rekrutteringstreff/mutations';
import { rekrutteringstreffOversiktMSWHandler } from '@/app/api/rekrutteringstreff/oversikt/useRekrutteringstreffOversikt';
import { statistikkMSWHandler } from '@/app/api/statistikk/useStatistikk';
import { opprettNyStillingMSWHandler } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { oppdaterStillingMSWHandler } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { stillingMSWHandlers } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/useStilling';
import { brukerStandardSøkMSWHandler } from '@/app/api/stilling/standardsok/useBrukersStandardsøk';
import { stillingssøkMSWHandler } from '@/app/api/stillings-sok/useStillingssøk';
import { synlighetsevalueringMSWHandler } from '@/app/api/synlighet/evaluering/useSynlighetsevaluering';
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
  kandidatlisteMSWHandler,
  statistikkMSWHandler,
  pamPostdataMSWHandler,
  pamGeografiMSWHandler,
  nyheterMSWHandler,
  meldingsmalerMSWHandler,
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
  // Rekrutteringstreff
  opprettRekrutteringstreffMSWHandler,
  rekrutteringstreffOversiktMSWHandler,
  rekrutteringstreffMSWHandler,
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
  opprettInnleggMSWHandler,
  oppdaterInnleggMSWHandler,
  ...statusHendelserMSWHandlers,
  ...umamiMSWHandlers,
  ...loggerMSWHandlers,
  modiaContextMSWHandler,
];
