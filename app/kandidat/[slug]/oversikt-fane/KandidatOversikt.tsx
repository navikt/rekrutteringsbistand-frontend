import * as React from 'react';
import KandidatErfaring from './components/KandidatErfaring';
import KandidatUtdanning from './components/KandidatUtdanning';
import KandidatØnsker from './components/KandidatØnsker';

export interface KandidatOversiktProps {
  children?: React.ReactNode | undefined;
}

const KandidatOversikt: React.FC<KandidatOversiktProps> = ({ children }) => {
  return (
    <div className='mt-10'>
      <div className='grid gap-y-8 gap-x-[3.5rem] md:flex-row'>
        <KandidatØnsker />
        <KandidatUtdanning />
        <KandidatErfaring />
      </div>
    </div>
  );
};

export default KandidatOversikt;
