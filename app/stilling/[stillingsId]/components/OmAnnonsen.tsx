import { useStillingsContext } from '../StillingsContext';
import Definisjon from './Definisjon';
import OmStillingBoks from './OmStillingBoks';
import { format } from 'date-fns';
import * as React from 'react';

const OmAnnonsen: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const { updated, medium, reference, id, expires, published } =
    stillingsData?.stilling;
  const { reportee, navIdent } = stillingsData?.stilling?.administration ?? {};

  return (
    <OmStillingBoks
      tittel='Om annonsen'
      gridInnhold={
        <>
          <Definisjon tittel='Annonsenummer' innhold={`${id ?? '-'}`} />
          <Definisjon tittel='Hentet fra' innhold={`${medium ?? '-'}`} />
          <Definisjon tittel='Referanse' innhold={`${reference ?? '-'}`} />
          <Definisjon
            tittel='Kategori'
            innhold={stillingsData?.stillingsinfo?.stillingskategori ?? '-'}
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
            tittel='Kontaktperson hos Nav'
            innhold={`${reportee ?? '-'} ${navIdent ? `(${navIdent})` : ''}`}
          />
        </>
      }
    />
  );
};

export default OmAnnonsen;
