'use client';
import * as React from 'react';
import SideLayout from '../../components/layout/SideLayout';
import { useMinebrukere } from '../api/kandidatsok/minebrukere/minebrukere';
import KandidatKort from './components/KandidatKort';
import Sidebar from './components/KandidatSøkSidebar';
import Piktogram from './components/icons/finn-kandidater.svg';

const KandidatSøk: React.FC = () => {
  const { isLoading, error, data } = useMinebrukere({
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
      ikon={<Piktogram />}
      sidepanel={<Sidebar />}
      tittel='Kandidatsøk'
    >
      <ul>
        {data &&
          data.kandidater.map((kandidat, i) => (
            <KandidatKort
              key={i}
              erIListen={false}
              kandidat={kandidat}
              markert={false}
            />
          ))}
      </ul>
    </SideLayout>
  );
};

export default KandidatSøk;
