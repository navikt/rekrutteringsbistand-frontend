import GråBoks from '../GråBoks';
import Profilkvalitet from './Profilkvalitet';
import * as React from 'react';

const KandidatOversiktSidebar: React.FC = ({}) => {
  return (
    <div className={'flex flex-col gap-4 mt-4'}>
      <GråBoks tittel='Profilkvalitet'>
        <Profilkvalitet />
      </GråBoks>
    </div>
  );
};

export default KandidatOversiktSidebar;
