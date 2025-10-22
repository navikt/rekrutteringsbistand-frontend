'use client';

import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { ArrowLeftIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const FinnKandidaterForRekrutteringstreff: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
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
        <KandidatSøkMarkerteContextProvider>
          <SideLayout
            header={
              <PanelHeader>
                <PanelHeader.Section
                  skjulBrødsmuler
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
          >
            <KandidatTilRekrutteringstreff />
          </SideLayout>
        </KandidatSøkMarkerteContextProvider>
      </KandidatSøkProvider>
    </TilgangskontrollForInnhold>
  );
};

export default FinnKandidaterForRekrutteringstreff;
