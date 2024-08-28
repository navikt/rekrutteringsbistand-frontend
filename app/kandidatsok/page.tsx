'use client';
import * as React from 'react';
import SideLayout from '../../components/layout/SideLayout';
import { useMinebrukere } from '../api/kandidatsok/minebrukere/minebrukere';
import Piktogram from './icons/finn-kandidater.svg';
const Page: React.FC = () => {
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
    <SideLayout tittel='Stillinger' ikon={<Piktogram />}>
      Hello{' '}
      <ul>
        {data && data.kandidater.map((b, i) => <li key={i}>{b.fornavn}</li>)}
      </ul>
    </SideLayout>
  );
};

export default Page;
