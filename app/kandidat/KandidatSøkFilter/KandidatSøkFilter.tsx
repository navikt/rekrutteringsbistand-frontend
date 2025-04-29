import AlleFilterKomponent from '../../components/AlleFilterKomponent';
import FilterKomponent from '../../components/FilterKomponent';
import Arbeidserfaring from './components/Arbeidserfaring';
import Arbeidsønsker from './components/Arbeidsønsker';
import FritekstSøk from './components/FritekstSøk';
import Førerkort from './components/Førerkort';
import Hovedmål from './components/Hovedmål';
import Jobbmuligheter from './components/Innsatsgrupper';
import KandidatStedSøk from './components/KandidatStedSøk';
import Kompetanse from './components/Kompetanse';
import PrioriterteMålgrupper from './components/PrioriterteMålgrupper';
import Språk from './components/Språk';
import Utdanningsnivå from './components/Utdanningsnivå';
import * as React from 'react';

const KandidatSøkFilter: React.FC = () => {
  return (
    <div className='flex gap-4 items-center'>
      <div>
        <FritekstSøk />
      </div>
      <FilterKomponent tittel='Innsatsgruppe'>
        <Jobbmuligheter />
      </FilterKomponent>
      <FilterKomponent tittel='Kandidatens mål'>
        <Hovedmål />
      </FilterKomponent>
      <FilterKomponent tittel='Utdanningsnivå'>
        <Utdanningsnivå />
      </FilterKomponent>
      <FilterKomponent tittel='Prioriterte målgrupper'>
        <PrioriterteMålgrupper />
      </FilterKomponent>
      <AlleFilterKomponent>
        <Arbeidsønsker />
        <KandidatStedSøk />
        <Kompetanse />
        <Førerkort />
        <Språk />
        <Arbeidserfaring /> <Jobbmuligheter /> <Hovedmål /> <Utdanningsnivå />{' '}
        <PrioriterteMålgrupper />
      </AlleFilterKomponent>
    </div>
  );
};

export default KandidatSøkFilter;
