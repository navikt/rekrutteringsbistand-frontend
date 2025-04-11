import GråBoks from '../GråBoks';
import ForslagTilStilling from './ForslagTilStilling';
import Profilkvalitet from './Profilkvalitet';
import SisteAktivitet from './SisteAktivitet';
import * as React from 'react';

export interface KandidatOversiktSidebarProps {
  sidebar?: boolean;
}

const KandidatOversiktSidebar: React.FC<KandidatOversiktSidebarProps> = ({
  sidebar,
}) => {
  return (
    <div
      className={
        sidebar
          ? 'flex flex-col gap-4 mt-4'
          : 'lg:ml-8 flex lg:w-[25rem] flex-shrink-0 lg:flex-col gap-4 flex-row mt-4 lg:mt-0'
      }
    >
      <GråBoks tittel='Profilkvalitet'>
        <Profilkvalitet />
      </GråBoks>
      <GråBoks tittel='Siste aktivitet'>
        <SisteAktivitet />
      </GråBoks>

      {!sidebar && (
        <GråBoks tittel='Forslag til stillinger'>
          <ForslagTilStilling />
        </GråBoks>
      )}
    </div>
  );
};

export default KandidatOversiktSidebar;
