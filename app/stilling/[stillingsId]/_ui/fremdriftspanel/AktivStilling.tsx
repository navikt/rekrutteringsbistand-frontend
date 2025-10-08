import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import EndreSøkeforslag from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/EndreSøkeforslag';
import RedigerStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/RedigerStillingKnapp';
import FullførStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingKnapp';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BarChartIcon,
  BellIcon,
  EyeIcon,
  PersonChatIcon,
  TableIcon,
} from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Heading,
  ProgressBar,
} from '@navikt/ds-react';

export interface AktivStillingProps {
  dropDown?: boolean;
  antallFåttJobben: number;
  antallDelt: number;
  totalStillinger: number;
}

export default function AktivStilling({
  antallFåttJobben,
  antallDelt,
  totalStillinger,
  dropDown,
}: AktivStillingProps) {
  const { erJobbmesse } = useStillingsContext();

  const delMedArbeidsgiverVisning = erJobbmesse ? null : (
    <div className='flex flex-col gap-2 w-full'>
      <Heading size='small' level='2'>
        Del med arbeidsgiver
      </Heading>

      <ProgressBar
        value={antallDelt}
        valueMax={totalStillinger}
        size='small'
        aria-labelledby='progress-bar-label-small'
      />

      <div className=' flex justify-end text-sm tabular-nums'>
        {antallDelt}/{totalStillinger}
      </div>
    </div>
  );

  const knapper = (
    <div className='grid grid-cols-2 gap-2'>
      <RedigerStillingKnapp />
      <FullførStillingKnapp />
    </div>
  );

  const visning = (
    <div className='flex flex-col gap-6 '>
      <div>
        <Heading size='xsmall' level='3'>
          Sjekkliste
        </Heading>
        <BodyLong size='small' className='mt-1'>
          Ble det match? Velg hvem som fikk jobben og fullfør. Du kan også
          fullføre oppdraget selv om det ikke gikk denne gangen.
        </BodyLong>
      </div>

      <div>
        <Heading size='xsmall' level='3'>
          Søkerstopp
        </Heading>
        <BodyLong size='small' className='mt-1'>
          Har du fått nok jobbsøkere? Du kan stoppe å motta nye forslag, og
          samtidig skjule oppdraget fra listen. Slå det på igjen når du vil.
        </BodyLong>
        <EndreSøkeforslag />
      </div>
      {!erJobbmesse && (
        <Box.New background='neutral-soft' borderRadius={'large'} padding='3'>
          <Heading size='xsmall' level='3' className='mb-4'>
            Hva skjer etter fullføring?
          </Heading>
          <div className='flex gap-4 flex-col'>
            <div className='flex gap-2'>
              <BellIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Alle som ikke fikk jobben får beskjed om avslaget på
                nav.no/min-side.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <TableIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Aktivitetskortet flyttes til “Fullført”-kolonnen i
                aktivitetsplanen.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <PersonChatIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                De som fikk jobben får ikke beskjed automatisk, siden de mest
                sannsynlig får høre nyheten direkte fra arbeidsgiveren.
              </BodyShort>
            </div>
            <div className='flex gap-2'>
              <EyeIcon aria-hidden className='shrink-0' />
              <BodyShort size='small'>
                Oppdraget vises ikke lenger som aktiv.
              </BodyShort>
            </div>
            {antallFåttJobben > 0 && (
              <div className='flex gap-2'>
                <BarChartIcon aria-hidden className='shrink-0' />
                <BodyShort size='small'>
                  Registreringen sendes til statistikk. Tellingene låses ved
                  månedsskifte.
                </BodyShort>
              </div>
            )}
          </div>
        </Box.New>
      )}
    </div>
  );

  if (dropDown) {
    return (
      <div className='p-2'>
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1'>
            {knapper}
            <AccordionTrigger>{delMedArbeidsgiverVisning}</AccordionTrigger>
            <AccordionContent>{visning}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }

  return (
    <div className={'mr-2'}>
      {knapper}
      <div className='mt-5'>
        {delMedArbeidsgiverVisning}
        {visning}
      </div>
    </div>
  );
}
