import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { useQueryState } from 'nuqs';
import * as React from 'react';

export interface WindowVisKandidatProps {
  position?: 'left' | 'right';
}

const WindowVisKandidat: React.FC<WindowVisKandidatProps> = ({ position }) => {
  const { addWindow } = useWindows();
  const [visKandidatnr, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  React.useEffect(() => {
    if (visKandidatnr) {
      addWindow({
        id: 'visKandidatNr',
        onClose: () => setVisKandidatnr(''),
        content: <VisKandidat kandidatnr={visKandidatnr} />,
        position: 'right',
      });
    }
  }, [visKandidatnr, addWindow]);

  return null;
};

export default WindowVisKandidat;
