import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSidePage from '@/app/stilling/[stillingsId]/page';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { useQueryState } from 'nuqs';
import * as React from 'react';
import { useEffect, useRef } from 'react';

const WindowVisStilling: React.FC = ({}) => {
  const [visStillingId, setVisStillingId] = useQueryState('visStillingId', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const printRef = useRef<HTMLDivElement>(null);
  const { addWindow } = useWindows();

  useEffect(() => {
    if (visStillingId) {
      addWindow({
        id: 'visStillingId',
        onClose: () => setVisStillingId(''),
        content: (
          <StillingsContextProvider stillingsId={visStillingId}>
            <StillingsSidePage />
          </StillingsContextProvider>
        ),
      });
    }
  }, [visStillingId, addWindow, setVisStillingId]);

  return null;
};

export default WindowVisStilling;
