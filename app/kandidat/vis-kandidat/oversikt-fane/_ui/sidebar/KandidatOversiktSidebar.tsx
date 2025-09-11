import Profilkvalitet from './Profilkvalitet';
import GråBoks from '@/app/kandidat/vis-kandidat/oversikt-fane/_ui/GråBoks';

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
