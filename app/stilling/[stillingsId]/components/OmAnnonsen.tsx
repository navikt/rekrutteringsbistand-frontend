import { Heading } from '@navikt/ds-react';
import * as React from 'react';

import { format } from 'date-fns';
import { useStillingsContext } from '../StillingsContext';
import Definisjon from './Definisjon';

const OmAnnonsen: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const { updated, medium, reference, id, expires, published } =
    stillingsData?.stilling;
  //@ts-ignore TODO type this
  const { reportee, navIdent } = stillingsData?.stilling?.administration;

  return (
    <div className='mt-4'>
      <Heading size='large' className='my-4'>
        Om annonsen
      </Heading>

      <dl className='grid grid-cols-1 md:grid-cols-3 gap-6 print:grid print:grid-cols-3 print:gap-6'>
        <Definisjon tittel='Annonsenummer' innhold={`${id}`} />
        <Definisjon tittel='Hentet fra' innhold={`${medium}`} />
        <Definisjon tittel='Referanse' innhold={`${reference}`} />
        <Definisjon
          tittel='Kategori'
          innhold={`${stillingsData?.stillingsinfo?.stillingskategori}`}
        />
        <Definisjon
          tittel='Publisert'
          innhold={`${published ? format(published, 'dd.MM.yyyy') : '-'}`}
        />
        <Definisjon
          tittel='Siste visning'
          innhold={`${expires ? format(expires, 'dd.MM.yyyy') : '-'}`}
        />
        <Definisjon
          tittel='Sist endret'
          innhold={`${updated ? format(updated, 'dd.MM.yyyy') : '-'}`}
        />
        <Definisjon
          tittel='Kontaktperson hos NAV'
          innhold={`${reportee} ${navIdent ? `(${navIdent})` : ''}`}
        />
      </dl>
    </div>
  );
};

export default OmAnnonsen;
