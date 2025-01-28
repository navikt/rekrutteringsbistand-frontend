import { CopyButton, Link } from '@navikt/ds-react';
import * as React from 'react';
import { getMiljø, Miljø } from '../../../../util/miljø';

export interface IKopierStillingLenke {
  stillingsId: string;
}
const visStillingUrl =
  getMiljø() !== Miljø.ProdGcp
    ? 'https://vis-stilling.intern.dev.nav.no/arbeid/stilling'
    : 'https://www.nav.no/arbeid/stilling';
const hentAnnonselenke = (uuid?: string) => `${visStillingUrl}/${uuid}`;

const KopierStillingLenke: React.FC<IKopierStillingLenke> = ({
  stillingsId,
}) => {
  const lenke = hentAnnonselenke(stillingsId);
  return (
    <div className='flex gap-2'>
      <Link href={lenke} target='_blank'>
        {lenke}
      </Link>
      <CopyButton className='m-0 p-0' copyText={lenke} />
    </div>
  );
};

export default KopierStillingLenke;
