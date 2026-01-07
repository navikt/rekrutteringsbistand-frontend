import SynlighetsEvaluering from './SynlighetsEvaluering';
import { BodyLong, BodyShort, Box, Button } from '@navikt/ds-react';
import { useState } from 'react';

export interface SynlighetsinfoProps {
  fødselsnummer: string;
}

const Synlighetsinfo: React.FC<SynlighetsinfoProps> = ({ fødselsnummer }) => {
  const [visSynlighetsEvaluering, setVisSynlighetsEvaluering] =
    useState<boolean>(false);

  return (
    <Box.New paddingInline='space-16' paddingBlock='space-12'>
      {visSynlighetsEvaluering ? (
        <SynlighetsEvaluering fødselsnummer={fødselsnummer} />
      ) : (
        <div>
          <div className='py-2'>
            <BodyShort className='mb-2 font-bold'>
              Betingelser for at CV blir tilgjengelig i Rekrutteringsbistand
            </BodyShort>
            <BodyLong>
              Det er tre krav som alle må være positive (1-3), mens de siste tre
              (4-6) er motsatt at de ekskluderer de personbrukere som
              kjennetegnes ved dem.
            </BodyLong>
          </div>
          <ol className='list-decimal space-y-2 pl-6'>
            <li>
              Personbruker må ha en CV, hvis ikke er det ikke noen CV å søke
              frem.
            </li>
            <li>
              Personbruker må ha blitt informert om hvordan Nav behandler
              personopplysninger i CV.
            </li>
            <li>Personbruker må være i Navs Arbeidssøkerregister.</li>
            <li>Personbruker kan ikke ha status &quot;Egen ansatt&quot;.</li>
            <li>
              Personbruker kan ikke ha adresseskjerming (kode 6 eller 7, eller
              strengt fortrolig utland §19).
            </li>
            <li>
              Personbruker kan ikke være deltager i kommunalt
              kvalifiseringsprogram (KVP).
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
