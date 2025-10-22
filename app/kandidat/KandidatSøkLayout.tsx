import KandidatSøkResultat from '@/app/kandidat/KandidatSøkResultat';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import KandidatSøkChips from '@/app/kandidat/_ui/KandidatSøkChips';
import KandidatSøkFilter from '@/app/kandidat/kandidat-søk-filter/KandidatSøkFilter';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';

export interface KandidatSøkLayoutProps {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
}

export default function KandidatSøkLayout({
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTilTreff,
  alleredeLagtTilKandidatliste,
}: KandidatSøkLayoutProps) {
  return (
    <SideLayout
      header={
        <PanelHeader>
          <PanelHeader.Section />
        </PanelHeader>
      }
      sidepanelBredde='250px'
      sidepanelTittel='Filtrer'
      sidepanel={<KandidatSøkFilter />}
    >
      <SideInnhold utenScroll>
        <KandidatSøkTabs />
        <div className='@container/kandidatsøk flex contain-layout'>
          <div className='flex-grow min-w-0'>
            <KandidatSøkChips />
            <KandidatSøkResultat
              alleredeLagtTilTreff={alleredeLagtTilTreff}
              alleredeLagtTilKandidatliste={alleredeLagtTilKandidatliste}
              stillingsId={stillingsId}
              rekrutteringstreffId={rekrutteringstreffId}
            />
          </div>
        </div>
      </SideInnhold>
    </SideLayout>
  );
}
