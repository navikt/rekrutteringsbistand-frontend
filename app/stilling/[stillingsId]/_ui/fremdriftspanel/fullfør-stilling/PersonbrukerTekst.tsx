import { BellDotIcon, PersonChatIcon, TableIcon } from '@navikt/aksel-icons';
import { BodyLong, BodyShort } from '@navikt/ds-react';

export default function PersonbrukerTekst() {
  return (
    <div className='space-y-2 mt-8'>
      <BodyShort>Personbrukere</BodyShort>
      <div className='flex flex-col gap-3 '>
        <div className='flex items-center gap-3'>
          <div className='shrink-0'>
            <TableIcon aria-hidden />
          </div>
          <BodyLong size='small' className='m-0'>
            Aktivitetskortet til alle involverte flyttes til “Fullført”-kolonnen
            i aktivitetsplanen.
          </BodyLong>
        </div>
        <div className='flex items-center gap-3'>
          <div className='shrink-0'>
            <BellDotIcon aria-hidden />
          </div>
          <BodyLong size='small' className='m-0'>
            Alle som ikke fikk jobben får beskjed om avslaget på
            nav.no/min-side.
          </BodyLong>
        </div>
        <div className='flex items-center gap-3'>
          <div className='shrink-0'>
            <PersonChatIcon aria-hidden />
          </div>
          <BodyLong size='small' className='m-0'>
            De som fikk jobben får <i>ikke beskjed automatisk</i>, siden de mest
            sannsynlig får høre nyheten direkte fra arbeidsgiveren.
          </BodyLong>
        </div>
      </div>
    </div>
  );
}
