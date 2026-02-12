import Erfaring from './Erfaring';
import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import InfoBoks from '@/components/InfoBoks';
import IkonNavnAvatar from '@/components/ui/IkonNavnAvatar';
import { ClipboardIcon } from '@navikt/aksel-icons';
import { Heading } from '@navikt/ds-react';

export default function OversiktKompetanse() {
  const { kandidatData } = useJobbsøkerContext();

  const kompetanse = kandidatData?.kompetanseObj;

  return (
    <InfoBoks>
      <div className='flex items-baseline'>
        <IkonNavnAvatar
          ikon={<ClipboardIcon />}
          farge={'blå'}
          className={'mr-3'}
        />
        <Heading size='small' className='mb-4'>
          Kompetanse
        </Heading>
      </div>
      {kompetanse && (
        <Erfaring
          beskrivelse={kompetanse
            .filter((k) => k.kompKodeNavn)
            .map((k) => k.kompKodeNavn)
            .join(', ')}
        />
      )}
    </InfoBoks>
  );
}
