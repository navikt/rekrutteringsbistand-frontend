import KandidatSøkResultat from '@/app/kandidat/KandidatSøkResultat';
import KandidatSøkTabs from '@/app/kandidat/KandidatSøkTabs';
import KandidatSøkChips from '@/app/kandidat/_ui/KandidatSøkChips';
import Arbeidserfaring from '@/app/kandidat/kandidat-søk-filter/_ui/Arbeidserfaring';
import Arbeidsønsker from '@/app/kandidat/kandidat-søk-filter/_ui/Arbeidsønsker';
import FritekstSøk from '@/app/kandidat/kandidat-søk-filter/_ui/FritekstSøk';
import Førerkort from '@/app/kandidat/kandidat-søk-filter/_ui/Førerkort';
import Hovedmål from '@/app/kandidat/kandidat-søk-filter/_ui/Hovedmål';
import Innsatsgrupper from '@/app/kandidat/kandidat-søk-filter/_ui/Innsatsgrupper';
import KandidatStedSøk from '@/app/kandidat/kandidat-søk-filter/_ui/KandidatStedSøk';
import Kompetanse from '@/app/kandidat/kandidat-søk-filter/_ui/Kompetanse';
import PrioriterteMålgrupper from '@/app/kandidat/kandidat-søk-filter/_ui/PrioriterteMålgrupper';
import Språk from '@/app/kandidat/kandidat-søk-filter/_ui/Språk';
import Utdanningsnivå from '@/app/kandidat/kandidat-søk-filter/_ui/Utdanningsnivå';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';

export interface KandidatSøkLayoutProps {
  stillingsId?: string;
  rekrutteringstreffId?: string;
  alleredeLagtTilTreff?: string[];
  alleredeLagtTilKandidatliste?: string[];
}

export const KandidatSøkSidebar = (
  <div className='flex flex-col gap-4 '>
    <FritekstSøk />
    <Arbeidsønsker />
    <KandidatStedSøk />
    <Kompetanse />
    <Førerkort />
    <Språk />
    <Arbeidserfaring />
    <Hovedmål />
    <Utdanningsnivå />
    <PrioriterteMålgrupper />
    <Innsatsgrupper />
  </div>
);

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
      sidepanel={KandidatSøkSidebar}
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
