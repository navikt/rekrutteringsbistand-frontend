import { StillingsContextProvider } from '@/app/stilling/[stillingsId]/StillingsContext';
import StillingsSide from '@/app/stilling/[stillingsId]/StillingsSide';
import StillingSideLayout from '@/app/stilling/[stillingsId]/StillingssideLayout';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { useQueryState } from 'nuqs';
import * as React from 'react';

const WindowVisStilling: React.FC = ({}) => {
  const [visStillingId, setVisStillingId] = useQueryState('visStillingId', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const { addWindow } = useWindows();

  React.useEffect(() => {
    if (visStillingId) {
      addWindow({
        id: 'visStillingId',
        onClose: () => setVisStillingId(''),
        content: (
          <StillingsContextProvider stillingsId={visStillingId}>
            <StillingSideLayout>
              <StillingsSide />
            </StillingSideLayout>
          </StillingsContextProvider>
        ),
      });
    }
  }, [visStillingId]);

  return null;
};

export default WindowVisStilling;
