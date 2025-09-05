import FinnKandidaterForStilling from './FinnKandidaterForStilling';
import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useEffect } from 'react';

export interface WindowFinnKandidaterProps {
  stillingsId: string;
}

const WindowFinnKandidater: React.FC<WindowFinnKandidaterProps> = ({
  stillingsId,
}) => {
  const { addWindow, removeWindow } = useWindows();

  // nuqs boolean query param: ?finnKandidater=true
  const [finnKandidater, setFinnKandidater] = useQueryState(
    'finnKandidater',
    parseAsBoolean.withDefault(false),
  );

  useEffect(() => {
    if (finnKandidater) {
      addWindow({
        id: 'finnKandidater',
        onClose: () => setFinnKandidater(false),
        // Hvis window-systemet bruker render-funksjon / element:
        content: (
          <StillingsContextProvider stillingsId={stillingsId}>
            <FinnKandidaterForStilling />
          </StillingsContextProvider>
        ),
      });
    }
  }, [finnKandidater, addWindow, removeWindow, setFinnKandidater, stillingsId]);

  return null;
};

export default WindowFinnKandidater;
