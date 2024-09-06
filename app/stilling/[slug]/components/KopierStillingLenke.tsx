import { CopyButton } from '@navikt/ds-react';
import * as React from 'react';
import { getMiljø, Miljø } from '../../../../util/miljø';

export interface IKopierStillingLenke {
  stillingsId: string;
}
const visStillingUrl =
  getMiljø() === Miljø.DevGcp
    ? 'https://vis-stilling.intern.dev.nav.no/arbeid/stilling'
    : 'https://www.nav.no/arbeid/stilling';
const hentAnnonselenke = (uuid?: string) => `${visStillingUrl}/${uuid}`;

const KopierStillingLenke: React.FC<IKopierStillingLenke> = ({
  stillingsId,
}) => {
  return (
    <CopyButton
      className='m-0 p-0'
      copyText={hentAnnonselenke(stillingsId)}
      text='Kopier annonselenke'
    />
  );
};

export default KopierStillingLenke;
