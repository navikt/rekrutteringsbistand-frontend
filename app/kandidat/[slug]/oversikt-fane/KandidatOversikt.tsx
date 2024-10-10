import { Button, Heading } from '@navikt/ds-react';
import * as React from 'react';
import GråRamme from './components/GråRamme';
import KandidatErfaring from './components/KandidatErfaring';
import KandidatUtdanning from './components/KandidatUtdanning';
import KandidatØnsker from './components/KandidatØnsker';

export interface KandidatOversiktProps {
  children?: React.ReactNode | undefined;
}

const KandidatOversikt: React.FC<KandidatOversiktProps> = ({ children }) => {
  return (
    <div className='mt-10 flex'>
      <div className='flex-grow'>
        <div className='grid gap-y-8 gap-x-[3.5rem] md:flex-row'>
          <KandidatØnsker />
          <KandidatUtdanning />
          <KandidatErfaring />
        </div>
      </div>
      <div className='ml-8 w-[25rem] flex-shrink-0 flex flex-col gap-8'>
        <GråRamme>
          <Heading size='xsmall'>Profilkvalitet</Heading>
        </GråRamme>
        <div>
          <Heading size='small'>Siste aktivitet</Heading>
          <Button className='w-full mt-2' variant='secondary'>
            Vis all aktivitet
          </Button>
        </div>
        <div>
          <Heading size='small'>Forslag til stilling</Heading>
          <Button className='w-full mt-2' variant='secondary'>
            Finn aktuelle stillinger
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KandidatOversikt;
