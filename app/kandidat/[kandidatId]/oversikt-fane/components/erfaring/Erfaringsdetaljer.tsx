import { BodyShort } from '@navikt/ds-react';
import { format } from 'date-fns';
import React from 'react';
import Detaljer from './Detaljer';

type Props = {
  fradato?: string | null;
  tildato?: string | null;
  nåværende?: boolean;
  sted?: string | null;
};

const Erfaringsdetaljer = ({ fradato, tildato, nåværende, sted }: Props) => {
  const fraDatoFormatert = fradato ? format(fradato, 'dd.MM.yyyy') : null;
  const tilDatoFormatert = tildato ? format(tildato, 'dd.MM.yyyy') : null;

  let tidsperiode = null;

  if (fraDatoFormatert && tilDatoFormatert) {
    tidsperiode = (
      <>
        <BodyShort size='small' spacing>
          {fraDatoFormatert} – {tilDatoFormatert}
          {nåværende && ' nå'}
        </BodyShort>
        <BodyShort size='small' spacing>
          {
            /*@ts-ignore: TODO: written before strict-mode enabled */
            diffMellomToDatoer(fradato, tildato)
          }
        </BodyShort>
      </>
    );
  } else if (fraDatoFormatert) {
    tidsperiode = (
      <>
        <BodyShort size='small' spacing>
          {fraDatoFormatert}
          {nåværende && ' – nå'}
        </BodyShort>
        <BodyShort size='small' spacing>
          {
            /*@ts-ignore: TODO: written before strict-mode enabled */
            diffMellomToDatoer(fradato, new Date().toString())
          }
        </BodyShort>
      </>
    );
  } else if (tilDatoFormatert) {
    tidsperiode = (
      <>
        <BodyShort size='small' spacing>
          {tilDatoFormatert}
          {nåværende && ' nå'}
        </BodyShort>
        <BodyShort size='small' spacing>
          {
            /*@ts-ignore: TODO: written before strict-mode enabled */
            diffMellomToDatoer(tildato, tildato)
          }
        </BodyShort>
      </>
    );
  } else {
    tidsperiode = (
      <BodyShort size='small' spacing>
        {nåværende && ' nåværende'}
      </BodyShort>
    );
  }

  return (
    <Detaljer>
      {sted && (
        <BodyShort size='small' spacing>
          {sted}
        </BodyShort>
      )}
      {tidsperiode}
    </Detaljer>
  );
};

const diffMellomToDatoer = (fraDato: string, tilDato: string): string => {
  const startDato = new Date(fraDato);
  const sluttDato = new Date(tilDato);
  const månedDiff =
    sluttDato.getMonth() -
    startDato.getMonth() +
    12 * (sluttDato.getFullYear() - startDato.getFullYear());

  if (månedDiff === 0) {
    return '1 måned';
  }

  const antallÅr = (månedDiff / 12) | 0;
  const antallMåneder = (månedDiff % 12) + 1;

  if (antallÅr === 0 && antallMåneder < 12) {
    return antallMåneder + ' måneder';
  } else if (antallMåneder === 12) {
    return antallÅr + 1 + ' år';
  } else if (antallÅr > 0 && antallMåneder > 1) {
    return antallÅr + ' år, ' + antallMåneder + ' måneder';
  } else if (antallÅr > 0 && antallMåneder === 1) {
    return antallÅr + ' år';
  }

  return '';
};

export default Erfaringsdetaljer;
