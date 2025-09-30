'use client';

import KandidatTilRekrutteringstreff from './KandidatTilRekrutteringstreff';
import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const FinnKandidaterForRekrutteringstreff: FC = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { watch } = useFormContext<{ tittel?: string }>();

  const tittel = watch('tittel');
  const rekrutteringstreffNavn =
    typeof tittel === 'string' && tittel.trim().length > 0
      ? tittel.trim()
      : 'Rekrutteringstreff';

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
                  actionsLeft={
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href='/rekrutteringstreff'>
                              Rekrutteringstreff
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link
                              href={`/rekrutteringstreff/${rekrutteringstreffId}`}
                            >
                              {rekrutteringstreffNavn}
                            </Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Legg til jobbsøker</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
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
