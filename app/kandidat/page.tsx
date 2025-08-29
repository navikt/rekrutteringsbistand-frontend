import KandidatSokLayout from './KandidatSokLayout';
import KandidatSøkTabs from './KandidatSøkTabs';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { PersonTallShortIcon } from '@navikt/aksel-icons';

export default function KandidatPage() {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section
            title={'Jobbsøkere'}
            titleIcon={<PersonTallShortIcon />}
          />
        </PanelHeader>
      }
    >
      <KandidatSokLayout>
        <KandidatSøkTabs />
      </KandidatSokLayout>
    </SideLayout>
  );
}
