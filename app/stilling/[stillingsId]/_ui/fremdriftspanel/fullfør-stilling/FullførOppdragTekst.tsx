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
      <div className='flex flex-col gap-3 '>
        <div className='flex items-center gap-3'>
          <EyeSlashIcon aria-hidden />
          <BodyLong size='small' className='m-0'>
            Annonsen vises ikke lenger som aktiv.
          </BodyLong>
        </div>
        <div className='flex items-center gap-3'>
          <FolderFileIcon aria-hidden />
          <BodyLong size='small' className='m-0'>
            Du kan fremdeles se detaljer om oppdraget.
          </BodyLong>
        </div>
        <div className='flex items-center gap-3'>
          <ClockDashedIcon aria-hidden />
          <BodyLong size='small' className='m-0'>
            Du kan gjenåpne oppdraget hvis du vil gjøre noen endringer.
          </BodyLong>
        </div>
      </div>
    </div>
  );
}
