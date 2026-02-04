import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import KandidatSideLayout from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatsideLayout';
import KandidatOversikt from '@/app/kandidat/[kandidatNr]/vis-kandidat/oversikt-fane/KandidatOversikt';
import { NavigerTilAktivitetsplanenMedContext } from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import { usePersonTreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/PersonTreffContext';
import { useNullableRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';

export default function VisPerson() {
  const personContext = usePersonTreffContext();
  const treffData = useNullableRekrutteringstreffContext();

  const kandidatInfo = personContext.kandidatnummer ? (
    <KandidatContextProvider kandidatId={personContext.kandidatnummer}>
      <KandidatSideLayout>
        <div className='@container/kandidat-knapper contain-layout'>
          <div className='my-4'>
            <NavigerTilAktivitetsplanenMedContext />
          </div>
        </div>
      </KandidatSideLayout>
      <KandidatOversikt />
    </KandidatContextProvider>
  ) : (
    <div>Kunne ikke finne kandidatinfo</div>
  );

  return (
    <SideLayout
      header={
        <PanelHeader
          fullskjermUrl={
            treffData && personContext.personTreffId
              ? `/rekrutteringstreff/${treffData?.rekrutteringstreffId}/person/${personContext.personTreffId}`
              : `/kandidat/${personContext.kandidatnummer}`
          }
        >
          <PanelHeader.Section />
        </PanelHeader>
      }
    >
      <SideInnhold>{kandidatInfo}</SideInnhold>
    </SideLayout>
  );
}
