import * as React from 'react';
import GråRamme from '../GråRamme';
import ForslagTilStilling from './ForslagTilStilling';
import Profilkvalitet from './Profilkvalitet';
import SisteAktivitet from './SisteAktivitet';

const KandidatOversiktSidebar: React.FC = () => {
  return (
    <div className='ml-8 w-[25rem] flex-shrink-0 flex flex-col gap-8'>
      <GråRamme tittel='Profilkvalitet'>
        <Profilkvalitet />
      </GråRamme>
      <GråRamme tittel='Siste aktivitet'>
        <SisteAktivitet />
      </GråRamme>
      <GråRamme tittel='Forslag til stillinger'>
        <ForslagTilStilling />
      </GråRamme>
    </div>
  );
};

export default KandidatOversiktSidebar;
