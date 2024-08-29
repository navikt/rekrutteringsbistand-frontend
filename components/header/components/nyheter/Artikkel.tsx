import { Detail, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Nyhet } from './Nyheter';

const printDato = (dato: Date) =>
  dato.toLocaleDateString
    ? dato.toLocaleDateString('no-NB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : dato.toISOString();

interface Props {
  nyhet: Nyhet;
  ulest: boolean;
}

const Artikkel: FunctionComponent<Props> = ({ nyhet, ulest }) => {
  const klassenavn =
    'p-4 sm:p-8 border-b border-lightgray last:border-none' +
    (ulest ? 'bg-[#e3edf8]' : '');

  return (
    <article className={klassenavn}>
      <Detail size='small'>{printDato(nyhet.dato)}</Detail>
      <Heading spacing className={'mt-0'} size='small'>
        {nyhet.tittel}
      </Heading>
      <div className={'font-semibold text-base mb-1'}>{nyhet.innhold}</div>
    </article>
  );
};

export default Artikkel;
