import Arbeidserfaring from './_ui/Arbeidserfaring';
import Arbeidsønsker from './_ui/Arbeidsønsker';
import FritekstSøk from './_ui/FritekstSøk';
import Førerkort from './_ui/Førerkort';
import Hovedmål from './_ui/Hovedmål';
import Jobbmuligheter from './_ui/Innsatsgrupper';
import KandidatStedSøk from './_ui/KandidatStedSøk';
import Kompetanse from './_ui/Kompetanse';
import PrioriterteMålgrupper from './_ui/PrioriterteMålgrupper';
import Språk from './_ui/Språk';
import Utdanningsnivå from './_ui/Utdanningsnivå';
import AlleFilterKomponent from '@/components/felles/filter/AlleFilterKomponent';
import * as React from 'react';

const KandidatSøkFilter: React.FC = () => {
  return (
    <div className='flex gap-4 '>
      <FritekstSøk />
      <div className='whitespace-nowrap'>
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
    </div>
  );
};

export default KandidatSøkFilter;
