import { Detail, Heading } from '@navikt/ds-react';
import { format, parse } from 'date-fns';
import { nb } from 'date-fns/locale';
import { FunctionComponent } from 'react';
import { NyhetDTO } from '../../../../nyheter';

interface Props {
  nyhet: NyhetDTO;
  ulest: boolean;
}

const Artikkel: FunctionComponent<Props> = ({ nyhet, ulest }) => {
  const klassenavn =
    'p-4 sm:p-8 border-b border-lightgray last:border-none' +
    (ulest ? 'bg-[#e3edf8]' : '');
  const parsedDate = parse(nyhet.dato, 'dd.MM.yyyy', new Date(), {
    locale: nb,
  });

  return (
    <article className={klassenavn}>
      <Detail>{format(parsedDate, 'd. MMMM yyyy', { locale: nb })}</Detail>
      <Heading spacing className={'mt-0'} size='small'>
        {nyhet.tittel}
      </Heading>
      <div className={'font-semibold text-base mb-1'}>{nyhet.innhold}</div>
    </article>
  );
};

export default Artikkel;
