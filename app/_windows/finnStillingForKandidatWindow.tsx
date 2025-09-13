'use client';

import { UrlWindowConfig } from './useUrlWindow';
import StillingsSøk from '@/app/stilling/StillingsSøk';
import PanelHeader from '@/components/layout/PanelHeader';
import SideLayout from '@/components/layout/SideLayout';
import { usePathname } from 'next/navigation';
import { createElement } from 'react';

/**
 * Vindu for "Finn stillinger for kandidat".
 * URL-param: ?finnStilling=<valgfri indikator>
 * Kandidatnummer hentes fra query-param `visKandidatnr` via hook `useVisKandidatNr()`.
 * Innholdet oppdateres dynamisk når kandidatnummer endres.
 */
export const finnStillingForKandidatWindow: UrlWindowConfig = {
  urlParam: 'finnStilling',
  windowId: 'finnStillingForKandidat',
  title: 'Finn stillinger for kandidat',
  createContent: () => {
    // Inline komponent for å kunne bruke Next.js hooks
    const Wrapper = () => {
      const pathname = usePathname();
      // Eksempel path: /kandidat/kandidat-arenaKandidatnr-2
      // Vi plukker siste segment og stripper prefiks 'kandidat-' hvis det finnes
      const kandidatNr = (() => {
        if (!pathname) return null;
        const segments = pathname.split('/').filter(Boolean);
        const last = segments[segments.length - 1];
        if (!last) return null;
        if (last.startsWith('kandidat-')) {
          return last.substring('kandidat-'.length) || null;
        }
        return null;
      })();

      if (!kandidatNr) {
        return (
          <div className='p-4 text-sm text-gray-600'>
            Fant ikke kandidatnummer i URL.
          </div>
        );
      }

      return (
        <SideLayout
          header={
            <PanelHeader>
              <PanelHeader.Section title={'Finn stilling for kandidat'} />
            </PanelHeader>
          }
        >
          <StillingsSøk
            key={`stilling-${kandidatNr}`}
            forKandidatNr={kandidatNr}
          />
        </SideLayout>
      );
    };

    return createElement(Wrapper, { key: 'finnStilling-wrapper' });
  },
};
