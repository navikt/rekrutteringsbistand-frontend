import StillingsSøk from '@/app/stilling/StillingsSøk';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { useWindows } from '@/components/layout/windows/WindowWrapper';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useEffect } from 'react';

export interface WindowFinnStillingForKandidatProps {
  kandidatNr: string;
}

const WindowFinnStillingForKandidat: React.FC<
  WindowFinnStillingForKandidatProps
> = ({ kandidatNr }) => {
  const { addWindow } = useWindows();
  const [finnStilling, setFinnStilling] = useQueryState(
    'finnStilling',
    parseAsBoolean.withDefault(false),
  );

  useEffect(() => {
    if (kandidatNr && finnStilling) {
      addWindow({
        id: 'visKandidatNr',
        onClose: () => setFinnStilling(false),
        content: (
          <SideLayout
            header={
              <PanelHeader>
                <PanelHeader.Section title={'Finn stilling for kandidat'} />
              </PanelHeader>
            }
          >
            <StillingsSøk
              key={`stilling-${kandidatNr}`}
              forKandidatNr={kandidatNr}
            />
          </SideLayout>
        ),
      });
    }
  }, [finnStilling, kandidatNr, addWindow, setFinnStilling]);

  return null;
};

export default WindowFinnStillingForKandidat;
