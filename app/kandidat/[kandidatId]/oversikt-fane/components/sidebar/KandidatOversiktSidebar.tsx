import GråBoks from '../GråBoks';
import ForslagTilStilling from './ForslagTilStilling';
import Profilkvalitet from './Profilkvalitet';
import SisteAktivitet from './SisteAktivitet';
import * as React from 'react';

const KandidatOversiktSidebar: React.FC = () => {
  //TODO Forslag til stillinger setter lang queryaram
  return (
    <div className='lg:ml-8 flex lg:w-[25rem] flex-shrink-0 lg:flex-col gap-4 flex-row mt-4 lg:mt-0'>
      <GråBoks tittel='Profilkvalitet'>
        <Profilkvalitet />
      </GråBoks>
      <GråBoks tittel='Siste aktivitet'>
        <SisteAktivitet />
      </GråBoks>

      <GråBoks tittel='Forslag til stillinger'>
        <ForslagTilStilling />
      </GråBoks>
    </div>
  );
};

export default KandidatOversiktSidebar;
