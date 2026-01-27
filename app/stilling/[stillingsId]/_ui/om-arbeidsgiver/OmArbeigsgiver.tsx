import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import Definisjon from '@/app/stilling/[stillingsId]/_ui/Definisjon';
import InfoBoks from '@/app/stilling/[stillingsId]/_ui/InfoBoks';
import capitalizeEmployerName from '@/app/stilling/_util/stilling-util';
import VisEditorTekst from '@/components/rikteksteditor/VisEditorTekst';
import { BodyShort, Heading } from '@navikt/ds-react';

export default function OmArbeigsgiver() {
  const { stillingsData } = useStillingsContext();

  return (
    <InfoBoks>
      <div data-testid='om-arbeidsgiver' className='space-y-5'>
        <Heading size='small' level='3'>
          Om arbeidsgiveren
        </Heading>
        <div>
          <BodyShort size='medium' weight='semibold'>
            {capitalizeEmployerName(
              stillingsData?.stilling?.employer?.name ?? '-',
            )}
          </BodyShort>
          <VisEditorTekst
            htmlTekst={stillingsData.stilling?.properties?.employerdescription}
          />
        </div>
        {stillingsData?.stilling?.properties?.employerhomepage && (
          <Definisjon
            tittel='Nettside'
            innhold={stillingsData?.stilling?.properties?.employerhomepage}
          />
        )}
        {stillingsData?.stilling?.properties?.linkedinpage && (
          <Definisjon
            tittel='LinkedIn'
            innhold={stillingsData?.stilling?.properties?.linkedinpage}
          />
        )}

        <Definisjon
          tittel='Organisasjonsnummer'
          innhold={stillingsData.stilling?.employer?.orgnr ?? '-'}
        />
        <Definisjon
          tittel='Sektor'
          innhold={stillingsData.stilling?.properties?.sector ?? '-'}
        />
        <BodyShort size='large' weight='semibold' className='pt-4'>
          {stillingsData?.stilling?.contactList?.length &&
          stillingsData?.stilling?.contactList?.length > 1
            ? 'Kontaktpersoner'
            : 'Kontaktperson'}
        </BodyShort>
        <div className='grid grid-cols-1 gap-4'>
          {stillingsData?.stilling?.contactList?.map((kontakt, index) => (
            <Definisjon
              key={index}
              tittel={`${kontakt.name}, ${kontakt.title}`}
              innhold={`${kontakt.email}  Tlf ${kontakt.phone?.replace(/(\d{2})/g, '$1 ').trim()} `}
            />
          ))}
        </div>
      </div>
    </InfoBoks>
  );
}
