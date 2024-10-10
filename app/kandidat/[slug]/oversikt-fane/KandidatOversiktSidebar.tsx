import { Button, Heading } from '@navikt/ds-react';
import * as React from 'react';
import GråRamme from './components/GråRamme';

export interface KandidatOversiktSidebarProps {
  children?: React.ReactNode | undefined;
}

const KandidatOversiktSidebar: React.FC<KandidatOversiktSidebarProps> = ({
  children,
}) => {
  return (
    <div className='ml-8 w-[25rem] flex-shrink-0 flex flex-col gap-8'>
      <GråRamme tittel='Profilkvalitet'></GråRamme>
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
  );
};

export default KandidatOversiktSidebar;
