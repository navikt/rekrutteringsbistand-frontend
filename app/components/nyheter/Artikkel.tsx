import { NyhetDTO } from '../../nyheter';
import { formaterNorskDato } from '../util';
import { Detail, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

interface Props {
  nyhet: NyhetDTO;
  ulest: boolean;
}

const Artikkel: FunctionComponent<Props> = ({ nyhet, ulest }) => {
  const klassenavn =
    'p-4 sm:p-8 border-b border-lightgray last:border-none' +
    (ulest ? 'bg-[#e3edf8]' : '');
  // const parsedDate = parse(nyhet.dato, 'dd.MM.yyyy', new Date(), {
  //   locale: nb,
  // });

  const dato = nyhet.dato;
  return (
    <article className={klassenavn}>
      <Detail>{formaterNorskDato({ dato: dato })}</Detail>
      <Heading spacing className={'mt-0'} size='small'>
        {nyhet.tittel}
      </Heading>
      <div className={'mb-1 text-base font-semibold'}>{nyhet.innhold}</div>
    </article>
  );
};

export default Artikkel;
