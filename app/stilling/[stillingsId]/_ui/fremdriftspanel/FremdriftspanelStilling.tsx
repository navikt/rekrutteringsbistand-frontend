import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import EndreSøkeforslag from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/EndreSøkeforslag';
import RedigerStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/RedigerStillingKnapp';
import FullførStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingKnapp';
import GjenåpneStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/GjenåpneStillingKnapp';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import SWRLaster from '@/components/SWRLaster';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { formaterNorskDato } from '@/util/util';
import {
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

export interface FremdriftspanelStillingProps {
  dropDown?: boolean;
}

export default function FremdriftspanelStilling({
  dropDown,
}: FremdriftspanelStillingProps) {
  const { stillingsData, erEier } = useStillingsContext();
  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);

  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <SWRLaster hooks={[kandidatlisteHook]}>
        {(kandidatliste) => {
          const erFullført =
            stillingsData.stilling.status === StillingsStatus.Stoppet &&
            kandidatliste.status === Kandidatlistestatus.Lukket;

          const totalStillinger =
            (stillingsData.stilling?.properties?.positioncount &&
              Number(stillingsData.stilling?.properties?.positioncount)) ||
            1;

          const antallDelt =
            kandidatliste?.kandidater.filter((k) =>
              k.utfallsendringer.some(
                (k) => k.sendtTilArbeidsgiversKandidatliste === true,
              ),
            ).length ?? 0;

          if (erFullført) {
            return (
              <div className={dropDown ? 'p-4' : ''}>
                <GjenåpneStillingKnapp />
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
                  <Box.New
                    background='neutral-soft'
                    borderRadius={'large'}
                    padding='3'
                  >
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
                          De som fikk jobben fikk ikke beskjed automatisk, siden
                          de mest sannsynlig får høre nyheten direkte fra
                          arbeidsgiveren.
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
                </div>
              </div>
            );
          }
          return (
            <div className={dropDown ? 'p-4' : ''}>
              <div className='grid grid-cols-2 gap-2'>
                <RedigerStillingKnapp />
                <FullførStillingKnapp />
              </div>

              <div className='flex flex-col gap-6 mt-6'>
                <div className='flex flex-col gap-2'>
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
                <div>
                  <Heading size='xsmall' level='3'>
                    Sjekkliste
                  </Heading>
                  <BodyLong size='small' className='mt-1'>
                    Ble det match? Velg hvem som fikk jobben og fullfør. Du kan
                    også fullføre oppdraget selv om det ikke gikk denne gangen.
                  </BodyLong>
                </div>
                <div>
                  <Heading size='xsmall' level='3'>
                    Søkerstopp
                  </Heading>
                  <BodyLong size='small' className='mt-1'>
                    Har du fått nok jobbsøkere? Du kan stoppe å motta nye
                    forslag, og samtidig skjule oppdraget fra listen. Slå det på
                    igjen når du vil.
                  </BodyLong>
                  <EndreSøkeforslag />
                </div>
                <Box.New
                  background='neutral-soft'
                  borderRadius={'large'}
                  padding='3'
                >
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
                        De som fikk jobben får ikke beskjed automatisk, siden de
                        mest sannsynlig får høre nyheten direkte fra
                        arbeidsgiveren.
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
              </div>
            </div>
          );
        }}
      </SWRLaster>
    </TilgangskontrollForInnhold>
  );
}
