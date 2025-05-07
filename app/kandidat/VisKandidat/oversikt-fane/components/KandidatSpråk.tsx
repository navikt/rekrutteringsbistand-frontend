import { SprakSchemaDTO } from '../../../../api/kandidat-sok/schema/sprakSchema.zod';
import GråBoks from './GråBoks';
import Detaljer from './erfaring/Detaljer';
import Erfaring from './erfaring/Erfaring';
import { LanguageIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

export enum Språkferdighetsnivå {
  IkkeOppgitt = 'IKKEOPPGITT',
  Nybegynner = 'NYBEGYNNER',
  Godt = 'GODT',
  VeldigGodt = 'VELDIG_GODT',
  Førstespråk = 'FOERSTESPRAAK',
}

const språkferdighetTilVisningsnavn = (ferdighet?: string | null) => {
  switch (ferdighet) {
    case Språkferdighetsnivå.IkkeOppgitt:
      return '-';
    case Språkferdighetsnivå.Nybegynner:
      return 'Nybegynner';
    case Språkferdighetsnivå.Godt:
      return 'Godt';
    case Språkferdighetsnivå.VeldigGodt:
      return 'Veldig godt';
    case Språkferdighetsnivå.Førstespråk:
      return 'Morsmål';
    default:
      return '-';
  }
};

export interface KandidatSpråkProps {
  språk?: SprakSchemaDTO[] | null;
}
const KandidatSpråk: React.FC<KandidatSpråkProps> = ({ språk }) => {
  if (!språk || !språk.length) {
    return null;
  }
  return (
    <GråBoks tittel='Språk' ikon={<LanguageIcon />}>
      {språk.map((ferdighet) => {
        return (
          <Erfaring
            key={`${ferdighet?.sprakKodeTekst}${ferdighet?.ferdighetMuntlig}${ferdighet?.ferdighetSkriftlig}`}
            overskrift={ferdighet?.sprakKodeTekst ?? '-'}
            beskrivelse={
              <Detaljer>
                <BodyShort size='small'>
                  Skriftlig:{' '}
                  {språkferdighetTilVisningsnavn(
                    ferdighet?.ferdighetSkriftlig ?? 'IKKE_OPPGITT',
                  )}
                </BodyShort>
                <BodyShort size='small'>
                  Muntlig:{' '}
                  {språkferdighetTilVisningsnavn(
                    ferdighet?.ferdighetMuntlig ?? 'IKKE_OPPGITT',
                  )}
                </BodyShort>
              </Detaljer>
            }
          />
        );
      })}
    </GråBoks>
  );
};

export default KandidatSpråk;
