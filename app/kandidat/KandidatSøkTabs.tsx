'use client';

import {
  KandidatSøkPortefølje,
  useKandidatSøkFilterContext,
} from './KandidaSokFilterContext';
import ValgteKontorer from './_ui/ValgteKontorer';
import AlleKontorer from '@/app/kandidat/_ui/tabs/AlleKontorer';
import MineBrukere from '@/app/kandidat/_ui/tabs/MineBrukere';
import MineKontorer from '@/app/kandidat/_ui/tabs/MineKontorer';
import MittKontor from '@/app/kandidat/_ui/tabs/MittKontor';
import VelgKontor from '@/app/kandidat/_ui/tabs/VelgKontor';
import { SidepanelTrigger } from '@/components/layout/SidepanelTrigger';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import { FilterIcon } from '@navikt/aksel-icons';

export default function KandidatSøkTabs() {
  const { portefølje } = useKandidatSøkFilterContext();
  return (
    <div>
      {/*Trenger denne div-en for å løse z-index problemer tilknyttet container og combobox*/}
      <div className='@container contain-layout'>
        <div className='flex flex-col justify-between gap-3 @3xl:flex-row @3xl:gap-0'>
          <div className='flex items-center gap-2'>
            <AlleKontorer />
            <MineBrukere />
            <MittKontor />
            <MineKontorer />
            <TilgangskontrollForInnhold
              skjulVarsel
              kreverEnAvRollene={[
                Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
              ]}
            >
              <VelgKontor />
            </TilgangskontrollForInnhold>
            <div className='ml-auto'>
              <SidepanelTrigger icon={<FilterIcon />}>Filtrer</SidepanelTrigger>
            </div>
          </div>
        </div>
      </div>
      {portefølje === KandidatSøkPortefølje.VALGTE_KONTORER && (
        <ValgteKontorer />
      )}
    </div>
  );
}
