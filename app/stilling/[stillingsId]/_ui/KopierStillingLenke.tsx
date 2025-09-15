import { getMiljø, Miljø } from '@/util/miljø';
import { ThumbUpIcon } from '@navikt/aksel-icons';
import { CopyButton } from '@navikt/ds-react';
import { LinkIcon } from 'lucide-react';
import { FC } from 'react';

export interface IKopierStillingLenke {
  stillingsId: string;
}
const visStillingUrl =
  getMiljø() !== Miljø.ProdGcp
    ? 'https://vis-stilling.intern.dev.nav.no/arbeid/stilling'
    : 'https://www.nav.no/arbeid/stilling';
export const hentAnnonselenke = (uuid?: string) => `${visStillingUrl}/${uuid}`;

const KopierStillingLenke: FC<IKopierStillingLenke> = ({ stillingsId }) => {
  const lenke = hentAnnonselenke(stillingsId);
  return (
    <CopyButton
      size='small'
      variant='action'
      copyText={lenke}
      text='Kopier delingslenke'
      activeText='Lenken er kopiert'
      icon={<LinkIcon aria-hidden />}
      activeIcon={<ThumbUpIcon aria-hidden />}
    />
  );
};

export default KopierStillingLenke;
