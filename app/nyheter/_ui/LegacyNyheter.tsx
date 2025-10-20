import { nyheter } from '@/app/nyheter';
import VisEditorTekst from '@/components/rikteksteditor/VisEditorTekst';
import { formaterNorskDato } from '@/util/util';
import { BodyShort, Box } from '@navikt/ds-react';

export default function LegacyNyheter() {
  return (
    <div>
      {nyheter.map((nyhet, index) => (
        <Box.New
          key={index}
          className='@container/kandidatlistekort contain-layout mb-4 flex flex-col p-4 min-w-fit'
          background='neutral-softA'
          borderRadius='xlarge'
          data-testid='stillings-kort'
        >
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold flex gap-2'>{nyhet.tittel}</h1>
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
