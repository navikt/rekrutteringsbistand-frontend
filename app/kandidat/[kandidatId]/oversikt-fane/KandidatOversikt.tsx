import * as React from 'react';
import { useKandidatContext } from '../KandidatContext';
import KandidatErfaring from './components/KandidatErfaring';
import KandidatFørerkort from './components/KandidatFørerkort';
import KandidatGodkjenninger from './components/KandidatGodkjenninger';
import KandidatKompetanse from './components/KandidatKompetanse';
import KandidatKurs from './components/KandidatKurs';
import KandidatSpråk from './components/KandidatSpråk';
import KandidatUtdanning from './components/KandidatUtdanning';
import KandidatØnsker from './components/KandidatØnsker';
import KandidatOversiktSidebar from './KandidatOversiktSidebar';

export interface KandidatOversiktProps {
  children?: React.ReactNode | undefined;
}

const KandidatOversikt: React.FC<KandidatOversiktProps> = ({ children }) => {
  const { kandidatData } = useKandidatContext();
  return (
    <div className='mt-10 flex'>
      <div className='flex-grow'>
        <div className='grid gap-y-8 gap-x-[3.5rem] md:flex-row'>
          <KandidatØnsker />
          <KandidatUtdanning />
          <KandidatErfaring />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
          <KandidatSpråk språk={kandidatData?.sprak} />
          <KandidatGodkjenninger
            godkjenninger={kandidatData?.godkjenninger}
            sertifikatObj={kandidatData?.sertifikatObj}
          />
          <KandidatFørerkort førerkort={kandidatData?.forerkort} />
          <KandidatKompetanse kompetanse={kandidatData?.kompetanseObj} />
          <KandidatKurs kurs={kandidatData?.kursObj} />
        </div>
      </div>

      <KandidatOversiktSidebar />
    </div>
  );
};

export default KandidatOversikt;
