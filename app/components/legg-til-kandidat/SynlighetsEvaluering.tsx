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
        <span>Mulige årsaker er:</span>
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
            <BodyShort>For å bli synlig må kandidaten</BodyShort>
            <ul className='list-disc pl-6 space-y-2 mt-4'>
              {kandidatensKriterierPerAnsvarsområde.kandidat.map((kriterie) => (
                <li key={kriterie}>{kriterieTilForklaring(kriterie)}</li>
              ))}
            </ul>
          </>
        )}
        {kandidatensKriterierPerAnsvarsområde.veileder.length > 0 && (
          <>
            <BodyShort>For å bli synlig må du</BodyShort>
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

  return <div>{forklaring}</div>;
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
      return 'logge inn på Arbeidsplassen og opprette CV';
    case KravTilKandidaten.HarJobbprofil:
      return 'logge inn på Arbeidsplassen og registrere jobbønsker i CV-en';
    case KravTilKandidaten.HarSettHjemmel:
      return 'logge inn på Arbeidsplassen og godkjenne deling av CV-en med NAV';
    case KravTilKandidaten.ErUnderOppfølging:
      return 'registrere seg som arbeidssøker på nav.no';
    case KravTilKandidaten.MåIkkeBehandleTidligereCv:
      return 'logge inn på Arbeidsplassen og godkjenne tidligere registrert CV for deling med NAV';

    case KravTilVeileder.ErIkkeFritattKandidatsøk:
      return 'fjerne personforholdet "Fritatt for kandidatsøk" i Arena';
    case KravTilVeileder.HarRiktigFormidlingsgruppe:
      return 'reaktivere personen som arbeidssøker. Han/hun har feil formidlingskode i Arena';

    case KriterieUtenforNoensKontroll.ErIkkeSperretAnsatt:
      return 'Egen ansatt';
    case KriterieUtenforNoensKontroll.ErIkkeDød:
      return 'Død';
  }
};
