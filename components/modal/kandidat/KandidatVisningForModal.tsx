import { KandidatContextProvider } from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatContext';
import KandidatSideLayout from '@/app/kandidat/[kandidatNr]/vis-kandidat/KandidatsideLayout';
import KandidatAktivitet from '@/app/kandidat/[kandidatNr]/vis-kandidat/aktivitet-fane/KandidatAktivitet';
import KandidatOversikt from '@/app/kandidat/[kandidatNr]/vis-kandidat/oversikt-fane/KandidatOversikt';
import FinnStillingForKandidatKnapp from '@/app/kandidat/_ui/ActionLinks/FinnStillingForKandidatKnapp';
import { NavigerTilAktivitetsplanenMedContext } from '@/app/kandidat/_ui/ActionLinks/NavigerTilAktivitetsplanenKnapp';
import KandidatVisningSidebar from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatIKandidatliste/KandidatIKandidatliste';
import { Box, Button, Tabs } from '@navikt/ds-react';
import { ArrowRightIcon } from 'lucide-react';

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
    <Box background='default' padding='space-16' borderRadius='8'>
      <KandidatVisningSidebar kandidatlisteKandidat={kandidatId} />
    </Box>
  ) : null;

  return (
    <KandidatContextProvider kandidatId={kandidatId}>
      {kandidatlisteVisning}
      <Tabs defaultValue={Fane.OVERSIKT} className='w-full'>
        <div className='flex items-center justify-between'>
          <div>
            <Tabs.Tab value={Fane.OVERSIKT} label='Oversikt' />
            <Tabs.Tab value={Fane.AKTIVITET} label='Aktiviteter' />
          </div>
          <Button
            as='a'
            size='small'
            href={`/kandidat/${kandidatId}`}
            icon={<ArrowRightIcon />}
          >
            Gå til kandidat
          </Button>
        </div>

        <Tabs.Panel value={Fane.OVERSIKT}>
          <KandidatSideLayout>
            <div className='@container/kandidat-knapper'>
              <div className='mb-6 grid grid-cols-1 gap-4 @3xl:grid-cols-2'>
                <FinnStillingForKandidatKnapp />
                <NavigerTilAktivitetsplanenMedContext />
              </div>
            </div>
          </KandidatSideLayout>
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
