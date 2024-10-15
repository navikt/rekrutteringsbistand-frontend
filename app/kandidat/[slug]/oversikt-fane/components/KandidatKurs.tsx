import { HatSchoolIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import { compareAsc, format, parseISO } from 'date-fns';
import * as React from 'react';
import { KursSchemaDTO } from '../../../../api/kandidat-sok/schema/kursSchema.zod';
import GråRamme from './GråRamme';
import Detaljer from './erfaring/Detaljer';
import Erfaring from './erfaring/Erfaring';

enum Omfangenhet {
  Time = 'TIME',
  Dag = 'DAG',
  Uke = 'UKE',
  Måned = 'MND',
}
export interface KandidatKursProps {
  kurs?: KursSchemaDTO[] | null;
}

const KandidatKurs: React.FC<KandidatKursProps> = ({ kurs }) => {
  if (!kurs || kurs.length === 0) {
    return null;
  }
  return (
    <GråRamme tittel='Kurs' ikon={<HatSchoolIcon />}>
      {kurs
        .sort((a, b) =>
          compareAsc(parseISO(a.fraDato ?? ''), parseISO(b.fraDato ?? '')),
        )
        .map((kurs) => (
          <Erfaring
            key={`${kurs.tittel}-${kurs.fraDato}`}
            overskrift={kurs.tittel}
            detaljer={<TidsperiodeKurs kurs={kurs} />}
          />
        ))}
    </GråRamme>
  );
};

const TidsperiodeKurs = ({ kurs }: { kurs: KursSchemaDTO }) => {
  if (
    kurs.fraDato &&
    kurs.omfangEnhet &&
    kurs.omfangEnhet.length > 0 &&
    kurs.omfangVerdi &&
    kurs.omfangVerdi > 0
  ) {
    return (
      <Detaljer>
        <BodyShort size='small'>
          Fullført {format(kurs.fraDato, 'dd.MM.yyyy')}
        </BodyShort>
        <BodyShort size='small'>
          {hentKursvarighet(kurs.omfangEnhet, kurs.omfangVerdi)}
        </BodyShort>
      </Detaljer>
    );
  } else if (
    kurs.fraDato &&
    (kurs?.omfangEnhet?.length === 0 || kurs?.omfangVerdi === 0)
  ) {
    return (
      <BodyShort size='small'>
        Fullført {format(kurs.fraDato, 'dd.MM.yyyy')}
      </BodyShort>
    );
  } else if (
    !kurs.fraDato &&
    kurs.omfangEnhet &&
    kurs.omfangVerdi &&
    kurs.omfangEnhet.length > 0 &&
    kurs.omfangVerdi > 0
  ) {
    return (
      <BodyShort size='small'>
        {hentKursvarighet(kurs.omfangEnhet, kurs.omfangVerdi)}
      </BodyShort>
    );
  } else {
    return null;
  }
};

const hentKursvarighet = (omfangEnhet: string, omfangVerdi: number) => {
  switch (omfangEnhet) {
    case Omfangenhet.Time:
      return `${omfangVerdi} ${omfangVerdi > 1 ? 'timer' : 'time'}`;
    case Omfangenhet.Dag:
      return `${omfangVerdi} ${omfangVerdi > 1 ? 'dager' : 'dag'}`;
    case Omfangenhet.Uke:
      return `${omfangVerdi} ${omfangVerdi > 1 ? 'uker' : 'uke'}`;
    case Omfangenhet.Måned:
      return `${omfangVerdi} ${omfangVerdi > 1 ? 'måneder' : 'måned'}`;
    default:
      return '';
  }
};

export default KandidatKurs;
