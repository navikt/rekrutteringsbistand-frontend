'use client';
import * as React from 'react';
import SWRLaster from '../../components/SWRLaster';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { useMinebrukere } from '../api/kandidat-sok/useMinebrukere';
import KandidatKort from './components/KandidatKort';
import Sidebar from './components/KandidatSøkSidebar';
import Piktogram from './components/icons/finn-kandidater.svg';

const KandidatSøk: React.FC = () => {
  const hook = useMinebrukere({
    orgenhet: '0321',
    fritekst: null,
    portefølje: 'minebrukere',
    valgtKontor: [],
    innsatsgruppe: [],
    side: 1,
    ønsketYrke: [],
    ønsketSted: [],
    borPåØnsketSted: null,
    kompetanse: [],
    førerkort: [],
    prioritertMålgruppe: [],
    hovedmål: [],
    utdanningsnivå: [],
    arbeidserfaring: [],
    ferskhet: null,
    språk: [],
    sortering: 'nyeste',
  });

  return (
    <SideLayout
      banner={<SideTopBanner tittel='Kandidatsøk' ikon={<Piktogram />} />}
      sidepanel={<Sidebar />}
    >
      <ul>
        <SWRLaster hook={hook}>
          {(data) => {
            return (
              <div>
                {data.kandidater.map((kandidat, i) => (
                  <KandidatKort
                    key={i}
                    erIListen={false}
                    kandidat={kandidat}
                    markert={false}
                  />
                ))}
              </div>
            );
          }}
        </SWRLaster>
      </ul>
    </SideLayout>
  );
};

export default KandidatSøk;
