import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import RedigerStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/RedigerStillingKnapp';
import FullførStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingKnapp';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import Fremdriftspanel from '@/components/Fremdriftspanel';
import SWRLaster from '@/components/SWRLaster';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import {
  BellIcon,
  EyeIcon,
  PersonChatIcon,
  TableIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Box, Heading } from '@navikt/ds-react';

export default function FremdriftspanelStilling() {
  const { stillingsData, erEier } = useStillingsContext();
  const kandidatlisteHook = useKandidatlisteForEier(stillingsData, erEier);

  const fullført = <div> Yey</div>;

  const ikkeFullført = (
    <div>
      {/* <AvpubliserStilling />
         <AvsluttStillingKnapp
           kandidatlisteId={kandidatlisteInfo?.kandidatlisteId}
           besatteStillinger={besatteStillinger}
           antallStillinger={antallStillinger}
           kandidatlisteStatus={data?.status}
         /> */}
      <div className='grid grid-cols-2 gap-2'>
        <RedigerStillingKnapp />
        <FullførStillingKnapp />
      </div>
      <div className='flex flex-col gap-6 mt-6'>
        {/* <div className='flex flex-col gap-2'>
            <Heading size='small' level='2'>
              Del med arbeidsgiver
            </Heading>

            <ProgressBar
              value={1}
              valueMax={doneCount}
              size='small'
              aria-labelledby='progress-bar-label-small'
            />

            <div className=' flex justify-end text-sm tabular-nums'>
              {1}/{doneCount}
            </div> */}
        {/* </div> */}
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
                Annonsen vises ikke lenger som aktiv.
              </BodyShort>
            </div>
          </div>
        </Box.New>
      </div>
    </div>
  );

  return (
    <Fremdriftspanel>
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]}
      >
        <SWRLaster hooks={[kandidatlisteHook]}>
          {(kandidatliste) => {
            const erFullført =
              stillingsData.stilling.status === StillingsStatus.Inaktiv &&
              kandidatliste.status === Kandidatlistestatus.Lukket;

            return erFullført ? fullført : ikkeFullført;
          }}
        </SWRLaster>
      </TilgangskontrollForInnhold>
    </Fremdriftspanel>
  );
}
