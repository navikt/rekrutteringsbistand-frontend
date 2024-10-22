import * as React from 'react';
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

export interface IKandidatSøkSidebar {
  children?: React.ReactNode | undefined;
}

const KandidatSøkSidebar: React.FC<IKandidatSøkSidebar> = ({ children }) => {
  return (
    <div className='grid gap-4'>
      <FritekstSøk />
      <Arbeidsønsker />
      <KandidatStedSøk />
      <Jobbmuligheter />
      <Hovedmål />
      <Kompetanse />
      <Førerkort />
      <Språk />
      <Arbeidserfaring />
      <Utdanningsnivå />
      <PrioriterteMålgrupper />
    </div>
  );
};

export default KandidatSøkSidebar;
