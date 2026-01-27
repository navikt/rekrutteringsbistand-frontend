import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import Definisjon from '@/app/stilling/[stillingsId]/_ui/Definisjon';
import { formaterNorskDato } from '@/util/dato';
import { Box, Heading } from '@navikt/ds-react';

export default function OmStillingsoppdraget() {
  const { stillingsData } = useStillingsContext();
  return (
    <Box
      borderRadius='12'
      borderColor='info-subtleA'
      background='default'
      padding='space-16'
    >
      <div data-testid='om-stillingen' className='space-y-5'>
        <Heading size='small' level='3'>
          Om stillingsoppdraget
        </Heading>
        <Definisjon
          tittel='Annonsenummer'
          innhold={`${stillingsData.stilling.annonsenr ?? '-'}`}
        />
        <Definisjon
          tittel='Hentet fra'
          innhold={`${stillingsData.stilling.medium ?? '-'}`}
        />
        <Definisjon
          tittel='Referanse'
          innhold={`${stillingsData.stilling.reference ?? '-'}`}
        />

        <Definisjon
          tittel='Publisert'
          innhold={`${stillingsData.stilling.published ? formaterNorskDato({ dato: stillingsData.stilling.published, visning: 'tall' }) : '-'}`}
        />
        <Definisjon
          tittel='Siste visning'
          innhold={`${stillingsData.stilling.expires ? formaterNorskDato({ dato: stillingsData.stilling.expires, visning: 'tall' }) : '-'}`}
        />
        <Definisjon
          tittel='Sist endret'
          innhold={`${stillingsData.stilling.updated ? formaterNorskDato({ dato: stillingsData.stilling.updated, visning: 'tall' }) : '-'}`}
        />
        <Definisjon
          tittel='Kontaktperson hos Nav'
          innhold={`${stillingsData.stilling.administration?.reportee ?? '-'} ${stillingsData.stillingsinfo?.eierNavident ? `(${stillingsData.stillingsinfo.eierNavident})` : ''}`}
        />
      </div>
    </Box>
  );
}
