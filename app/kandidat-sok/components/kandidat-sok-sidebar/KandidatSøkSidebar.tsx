import * as React from 'react';
import Arbeidsønsker from './Arbeidsønsker';
import FritekstSøk from './FritekstSøk';
import Jobbmuligheter from './Innsatsgrupper';
import KandidatStedSøk from './KandidatStedSøk';

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
    </div>
  );
};

export default KandidatSøkSidebar;
