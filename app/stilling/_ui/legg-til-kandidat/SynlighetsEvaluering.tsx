import {
  KravTilKandidaten,
  KravTilVeileder,
  KriterieUtenforNoensKontroll,
  SynlighetsevalueringDTO,
  useSynlighetsevaluering,
} from '@/app/api/synlighet/evaluering/useSynlighetsevaluering';
import SWRLaster from '@/components/SWRLaster';
import * as React from 'react';

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
      {(data) => data && <KandidatenFinnesIkke {...data} />}
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
      <div>Fant ingen forklaring på hvorfor jobbsøkeren er ikke synlig</div>
    );
  }

  const kandidatensKriterierPerAnsvarsområde =
    hentKandidatensKriterierPerAnsvarsområde(synlighetsevaluering);
  const visteForklaringer = new Set<string>();
  const lagListe = (kriterier: Synlighetskriterie[]) =>
    lagForklaringsliste(kriterier, visteForklaringer);

  if (kandidatensKriterierPerAnsvarsområde.utenforNoensKontroll.length) {
    forklaring = lagListe(
      kandidatensKriterierPerAnsvarsområde.utenforNoensKontroll,
    );
  } else {
    forklaring = (
      <>
        {kandidatensKriterierPerAnsvarsområde.kandidat.length > 0 && (
          <>{lagListe(kandidatensKriterierPerAnsvarsområde.kandidat)}</>
        )}
        {kandidatensKriterierPerAnsvarsområde.veileder.length > 0 && (
          <>{lagListe(kandidatensKriterierPerAnsvarsområde.veileder)}</>
        )}
      </>
    );
  }

  return forklaring;
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
    .filter(([, verdi]) => verdi === false)
    .map(([kriterie]) => kriterie as Synlighetskriterie);

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

const lagForklaringsliste = (
  kriterier: Synlighetskriterie[],
  visteForklaringer: Set<string>,
) => {
  const forklaringer = hentUnikeForklaringer(kriterier, visteForklaringer);

  if (forklaringer.length === 0) {
    return null;
  }

  return (
    <ul className='list-disc space-y-2 pl-6'>
      {forklaringer.map((forklaring) => (
        <li key={forklaring}>{forklaring}</li>
      ))}
    </ul>
  );
};

const hentUnikeForklaringer = (
  kriterier: Synlighetskriterie[],
  visteForklaringer: Set<string>,
) => {
  const forklaringer: string[] = [];

  kriterier.forEach((kriterie) => {
    const forklaring = kriterieTilForklaring(kriterie);

    if (!forklaring || visteForklaringer.has(forklaring)) {
      return;
    }

    visteForklaringer.add(forklaring);
    forklaringer.push(forklaring);
  });

  return forklaringer;
};

const kriterieTilForklaring = (
  kriterie: Synlighetskriterie,
): string | undefined => {
  switch (kriterie) {
    case KravTilKandidaten.HarAktivCv:
    case KravTilKandidaten.HarJobbprofil:
      return 'Personbruker mangler CV. Minimum innhold er ett yrkesønske og ett geografisk sted person ønsker å jobbe.';
    case KravTilKandidaten.HarSettHjemmel:
      return 'Personbruker har ikke blitt informert om Navs behandlingsgrunnlag for deling av CV.';
    case KravTilKandidaten.MåIkkeBehandleTidligereCv:
      return 'Personbruker har ikke valgt «Del CV». Dette kravet opptrer kun i overgangs-tilfeller hvor personbruker kommer under oppfølging av Nav med en CV som hen har fra en tidligere oppfølgingsperiode, eller med en CV som ble opprettet før hen kom under oppfølging av Nav.';
    case KravTilKandidaten.ErUnderOppfølging:
    case KravTilVeileder.ErArbeidssøker:
      return 'Personbruker må være i Navs Arbeidssøkerregister.';
    case KriterieUtenforNoensKontroll.ErIkkeDød:
      return 'Er død.';
  }
};
