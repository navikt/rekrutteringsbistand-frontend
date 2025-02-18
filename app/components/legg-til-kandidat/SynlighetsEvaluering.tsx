import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';
import {
  KravTilKandidaten,
  KravTilVeileder,
  KriterieUtenforNoensKontroll,
  SynlighetsevalueringDTO,
  useSynlighetsevaluering,
} from '../../api/synlighet/useSynlighetsevaluering';
import SWRLaster from '../SWRLaster';

export interface SynlighetsEvalueringProps {
  fødselsnummer: string;
}

type Synlighetskriterie =
  | KriterieUtenforNoensKontroll
  | KravTilKandidaten
  | KravTilVeileder;

const SynlighetsEvaluering: React.FC<SynlighetsEvalueringProps> = ({
  fødselsnummer,
}) => {
  const synlighetsevalueringHook = useSynlighetsevaluering(fødselsnummer);
  return (
    <SWRLaster hooks={[synlighetsevalueringHook]}>
      {(data) => <KandidatenFinnesIkke {...data} />}
    </SWRLaster>
  );
};

export default SynlighetsEvaluering;

const KandidatenFinnesIkke: React.FC<SynlighetsevalueringDTO> = (
  synlighetsevaluering,
) => {
  const ingenKriterierStemmer = Object.values(synlighetsevaluering).every(
    (kriterie) => kriterie === false,
  );
  const alleKriterierStemmer = Object.values(synlighetsevaluering).every(
    (kriterie) => kriterie === true,
  );

  let forklaring: React.ReactNode = null;

  if (ingenKriterierStemmer || alleKriterierStemmer) {
    return (
      <div>Fant ingen forklaring på hvorfor kandidaten er ikke synlig</div>
    );
  }

  const kandidatensKriterierPerAnsvarsområde =
    hentKandidatensKriterierPerAnsvarsområde(synlighetsevaluering);

  if (kandidatensKriterierPerAnsvarsområde.utenforNoensKontroll.length) {
    forklaring = (
      <>
        {kandidatensKriterierPerAnsvarsområde.utenforNoensKontroll.map(
          (kriterie) => (
            <li key={kriterie}>{kriterieTilForklaring(kriterie)}</li>
          ),
        )}
      </>
    );
  } else {
    forklaring = (
      <>
        {kandidatensKriterierPerAnsvarsområde.kandidat.length > 0 && (
          <>
            <ul className='list-disc pl-6 space-y-2 mt-4'>
              {kandidatensKriterierPerAnsvarsområde.kandidat.map((kriterie) => (
                <li key={kriterie}>{kriterieTilForklaring(kriterie)}</li>
              ))}
            </ul>
          </>
        )}
        {kandidatensKriterierPerAnsvarsområde.veileder.length > 0 && (
          <>
            <ul className='list-disc pl-6 space-y-2 mt-4'>
              {kandidatensKriterierPerAnsvarsområde.veileder.map((kriterie) => (
                <li key={kriterie}>{kriterieTilForklaring(kriterie)}</li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <BodyShort>Årsak</BodyShort>
      {forklaring}
    </div>
  );
};

export const kriterierPerAnsvarsområde: Record<string, Synlighetskriterie[]> = {
  utenforNoensKontroll: Object.values(KriterieUtenforNoensKontroll),
  kandidat: Object.values(KravTilKandidaten),
  veileder: Object.values(KravTilVeileder),
};

const hentKandidatensKriterierPerAnsvarsområde = (
  synlighetsevaluering: SynlighetsevalueringDTO,
) => {
  const ikkeTilfredsstilteKriterier = Object.entries(synlighetsevaluering)
    .filter(([_, verdi]) => verdi === false)
    .map(([kriterie, _]) => kriterie as Synlighetskriterie);

  return {
    utenforNoensKontroll: ikkeTilfredsstilteKriterier.filter((k) =>
      kriterierPerAnsvarsområde.utenforNoensKontroll.includes(k),
    ),
    kandidat: ikkeTilfredsstilteKriterier.filter((k) =>
      kriterierPerAnsvarsområde.kandidat.includes(k),
    ),
    veileder: ikkeTilfredsstilteKriterier.filter((k) =>
      kriterierPerAnsvarsområde.veileder.includes(k),
    ),
  };
};

const kriterieTilForklaring = (kriterie: Synlighetskriterie) => {
  switch (kriterie) {
    case KravTilKandidaten.HarAktivCv:
    case KravTilKandidaten.HarJobbprofil:
      return 'Personbruker mangler CV. Minimum innhold er ett yrkesønske og ett geografisk sted person ønsker å jobbe.';
    case KravTilKandidaten.HarSettHjemmel:
      return 'Personbruker har ikke blitt informert om Navs behandlingsgrunnlag for deling av CV.';
    case KravTilKandidaten.MåIkkeBehandleTidligereCv:
      return 'Personbruker har ikke valgt «Del CV». Dette kravet opptrer kun i overgangs-tilfeller hvor personbruker kommer under oppfølging av Nav med en CV som hen har fra en tidligere oppfølgingsperiode, eller med en CV som ble opprettet før hen kom under oppfølging av Nav.';
    case KravTilVeileder.ErIkkeFritattKandidatsøk:
      return 'Personbruker har personforholdet «Fritatt for kandidatsøk» i Arena.';
    case KravTilKandidaten.ErUnderOppfølging:
    case KravTilVeileder.HarRiktigFormidlingsgruppe:
      return 'Personbruker må ha formidlingsgruppe ARBS (Arena-kode som betyr “arbeidssøker”).';
    case KriterieUtenforNoensKontroll.ErIkkeDød:
      return 'Er død.';
  }
};
