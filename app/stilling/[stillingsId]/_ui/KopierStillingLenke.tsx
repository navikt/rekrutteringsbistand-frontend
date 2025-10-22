import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { visStillingsDataInfo } from '@/app/stilling/_util/stillingInfoUtil';
import { useUmami } from '@/providers/UmamiContext';
import { getMiljø, Miljø } from '@/util/miljø';
import { UmamiEvent } from '@/util/umamiEvents';
import { ThumbUpIcon } from '@navikt/aksel-icons';
import { CopyButton } from '@navikt/ds-react';
import { LinkIcon } from 'lucide-react';
import { FC } from 'react';

export interface IKopierStillingLenke {
  stillingsData: StillingsDataDTO;
}

const visStillingDirektemeldtUrl =
  getMiljø() !== Miljø.ProdGcp
    ? 'https://vis-stilling.intern.dev.nav.no/arbeid/stilling'
    : 'https://www.nav.no/arbeid/stilling';

const visStillingArbeidsplassenUrl =
  getMiljø() !== Miljø.ProdGcp
    ? 'https://arbeidsplassen.intern.dev.nav.no/stillinger/stilling'
    : 'https://arbeidsplassen.nav.no/stillinger/stilling';

export const hentAnnonselenke = (visStillingUrl: string, uuid?: string) =>
  `${visStillingUrl}/${uuid}`;

const KopierStillingLenke: FC<IKopierStillingLenke> = ({ stillingsData }) => {
  const erDirektemeldtStilling =
    visStillingsDataInfo(stillingsData).erDirektemeldt;
  const lenke = erDirektemeldtStilling
    ? hentAnnonselenke(visStillingDirektemeldtUrl, stillingsData.stilling.uuid)
    : hentAnnonselenke(
        visStillingArbeidsplassenUrl,
        stillingsData.stilling.uuid,
      );
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
      onClick={() =>
        erDirektemeldtStilling
          ? umami.track(UmamiEvent.Stilling.kopier_delingslenke_direktemeldt)
          : umami.track(UmamiEvent.Stilling.kopier_delingslenke_arbeidsplassen)
      }
    />
  );
};

export default KopierStillingLenke;
