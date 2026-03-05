'use client';

import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import KandidatSøkFilter from '@/app/kandidat/kandidat-søk-filter/KandidatSøkFilter';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideInnhold from '@/components/layout/SideInnhold';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const FinnKandidaterForRekrutteringstreff: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: treff } = useRekrutteringstreff(rekrutteringstreffId);
  const router = useRouter();

  const goBack = () =>
    router.push(
      `/rekrutteringstreff/${rekrutteringstreffId}?visFane=jobbsøkere`,
    );

  return (
    <TilgangskontrollForInnhold
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
      ]}
    >
      <KandidatSøkProvider>
        <SideLayout
          header={
            <PanelHeader>
              <PanelHeader.Section
                erstattPath={[
                  rekrutteringstreffId,
                  treff?.tittel || rekrutteringstreffId,
                ]}
                title={
                  <div className='flex items-center'>
                    <Button
                      variant='tertiary'
                      size='small'
                      onClick={goBack}
                      aria-label='Tilbake'
                      className='!px-0'
                      icon={
                        <ArrowLeftIcon
                          aria-hidden
                          className='text-[var(--ax-text-action)]'
                        />
                      }
                    />
                    <span
                      aria-hidden
                      className='mr-3 ml-1 h-4 w-px bg-[var(--ax-border-accent-subtle)]'
                    />
                    <span className='text-text-default font-medium'>
                      Finn og legg til jobbsøkere på oppdraget
                    </span>
                  </div>
                }
              ></PanelHeader.Section>
            </PanelHeader>
          }
          sidepanelBredde='250px'
          sidepanelTittel='Filtrer'
          sidepanel={<KandidatSøkFilter />}
          venstrePanel
        >
          <SideInnhold>
            <KandidatTilRekrutteringstreff />
          </SideInnhold>
        </SideLayout>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default FinnKandidaterForRekrutteringstreff;
