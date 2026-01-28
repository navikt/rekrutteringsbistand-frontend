import VisJobbsøker from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import { usePersonTreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/PersonTreffContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';

export default function VisPerson() {
  const personContext = usePersonTreffContext();

  const kandidatInfo = personContext.kandidatnummer ? (
    <VisJobbsøker kandidatId={personContext.kandidatnummer} />
  ) : (
    <div>Kunne ikke finne kandidatinfo</div>
  );

  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section />
        </PanelHeader>
      }
    >
      <SideInnhold>{kandidatInfo}</SideInnhold>
    </SideLayout>
  );
}
