import { nyheter } from '@/app/nyheter';
import VisEditorTekst from '@/components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '@/util/dato';
import { BodyShort, Box, Heading } from '@navikt/ds-react';

export default function LegacyNyheter() {
  return (
    <div>
      {nyheter.map((nyhet, index) => (
        <Box
          key={index}
          className='@container/kandidatlistekort mb-4 flex min-w-fit flex-col p-4 contain-layout'
          background='neutral-softA'
          borderRadius='12'
          data-testid='stillings-kort'
        >
          <div className='flex justify-between'>
            <Heading level='1' size='medium' className='flex gap-2'>
              {nyhet.tittel}
            </Heading>
          </div>
          <BodyShort>{formaterNorskDato({ dato: nyhet.dato })}</BodyShort>
          <div className='my-8'>
            <VisEditorTekst htmlTekst={nyhet.beskrivelse} />
          </div>
        </Box>
      ))}
    </div>
  );
}
