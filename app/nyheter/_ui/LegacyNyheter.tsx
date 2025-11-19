import { nyheter } from '@/app/nyheter';
import VisEditorTekst from '@/components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '@/util/dato';
import { BodyShort, Box } from '@navikt/ds-react';

export default function LegacyNyheter() {
  return (
    <div>
      {nyheter.map((nyhet, index) => (
        <Box.New
          key={index}
          className='@container/kandidatlistekort mb-4 flex min-w-fit flex-col p-4 contain-layout'
          background='neutral-softA'
          borderRadius='xlarge'
          data-testid='stillings-kort'
        >
          <div className='flex justify-between'>
            <h1 className='flex gap-2 text-2xl font-bold'>{nyhet.tittel}</h1>
          </div>
          <BodyShort>{formaterNorskDato({ dato: nyhet.dato })}</BodyShort>
          <div className='my-8'>
            <VisEditorTekst htmlTekst={nyhet.beskrivelse} />
          </div>
        </Box.New>
      ))}
    </div>
  );
}
