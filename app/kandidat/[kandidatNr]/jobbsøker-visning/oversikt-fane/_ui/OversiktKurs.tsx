import Detaljer from './Detaljer';
import Erfaring from './Erfaring';
import { KursSchemaDTO } from '@/app/api/kandidat-sok/schema/kursSchema.zod';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import InfoBoks from '@/components/InfoBoks';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { HatSchoolIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { compareAsc, format, parseISO } from 'date-fns';

enum Omfangenhet {
  Time = 'TIME',
  Dag = 'DAG',
  Uke = 'UKE',
  Måned = 'MND',
}
export default function OversiktKurs() {
  const { kandidatData } = useJobbsøkerContext();
  const kurs = kandidatData?.kursObj;

  if (!kurs || kurs.length === 0) {
    return null;
  }
  return (
    <InfoBoks>
      <div className='flex items-baseline'>
        <IkonNavnAvatar
          ikon={<HatSchoolIcon />}
          farge={'blå'}
          className={'mr-3'}
        />
        <Heading size='small' className='mb-4'>
          Kurs
        </Heading>
      </div>
      {kurs
        .sort((a, b) =>
          compareAsc(parseISO(a.fraDato ?? ''), parseISO(b.fraDato ?? '')),
        )
        .map((kurs, index) => (
          <Erfaring
            key={index + `${kurs?.arrangor}-${kurs?.fraDato}`}
            overskrift={kurs.tittel}
            detaljer={<TidsperiodeKurs kurs={kurs} />}
          />
        ))}
    </InfoBoks>
  );
}

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
