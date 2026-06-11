import { arbeidsgiverNotifikasjonTemplateMSWHandler } from '@/app/api/arbeidsgiver-notifikasjon/template/template.msw';
import { nyheterMSWHandler } from '@/app/api/bruker/nyheter/useNyheter.msw';
import { tilbakemeldingerMSWHandler } from '@/app/api/bruker/tilbakemeldinger/useTilbakemeldinger.msw';
import { brukerMSWHandler } from '@/app/api/bruker/useBruker.msw';
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
import { kandidatIListeMSWHandler } from '@/app/api/kandidat/useKandidatIListe.msw';
import { kandidatlisteoversiktMSWHandler } from '@/app/api/kandidat/useKandidatListeoversikt.msw';
import { kandidatlisteInfoMSWHandler } from '@/app/api/kandidat/useKandidatlisteInfo.msw';
import { kandidatnrIListeMSWHandler } from '@/app/api/kandidat/useKandidatnrIListe.msw';
import { kandidatlisteKandidaterMSWHandler } from '@/app/api/kandidat/useKandidlisteKandidater.msw';
import { mineKandidatlisterMSWHandler } from '@/app/api/kandidat/useMineKandidatlister.msw';
import {
  meldingsmalerRekrutteringstreffMSWHandler,
  meldingsmalerStillingMSWHandler,
} from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import { modiaContextMSWHandler } from '@/app/api/modia/context/setModiaContext';
import { modiaAktivBrukerMSWHandler } from '@/app/api/modia/context/useModiaAktivBruker.msw';
import { modiaAktivEnhetMSWHandler } from '@/app/api/modia/context/useModiaAktivEnhet.msw';
import { aktivBrukerMSWHandler } from '@/app/api/modia/context/v2/aktivbruker/aktivBrukerMSW';
import { aktivEnhetMSWHandler } from '@/app/api/modia/context/v2/aktivenhet/aktivBrukerMSW';
import { dekoratørMSWHandler } from '@/app/api/modia/decorator/mocks/dekoratørMSWHandler';
import { decoratorDataMSWHandler } from '@/app/api/modia/decorator/useDecoratorData';
import { pamPostdataMSWHandler } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata.msw';
import { pamGeografiMSWHandler } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi.msw';
import { personligeEgenskaperMSWHandler } from '@/app/api/pam-ontologi/personlige_egenskaper/usePersonligeEgenskaper';
import { samledeKvalifikasjonerMSWHandler } from '@/app/api/pam-ontologi/samlede_kvalifikasjoner/useSamledeKvalifikasjoner';
import { stillingsTittelMSWHandler } from '@/app/api/pam-ontologi/stillingsTittel/useStillingsTittel.msw';
import { arbeidsgiverMSWHandler } from '@/app/api/pam-search/underenhet/useArbeidsgiver.msw';
import { alleHendelserMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/allehendelser/useAlleHendelser.msw';
import { arbeidsgiverHendelserMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgiverHendelser';
import {
  opprettArbeidsgiverMSWHandler,
  rekrutteringstreffArbeidsgivereMSWHandler,
  slettArbeidsgiverMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  arbeidsgivereMedBehovMSWHandler,
  oppdaterBehovMSWHandler,
  opprettArbeidsgiverMedBehovMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import { registrerEndringMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/endringer/mutations';
import { opprettFormidlingStillingMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/formidling/mutations';
import {
  formidlingListeAlleMSWHandler,
  formidlingListeEgneMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import {
  innleggMSWHandler,
  oppdaterInnleggMSWHandler,
  opprettInnleggMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/innlegg/useInnlegg.msw';
import { inviterJobbsøkereMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/inviterJobbsøkere';
import {
  jobbsøkerSlettMSWHandler,
  opprettJobbsøkereMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations';
import { svarForJobbsøkerMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/svarForJobbsøker';
import { jobbsøkerHendelserMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerHendelser';
import { jobbsøkerSøkMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import {
  jobbsøkereForFormidlingEgneMSWHandler,
  jobbsøkereForFormidlingAlleMSWHandler,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForFormidling';
import { kandidatnummerMSWHandler } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useKandidatnummer.msw';
import { behovMetadataMSWHandler } from '@/app/api/rekrutteringstreff/arbeidsgiver-behov-metadata/useBehovMetadata';
import {
  listKiLoggMSWHandler,
  oppdaterKiLoggLagretMSWHandler,
  oppdaterKiLoggManuellMSWHandler,
  validerRekrutteringstreffMSWHandler,
} from '@/app/api/rekrutteringstreff/kiValidering/useKiValidering.msw';
import {
  leggTilMegSomEierMSWHandler,
  oppdaterRekrutteringstreffMSWHandler,
  opprettRekrutteringstreffMSWHandler,
  rekrutteringstreffMSWHandler,
  slettRekrutteringstreffMSWHandler,
  statusHendelserMSWHandlers,
} from '@/app/api/rekrutteringstreff/rekrutteringstreff.msw';
import { rekrutteringstreffSokMSWHandler } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok.msw';
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
  opprettFormidlingStillingMSWHandler,
  oppdaterStillingMSWHandler,
  kandidatNavnMSWHandler,
  arenaKandidatnrMSWHandler,
  kandidatinformasjonMSWHandler,
  kandidatsammendragMSWHandler,
  kandidatStillingssøkMSWHandler,
  kandidatSokMSWHandler,
  ...stillingMSWHandlers,
  kandidatlisteoversiktMSWHandler,
  kandidatlisteKandidaterMSWHandler,
  kandidatnrIListeMSWHandler,
  kandidatIListeMSWHandler,
  statistikkMSWHandler,
  pamPostdataMSWHandler,
  pamGeografiMSWHandler,
  nyheterMSWHandler,
  meldingsmalerStillingMSWHandler,
  meldingsmalerRekrutteringstreffMSWHandler,
  brukerStandardSøkMSWHandler,
  decoratorDataMSWHandler,
  stillingssøkMSWHandler,
  arbeidsgiverMSWHandler,
  synlighetsevalueringMSWHandler,
  kandidatlisteInfoMSWHandler,
  mineKandidatlisterMSWHandler,
  foresporselOmDelingAvCVStatistikkMSWHandler,
  stillingsTittelMSWHandler,
  samledeKvalifikasjonerMSWHandler,
  personligeEgenskaperMSWHandler,
  kontorSøkMSWHandler,
  formidleUsynligKandidatMSWHandler,
  setKandidatlisteStatusMSWHandler,
  opprettRekrutteringstreffMSWHandler,
  rekrutteringstreffSokMSWHandler,
  behovMetadataMSWHandler,
  rekrutteringstreffMSWHandler,
  leggTilMegSomEierMSWHandler,
  oppdaterRekrutteringstreffMSWHandler,
  slettRekrutteringstreffMSWHandler,
  rekrutteringstreffArbeidsgivereMSWHandler,
  arbeidsgivereMedBehovMSWHandler,
  opprettArbeidsgiverMSWHandler,
  opprettArbeidsgiverMedBehovMSWHandler,
  oppdaterBehovMSWHandler,
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
  jobbsøkerSøkMSWHandler,
  jobbsøkereForFormidlingEgneMSWHandler,
  jobbsøkereForFormidlingAlleMSWHandler,
  formidlingListeAlleMSWHandler,
  formidlingListeEgneMSWHandler,
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
  svarForJobbsøkerMSWHandler,
];
