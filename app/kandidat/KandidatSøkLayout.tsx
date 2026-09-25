import KandidatSøkResultat from '@/app/kandidat/KandidatSøkResultat';
import KandidatSøkFilter from '@/app/kandidat/kandidat-søk-filter/KandidatSøkFilter';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';

export interface KandidatSøkLayoutProps {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
  tillatMasseutvalg?: boolean;
}

export default function KandidatSøkLayout({
  stillingsId,
  rekrutteringstreffId,
  alleredeLagtTilTreff,
  alleredeLagtTilKandidatliste,
  tillatMasseutvalg,
}: KandidatSøkLayoutProps) {
  return (
    <SideLayout
      venstrePanel
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
        <div className='@container/kandidatsøk flex contain-layout'>
          <div className='min-w-0 flex-grow'>
            <KandidatSøkResultat
              alleredeLagtTilTreff={alleredeLagtTilTreff}
              alleredeLagtTilKandidatliste={alleredeLagtTilKandidatliste}
              stillingsId={stillingsId}
              rekrutteringstreffId={rekrutteringstreffId}
              tillatMasseutvalg={tillatMasseutvalg}
            />
          </div>
        </div>
      </SideInnhold>
    </SideLayout>
  );
}
