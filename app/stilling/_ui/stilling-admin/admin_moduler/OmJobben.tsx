import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import RedigerBoks from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/RedigerBoks';
import RikTekstEditor from '@/components/felles/rikteksteditor/RikTekstEditor';
import { BodyLong } from '@navikt/ds-react';
import { useFormContext } from 'react-hook-form';

export default function OmJobben() {
  const { setValue, watch } = useFormContext<StillingsDataDTO>();

  return (
    <RedigerBoks tittel='Om jobben'>
      <div className='flex flex-col gap-4'>
        <BodyLong>
          Fortell jobbsøkeren om jobben: de unike fordelene, mulighetene, og
          oppgavene som de vil møte. For eksempel arbeidsoppgaver,
          forventninger, læring- og karrieremuligheter, kultur, lønn, og goder.
        </BodyLong>
        <RikTekstEditor
          id='rediger-stilling-beskrivelse'
          tekst={watch('stilling.properties.adtext') ?? ''}
          onChange={(e) => setValue('stilling.properties.adtext', e)}
        />
      </div>
    </RedigerBoks>
  );
}
