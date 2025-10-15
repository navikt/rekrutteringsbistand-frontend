import { KandidatContextProvider } from '@/app/kandidat/vis-kandidat/KandidatContext';
import KandidatSideLayout from '@/app/kandidat/vis-kandidat/KandidatsideLayout';
import KandidatAktivitet from '@/app/kandidat/vis-kandidat/aktivitet-fane/KandidatAktivitet';
import KandidatOversikt from '@/app/kandidat/vis-kandidat/oversikt-fane/KandidatOversikt';
import KandidatVisningSidebar from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatVisningSidebar/KandidatVisningSidebar';
import { Box, Tabs } from '@navikt/ds-react';

enum Fane {
  OVERSIKT = 'oversikt',
  AKTIVITET = 'aktivitet',
}

export interface KandidatVisningForModalProps {
  forKandidatliste?: string;
  kandidatId: string;
}

export default function KandidatVisningForModal({
  forKandidatliste,
  kandidatId,
}: KandidatVisningForModalProps) {
  const kandidatlisteVisning = forKandidatliste ? (
    <Box.New background='default' padding='4' borderRadius='large'>
      <KandidatVisningSidebar kandidatnr={kandidatId} />
    </Box.New>
  ) : null;

  return (
    <KandidatContextProvider kandidatId={kandidatId}>
      <Tabs defaultValue={Fane.OVERSIKT} className=' w-full'>
        {forKandidatliste && kandidatlisteVisning}
        <div className='mb-4'>
          <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
          <Tabs.Tab value={Fane.AKTIVITET} label='Aktiviteter' />
        </div>
        <Tabs.Panel value={Fane.OVERSIKT}>
          <KandidatSideLayout />
          <KandidatOversikt />
        </Tabs.Panel>
        <Tabs.Panel value={Fane.AKTIVITET}>
          <div className='w-full'>
            <KandidatAktivitet />
          </div>
        </Tabs.Panel>
      </Tabs>
    </KandidatContextProvider>
  );
}
