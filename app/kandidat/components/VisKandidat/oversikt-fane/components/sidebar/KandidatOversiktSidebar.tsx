import GråBoks from '../GråBoks';
import Profilkvalitet from './Profilkvalitet';
import SisteAktivitet from './SisteAktivitet';
import * as React from 'react';

const KandidatOversiktSidebar: React.FC = ({}) => {
  return (
    <div className={'flex flex-col gap-4 mt-4'}>
      <GråBoks tittel='Profilkvalitet'>
        <Profilkvalitet />
      </GråBoks>
      <GråBoks tittel='Siste aktivitet'>
        <SisteAktivitet />
      </GråBoks>

      {/* <GråBoks tittel='Forslag til stillinger'>
          <ForslagTilStilling />
        </GråBoks> */}
    </div>
  );
};

export default KandidatOversiktSidebar;
