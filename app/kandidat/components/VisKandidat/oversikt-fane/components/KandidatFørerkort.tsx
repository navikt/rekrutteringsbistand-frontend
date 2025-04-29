import { FørerkortSchemaDTO } from '../../../../../api/kandidat-sok/schema/forerkortSchema.zod';
import GråBoks from './GråBoks';
import Erfaring from './erfaring/Erfaring';
import { CarIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { compareAsc, format, parseISO } from 'date-fns';
import * as React from 'react';

const FørerkortTidsperiode = ({
  førerkort,
}: {
  førerkort: FørerkortSchemaDTO;
}) => {
  if (førerkort?.fraDato && førerkort?.tilDato) {
    return (
      <BodyShort size='small'>
        {format(førerkort.fraDato, 'dd.MM.yyyy')}
        {' – ' + format(førerkort.tilDato, 'dd.MM.yyyy')}
      </BodyShort>
    );
  } else {
    return null;
  }
};

interface KandidatFørerkortProps {
  førerkort?: FørerkortSchemaDTO[] | null;
}

const KandidatFørerkort: React.FC<KandidatFørerkortProps> = ({ førerkort }) => {
  if (!førerkort || !førerkort.length) {
    return null;
  }

  const fjernetDuplikater = fjernDuplikater(førerkort).sort((a, b) =>
    compareAsc(parseISO(a?.fraDato ?? ''), parseISO(b?.fraDato ?? '')),
  );
  return (
    <GråBoks tittel='Førerkort' ikon={<CarIcon />}>
      {fjernetDuplikater.map((kort) => (
        <Erfaring
          key={`${kort?.forerkortKode}-${kort?.fraDato}`}
          overskrift={kort?.forerkortKodeKlasse}
          beskrivelse={kort?.forerkortKode}
          detaljer={<FørerkortTidsperiode førerkort={kort} />}
        />
      ))}
    </GråBoks>
  );
};

const fjernDuplikater = (forerkortListe: FørerkortSchemaDTO[]) => {
  const forerkortAlleredeILista = new Set();

  return forerkortListe.filter((forerkort) => {
    const forerkortetErIkkeAlleredeLagtTil = !forerkortAlleredeILista.has(
      forerkort?.forerkortKodeKlasse,
    );

    forerkortAlleredeILista.add(forerkort?.forerkortKodeKlasse);
    return forerkortetErIkkeAlleredeLagtTil;
  });
};

export default KandidatFørerkort;
