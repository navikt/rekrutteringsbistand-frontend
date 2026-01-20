import GjenåpneEtterregistreringKnapp from '@/app/etterregistrering/[stillingsId]/GjenåpneEtterregistreringKnapp';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import StoppStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/StoppStillingKnapp';
import GjenåpneStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/GjenåpneStillingKnapp';
import { FremdriftspanelEtterregistreringInfoTekst } from '@/app/stilling/_ui/stilling-admin/FremdriftspanelRedigeringInfoTekst';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { formaterNorskDato } from '@/util/dato';
import {
  BellIcon,
  EyeIcon,
  PadlockLockedIcon,
  PadlockUnlockedIcon,
  PersonChatIcon,
  TableIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

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

  const stillingskategori = stillingsData?.stillingsinfo?.stillingskategori;
  const erEtterregistrering =
    stillingskategori === Stillingskategori.Formidling;

  const hentSisteDatoForEtterregistrering = () => {
    const publiseringsdato = stillingsData?.stilling.published;
    if (!publiseringsdato) {
      return null;
    }
    const publiseringsdatoDato = new Date(publiseringsdato);
    return new Date(
      publiseringsdatoDato.getFullYear(),
      publiseringsdatoDato.getMonth() + 1,
      0,
    );
  };
  const sisteDatoForEtterregistrering = hentSisteDatoForEtterregistrering();
  const dagensDato = new Date();
  const formatertSisteDatoForEtterregistrering =
    sisteDatoForEtterregistrering != null
      ? format(sisteDatoForEtterregistrering, 'dd. MMMM', { locale: nb })
      : '';
  const erRedigeringLåstForEtterregistrering =
    sisteDatoForEtterregistrering != null &&
    dagensDato > sisteDatoForEtterregistrering;
  const dagerIgjenTilLåsing =
    sisteDatoForEtterregistrering != null
      ? sisteDatoForEtterregistrering.getDate() - dagensDato.getDate()
      : 0;

  const knapper = erEtterregistrering ? (
    erRedigeringLåstForEtterregistrering ? (
      <></>
    ) : (
      <GjenåpneEtterregistreringKnapp />
    )
  ) : (
    <>
      <StoppStillingKnapp />
      <GjenåpneStillingKnapp />
    </>
  );

  const visning = (
    <div className='mt-6 flex flex-col gap-6'>
      <div>
        {erEtterregistrering ? (
          <Heading size='small' level='2'>
            Registreringen er fullført 💪
          </Heading>
        ) : (
          <Heading size='small' level='2'>
            Oppdrag fullført 💪
          </Heading>
        )}
        <BodyShort
          size='small'
          className='mt-1 text-[var(--ax-text-neutral-subtle)]'
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
              <Heading size='xsmall' level='3'>
                🎯 Her traff du blink
              </Heading>
            ) : (
              <Heading size='xsmall' level='3'>
                🐟 Ingen napp denne gangen
              </Heading>
            )}
            <BodyShort size='small'>
              {antallFåttJobben} av {totalStillinger} stillinger ble besatt
            </BodyShort>
          </div>
          {erEtterregistrering ? (
            <>
              <Box
                background='neutral-soft'
                borderRadius='8'
                padding='space-12'
              >
                {erRedigeringLåstForEtterregistrering ? (
                  <>
                    <Heading
                      size='xsmall'
                      level='3'
                      className='mb-4 flex items-center gap-2'
                    >
                      <PadlockLockedIcon aria-hidden className='shrink-0' />
                      Registreringen er låst
                    </Heading>
                    <BodyShort size='small'>
                      Statistikken ble telt{' '}
                      {formatertSisteDatoForEtterregistrering}.
                    </BodyShort>
                  </>
                ) : (
                  <>
                    <Heading
                      size='xsmall'
                      level='3'
                      className='mb-4 flex items-center gap-2'
                    >
                      <PadlockUnlockedIcon aria-hidden className='shrink-0' />
                      Låses om {dagerIgjenTilLåsing} dager
                    </Heading>
                    <BodyShort size='small'>
                      Statistikken telles{' '}
                      {formatertSisteDatoForEtterregistrering}. Du kan rette
                      feil frem til det.
                    </BodyShort>
                  </>
                )}
              </Box>
              <FremdriftspanelEtterregistreringInfoTekst />
            </>
          ) : (
            <Box background='neutral-soft' borderRadius='8' padding='space-12'>
              <Heading size='xsmall' level='3' className='mb-4'>
                Hva som skjedde bak kulissene
              </Heading>
              <div className='flex flex-col gap-4'>
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
                    De som fikk jobben fikk ikke beskjed automatisk, siden de
                    mest sannsynlig får høre nyheten direkte fra arbeidsgiveren.
                  </BodyShort>
                </div>
                <div className='flex gap-2'>
                  <EyeIcon aria-hidden className='shrink-0' />
                  <BodyShort size='small'>
                    Annonsen vises ikke lenger som aktiv.
                  </BodyShort>
                </div>
              </div>
            </Box>
          )}
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
