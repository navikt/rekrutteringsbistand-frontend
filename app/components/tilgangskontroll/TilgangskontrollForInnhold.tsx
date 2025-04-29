'use client';

import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import ErrorBoundary from '../feilhåndtering/ErrorBoundary';
import css from './TilgangskontrollForInnhold.module.css';
import { Roller } from './roller';
import { Alert, Heading, Link } from '@navikt/ds-react';
import * as React from 'react';

export interface ITilgangskontrollForInnhold {
  kreverEnAvRollene?: Roller[] | null;
  children: React.ReactNode;
  skjulVarsel?: boolean;
  manglerEierskap?: boolean;
}

const rolleTilNavn = (rolle: Roller): string | null => {
  switch (rolle) {
    case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET:
      return 'Arbeidsgiverrettet';

    case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET:
      return 'Jobbsøkerrettet';

    case Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER:
      return 'Utvikler';

    default:
      return null;
  }
};

export const TilgangskontrollForInnhold: React.FC<
  ITilgangskontrollForInnhold
> = ({ kreverEnAvRollene, children, skjulVarsel, manglerEierskap }) => {
  const {
    brukerData: { roller },
  } = useApplikasjonContext();

  const harTilgang = kreverEnAvRollene
    ? kreverEnAvRollene.some((r) => {
        return (
          (roller?.includes(r) ||
            roller?.includes(Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER)) &&
          !manglerEierskap
        );
      })
    : true;

  if (harTilgang) {
    return <>{children}</>;
  }

  if (!harTilgang && skjulVarsel) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div className={css.container}>
        <Alert className={css.alert} variant='error' title='Ikke tilgang'>
          <div>
            <Heading spacing size='small' level='3'>
              Ikke tilgang
            </Heading>
            <span>
              Hei, {manglerEierskap ? 'du mangler eierskap og ' : 'du '} trenger
              rollen{' '}
              {kreverEnAvRollene &&
                kreverEnAvRollene
                  .filter(
                    (r) => r !== Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER,
                  )
                  .map((rolle, i) => (
                    <span key={i}>
                      {rolleTilNavn(rolle)}{' '}
                      {i < kreverEnAvRollene.length - 1 ? 'eller' : ''}{' '}
                    </span>
                  ))}
              for å få tilgang til innhold på denne siden. Husk at du må ha et
              tjenstlig behov for det den spesifikke rollen gir deg tilgang til.
              Snakk med din nærmeste leder.
              <br />
              <Link href='https://navno.sharepoint.com/:u:/r/sites/fag-og-ytelser-arbeid-markedsarbeid/SitePages/Tilgangskontroll.aspx?csf=1&web=1&e=yp2Ibk'>
                Trykk her for å lese mer
              </Link>
            </span>
          </div>
        </Alert>
      </div>
    </ErrorBoundary>
  );
};
