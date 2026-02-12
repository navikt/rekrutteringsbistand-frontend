import {
  ClockDashedIcon,
  EyeSlashIcon,
  FolderFileIcon,
} from '@navikt/aksel-icons';
import { BodyLong, BodyShort } from '@navikt/ds-react';

export default function FullførOppdragTekst() {
  return (
    <div className='space-y-2'>
      <BodyShort>Oppdraget og annonsen</BodyShort>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-3'>
          <div className='shrink-0'>
            <EyeSlashIcon aria-hidden />
          </div>
          <BodyLong size='small' className='m-0'>
            Oppdraget vises ikke lenger som åpent for søkere.
          </BodyLong>
        </div>
        <div className='flex items-center gap-3'>
          <div className='shrink-0'>
            <FolderFileIcon aria-hidden />
          </div>
          <BodyLong size='small' className='m-0'>
            Du kan fremdeles se detaljer om oppdraget.
          </BodyLong>
        </div>
        <div className='flex items-center gap-3'>
          <div className='shrink-0'>
            <ClockDashedIcon aria-hidden />
          </div>
          <BodyLong size='small' className='m-0'>
            Du kan gjenåpne oppdraget hvis du vil gjøre noen endringer.
          </BodyLong>
        </div>
      </div>
    </div>
  );
}
