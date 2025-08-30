import VisKandidat from '@/app/kandidat/vis-kandidat/VisKandidat';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useEffect } from 'react';

const WindowVisKandidat: React.FC = () => {
  const { addWindow } = useWindows();
  const [visKandidatnr, setVisKandidatnr] = useQueryState('visKandidatnr', {
    defaultValue: '',
    clearOnDefault: true,
  });

  useEffect(() => {
    if (visKandidatnr) {
      addWindow({
        id: 'visKandidatNr',
        onClose: () => setVisKandidatnr(''),
        content: <VisKandidat kandidatnr={visKandidatnr} />,
      });
    }
  }, [visKandidatnr, addWindow, setVisKandidatnr]);

  return null;
};

export default WindowVisKandidat;
