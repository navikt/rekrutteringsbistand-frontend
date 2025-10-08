import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import StoppStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/StoppStillingKnapp';
import GjenåpneStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/GjenåpneStillingKnapp';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formaterNorskDato } from '@/util/util';
import {
  BellIcon,
  EyeIcon,
  PersonChatIcon,
  TableIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';

export interface FullførtStillingProps {
  totalStillinger: number;
  antallFåttJobben: number;
  dropDown?: boolean;
}

export default function FullførtStilling({
  totalStillinger,
  antallFåttJobben,
  dropDown,
}: FullførtStillingProps) {
  const {
    stillingsData,
    omStilling: { erJobbmesse },
  } = useStillingsContext();

  const knapper = (
    <>
      <StoppStillingKnapp />
      <GjenåpneStillingKnapp />
    </>
  );

  const visning = (
    <div className='flex flex-col gap-6 mt-6'>
      <div>
        <Heading size='small' level='2'>
          Oppdrag fullført
        </Heading>
        <BodyShort
          size='small'
          className='text-[var(--ax-text-neutral-subtle)] mt-1'
        >
          Av {stillingsData.stilling?.administration?.reportee}{' '}
          {formaterNorskDato({
            dato: stillingsData.stilling.updated,
          })}
        </BodyShort>
      </div>
      {!erJobbmesse && (
        <>
          <div>
            {antallFåttJobben > 0 ? (
              <div>
                <Heading size='xsmall' level='3'>
                  🎯 Her traff du blink
                </Heading>
                <BodyShort size='small'>
                  {antallFåttJobben} av {totalStillinger} stillinger ble besatt
                </BodyShort>
              </div>
            ) : (
              <div>
                <Heading size='xsmall' level='3'>
                  🐟 Ingen napp denne gangen
                </Heading>
                <BodyShort size='small'>
                  {antallFåttJobben} av {totalStillinger} stillinger ble besatt
                </BodyShort>
              </div>
            )}
          </div>
          <Box.New background='neutral-soft' borderRadius={'large'} padding='3'>
            <Heading size='xsmall' level='3' className='mb-4'>
              Hva som skjedde bak kulissene
            </Heading>
            <div className='flex gap-4 flex-col'>
              <div className='flex gap-2'>
                <BellIcon aria-hidden className='shrink-0' />
                <BodyShort size='small'>
                  Alle som ikke fikk jobben fikk beskjed om avslaget på
                  nav.no/min-side.
                </BodyShort>
              </div>
              <div className='flex gap-2'>
                <TableIcon aria-hidden className='shrink-0' />
                <BodyShort size='small'>
                  Aktivitetskortet ble flyttet til “Fullført”-kolonnen i
                  aktivitetsplanen.
                </BodyShort>
              </div>
              <div className='flex gap-2'>
                <PersonChatIcon aria-hidden className='shrink-0' />
                <BodyShort size='small'>
                  De som fikk jobben fikk ikke beskjed automatisk, siden de mest
                  sannsynlig får høre nyheten direkte fra arbeidsgiveren.
                </BodyShort>
              </div>
              <div className='flex gap-2'>
                <EyeIcon aria-hidden className='shrink-0' />
                <BodyShort size='small'>
                  Annonsen vises ikke lenger som aktiv.
                </BodyShort>
              </div>
            </div>
          </Box.New>
        </>
      )}
    </div>
  );
  if (dropDown) {
    return (
      <div className='p-2'>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            {knapper}
            <AccordionTrigger>
              <BodyShort size='small'>
                {antallFåttJobben} av {totalStillinger} stillinger ble besatt
              </BodyShort>
            </AccordionTrigger>
            <AccordionContent>{visning}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <div className={dropDown ? 'p-4' : '' + 'mr-2'}>
      {knapper} {visning}
    </div>
  );
}
