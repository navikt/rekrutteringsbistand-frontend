import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useUmami } from '@/providers/UmamiContext';
import { getMiljø, Miljø } from '@/util/miljø';
import { UmamiEvent } from '@/util/umamiEvents';
import { ThumbUpIcon } from '@navikt/aksel-icons';
import { CopyButton, Tooltip } from '@navikt/ds-react';
import { LinkIcon } from 'lucide-react';
import { FC } from 'react';

export interface IKopierTreffLenke {
  rekrutteringstreffData: RekrutteringstreffDTO;
}

const rekrutteringstreffUrl =
  getMiljø() !== Miljø.ProdGcp
    ? 'https://rekrutteringsbistand.intern.dev.nav.no/rekrutteringstreff'
    : 'https://rekrutteringsbistand.intern.nav.no/rekrutteringstreff';

const KopierRekrutteringstreffLenke: FC<IKopierTreffLenke> = ({
  rekrutteringstreffData,
}) => {
  const lenke = `${rekrutteringstreffUrl}/${rekrutteringstreffData.id}`;
  const umami = useUmami();
  return (
    <Tooltip content='Kopier lenke for intern deling med kollegaer'>
      <CopyButton
        className={'text-left'}
        size='small'
        data-color='accent'
        copyText={lenke}
        text='Kopier intern delingslenke'
        activeText='Lenken er kopiert'
        icon={<LinkIcon aria-hidden />}
        activeIcon={<ThumbUpIcon aria-hidden />}
        onClick={() =>
          umami.track(
            UmamiEvent.Rekrutteringstreff
              .kopier_delingslenke_rekrutteringstreff,
          )
        }
      />
    </Tooltip>
  );
};

export default KopierRekrutteringstreffLenke;
