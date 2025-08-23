import Definisjon from './Definisjon';
import OmStillingBoks from './OmStillingBoks';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { formaterNorskDato } from '@/util/util';
import * as React from 'react';

const OmAnnonsen: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const { updated, medium, reference, expires, published, annonsenr } =
    stillingsData?.stilling;
  const { reportee, navIdent } = stillingsData?.stilling?.administration ?? {};

  return (
    <OmStillingBoks
      tittel='Om annonsen'
      gridInnhold={
        <>
          <Definisjon tittel='Annonsenummer' innhold={`${annonsenr ?? '-'}`} />
          <Definisjon tittel='Hentet fra' innhold={`${medium ?? '-'}`} />
          <Definisjon tittel='Referanse' innhold={`${reference ?? '-'}`} />
          <Definisjon
            tittel='Kategori'
            innhold={stillingsData?.stillingsinfo?.stillingskategori ?? '-'}
          />
          <Definisjon
            tittel='Publisert'
            innhold={`${published ? formaterNorskDato({ dato: published, visning: 'tall' }) : '-'}`}
          />
          <Definisjon
            tittel='Siste visning'
            innhold={`${expires ? formaterNorskDato({ dato: expires, visning: 'tall' }) : '-'}`}
          />
          <Definisjon
            tittel='Sist endret'
            innhold={`${updated ? formaterNorskDato({ dato: updated, visning: 'tall' }) : '-'}`}
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
