import { useKandidatContext } from '../KandidatContext';
import GråBoks from './components/GråBoks';
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
import Profilkvalitet from './components/sidebar/Profilkvalitet';
import * as React from 'react';

export interface KandidatOversiktProps {
  sidebar?: boolean;
}

const KandidatOversikt: React.FC<KandidatOversiktProps> = ({ sidebar }) => {
  const { kandidatData } = useKandidatContext();

  console.log('🎺 kandidatData', kandidatData);
  return (
    <div className={`mt-10   ${sidebar ? '' : 'flex'}`}>
      <div className='flex-grow'>
        <div
          className={`grid gap-x-[3.5rem] gap-y-8 md:flex-row  ${sidebar ? 'flex-row' : ''}`}
        >
          <GråBoks className={sidebar ? '' : 'hidden'} tittel='Profilkvalitet'>
            <Profilkvalitet />
          </GråBoks>
          <KandidatØnsker />
          <KandidatBeskrivelse kandidatSammendrag={kandidatData.beskrivelse}/>
          <KandidatUtdanning />
          <KandidatErfaring />
        </div>
        <div
          className={`mt-8 grid grid-cols-1 gap-4 ${sidebar ? 'grid-cols-1' : 'md:grid-cols-2'}`}
        >
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

      <KandidatOversiktSidebar sidebar={sidebar} />
    </div>
  );
};

export default KandidatOversikt;
