import { useKandidatContext } from '../KandidatContext';
import KandidatBeskrivelse from './components/KandidatBeskrivelse';
import KandidatErfaring from './components/KandidatErfaring';
import KandidatFørerkort from './components/KandidatFørerkort';
import KandidatGodkjenninger from './components/KandidatGodkjenninger';
import KandidatKompetanse from './components/KandidatKompetanse';
import KandidatKurs from './components/KandidatKurs';
import KandidatSpråk from './components/KandidatSpråk';
import KandidatUtdanning from './components/KandidatUtdanning';
import KandidatØnsker from './components/KandidatØnsker';
import KandidatOversiktSidebar from './components/sidebar/KandidatOversiktSidebar';
import * as React from 'react';

const KandidatOversikt: React.FC = () => {
  const { kandidatData } = useKandidatContext();

  return (
    <div className='mt-10 lg:flex'>
      <div className='flex-grow'>
        <div className='grid gap-x-[3.5rem] gap-y-8 md:flex-row'>
          <KandidatØnsker />
          <KandidatBeskrivelse kandidatSammendrag={kandidatData.beskrivelse} />
          <KandidatUtdanning />
          <KandidatErfaring />
        </div>
        <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
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
