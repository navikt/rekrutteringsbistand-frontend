import SynlighetsEvaluering from './SynlighetsEvaluering';
import { BodyShort, Box, Button } from '@navikt/ds-react';
import * as React from 'react';

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
          <BodyShort className='mb-2 font-bold'>
            Årsaken kan være en eller flere av disse:
          </BodyShort>
          <ol className='list-decimal space-y-2 pl-6'>
            <li>
              Personbruker mangler CV. Minimum innhold er ett yrkesønske og ett
              geografisk sted person ønsker å jobbe.
            </li>
            <li>
              Personbruker har ikke blitt informert om Navs behandlingsgrunnlag
              for deling av CV.
            </li>
            <li>
              Personbruker har ikke valgt «Del CV». Dette kravet opptrer kun i
              overgangs-tilfeller hvor personbruker kommer under oppfølging av
              Nav med en CV som hen har fra en tidligere oppfølgingsperiode,
              eller med en CV som ble opprettet før hen kom under oppfølging av
              Nav.
            </li>
            <li>Personbruker må være i Navs Arbeidssøkerregister.</li>
            <li>Personbruker har status «Egen ansatt».</li>
            <li>
              Personbruker har adresseskjerming (kode 6 og 7 eller strengt
              fortrolig utland §19).
            </li>
            <li>
              Personbruker er deltager i kommunalt kvalifiseringsprogram (KVP)
            </li>
          </ol>
          <Button
            className='mt-4'
            onClick={() => setVisSynlighetsEvaluering(true)}
            variant='secondary'
          >
            Se hvorfor kandidaten ikke er synlig (punkt 1-4)
          </Button>
        </div>
      )}
    </Box.New>
  );
};

export default Synlighetsinfo;
