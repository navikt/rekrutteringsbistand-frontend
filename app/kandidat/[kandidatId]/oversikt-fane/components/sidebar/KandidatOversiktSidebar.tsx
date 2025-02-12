import * as React from 'react';
import GråRamme from '../GråRamme';
import Profilkvalitet from './Profilkvalitet';
import SisteAktivitet from './SisteAktivitet';

const KandidatOversiktSidebar: React.FC = () => {
  //TODO Forslag til stillinger setter lang queryaram
  return (
    <div className='ml-8 w-[25rem] flex-shrink-0 flex flex-col gap-4'>
      <GråRamme tittel='Profilkvalitet'>
        <Profilkvalitet />
      </GråRamme>
      <GråRamme tittel='Siste aktivitet'>
        <SisteAktivitet />
      </GråRamme>

      {/* <GråRamme tittel='Forslag til stillinger'>
        <ForslagTilStilling />
      </GråRamme> */}
    </div>
  );
};

export default KandidatOversiktSidebar;
