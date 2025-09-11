import { getMiljø, Miljø } from '@/util/miljø';
import { CopyButton, Tooltip } from '@navikt/ds-react';
import * as React from 'react';

export interface IKopierStillingLenke {
  stillingsId: string;
}
const visStillingUrl =
  getMiljø() !== Miljø.ProdGcp
    ? 'https://vis-stilling.intern.dev.nav.no/arbeid/stilling'
    : 'https://www.nav.no/arbeid/stilling';
export const hentAnnonselenke = (uuid?: string) => `${visStillingUrl}/${uuid}`;

const KopierStillingLenke: React.FC<IKopierStillingLenke> = ({
  stillingsId,
}) => {
  const lenke = hentAnnonselenke(stillingsId);
  return (
    <Tooltip content='Kopier lenke til stillingsannonse' placement='bottom'>
      <CopyButton copyText={lenke} />
    </Tooltip>
  );
};

export default KopierStillingLenke;
