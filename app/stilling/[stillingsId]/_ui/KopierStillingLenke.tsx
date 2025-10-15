import { getMiljø, Miljø } from '@/util/miljø';
import { ThumbUpIcon } from '@navikt/aksel-icons';
import { CopyButton } from '@navikt/ds-react';
import { LinkIcon } from 'lucide-react';
import { FC } from 'react';
import { UmamiEvent } from '@/util/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';

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
  const umami = useUmami();
  return (
    <CopyButton
      size='small'
      variant='action'
      copyText={lenke}
      text='Kopier delingslenke'
      activeText='Lenken er kopiert'
      icon={<LinkIcon aria-hidden />}
      activeIcon={<ThumbUpIcon aria-hidden />}
      onClick={() => umami.track(UmamiEvent.Stilling.kopier_delingslenke)}
    />
  );
};

export default KopierStillingLenke;
