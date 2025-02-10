import { BodyShort, Box, Button } from '@navikt/ds-react';
import * as React from 'react';
import SynlighetsEvaluering from './SynlighetsEvaluering';

export interface SynlighetsinfoProps {
  fødselsnummer: string;
}

const Synlighetsinfo: React.FC<SynlighetsinfoProps> = ({ fødselsnummer }) => {
  const [visSynlighetsEvaluering, setVisSynlighetsEvaluering] =
    React.useState<boolean>(false);

  return (
    <Box.New paddingInline='space-16' paddingBlock='space-12'>
      {visSynlighetsEvaluering ? (
        <SynlighetsEvaluering fødselsnummer={fødselsnummer} />
      ) : (
        <div>
          <BodyShort className='font-bold mb-2'>
            Årsaken kan være en eller flere av disse:
          </BodyShort>
          <ul className='list-disc pl-6 space-y-2'>
            <li>Kandidaten mangler CV eller jobbprofil.</li>
            <li>
              Kandidaten har ikke blitt informert om NAVs behandlingsgrunnlag
              for deling av CV.
            </li>
            <li>
              Kandidat har ikke valgt «Del CV». Kandidaten har tidligere
              registrert CV, men har siden vært ute av oppfølging. Kandidaten er
              igjen under oppfølging, men har ikke godkjent deling av CV med NAV
              i dette nye oppfølgingsløpet. Hen må logge seg inn på
              arbeidsplassen.no og velge Del CV. Husk å be bruker om å oppdatere
              CV.
            </li>
            <li>
              Kandidaten har personforholdet «Fritatt for kandidatsøk» i Arena.
            </li>
            <li>
              Kandidaten har formidlingskode «Ikke servicebehov (ISERV)» i
              Arena.
            </li>
            <li>Kandidaten har status Egen ansatt.</li>
            <li>Kandidaten har diskresjonskode (kode 6 og 7).</li>
            <li>
              Kandidaten er deltager i kommunalt kvalifiseringsprogram (KVP)
            </li>
          </ul>
          <Button
            className='mt-4'
            onClick={() => setVisSynlighetsEvaluering(true)}
            variant='secondary'
          >
            Se hvorfor kandidaten ikke er synlig (punkt 1-5)
          </Button>
        </div>
      )}
    </Box.New>
  );
};

export default Synlighetsinfo;
