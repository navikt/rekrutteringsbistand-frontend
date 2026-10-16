import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { useUmami } from '@/providers/UmamiContext';
import { getMiljø, Miljø } from '@/util/miljø';
import { UmamiEvent } from '@/util/umamiEvents';
import { ArrowForwardIcon, ThumbUpIcon } from '@navikt/aksel-icons';
import { Button, CopyButton, Popover } from '@navikt/ds-react';
import { LinkIcon } from 'lucide-react';
import { FC, useId, useState } from 'react';

export interface IRekrutteringstreffDelingslenker {
  rekrutteringstreffData: RekrutteringstreffDTO;
}

const erProduksjon = getMiljø() === Miljø.ProdGcp;

const internRekrutteringstreffUrl =
  process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '') ??
  (erProduksjon
    ? 'https://rekrutteringsbistand.intern.nav.no'
    : 'https://rekrutteringsbistand.intern.dev.nav.no');

const jobbsøkerRekrutteringstreffUrl = erProduksjon
  ? 'https://www.nav.no/rekrutteringstreff'
  : 'https://rekrutteringstreff-bruker.intern.dev.nav.no/rekrutteringstreff';

const RekrutteringstreffDelingslenker: FC<IRekrutteringstreffDelingslenker> = ({
  rekrutteringstreffData,
}) => {
  const kollegaLenke = `${internRekrutteringstreffUrl}/rekrutteringstreff/${rekrutteringstreffData.id}`;
  const jobbsøkerLenke = `${jobbsøkerRekrutteringstreffUrl}/${rekrutteringstreffData.id}`;
  const umami = useUmami();
  const [åpen, settÅpen] = useState(false);
  const [anker, settAnker] = useState<HTMLElement | null>(null);
  const popoverId = useId();

  return (
    <>
      <Button
        ref={settAnker}
        type='button'
        size='small'
        variant='primary'
        icon={<ArrowForwardIcon aria-hidden />}
        aria-expanded={åpen}
        aria-controls={åpen ? popoverId : undefined}
        onClick={() => settÅpen((forrige) => !forrige)}
      >
        Del
      </Button>
      <Popover
        open={åpen}
        onClose={() => settÅpen(false)}
        anchorEl={anker}
        placement='bottom-end'
        id={popoverId}
      >
        <Popover.Content>
          <div className='flex flex-col items-start gap-2'>
            <CopyButton
              size='small'
              variant='action'
              data-color='accent'
              copyText={kollegaLenke}
              text='Delingslenke – kollega'
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
            <CopyButton
              size='small'
              variant='action'
              data-color='accent'
              copyText={jobbsøkerLenke}
              text='Delingslenke – jobbsøker'
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
          </div>
        </Popover.Content>
      </Popover>
    </>
  );
};

export default RekrutteringstreffDelingslenker;
