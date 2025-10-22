import Arbeidserfaring from './_ui/Arbeidserfaring';
import Arbeidsønsker from './_ui/Arbeidsønsker';
import FritekstSøk from './_ui/FritekstSøk';
import Førerkort from './_ui/Førerkort';
import Hovedmål from './_ui/Hovedmål';
import KandidatStedSøk from './_ui/KandidatStedSøk';
import Kompetanse from './_ui/Kompetanse';
import PrioriterteMålgrupper from './_ui/PrioriterteMålgrupper';
import Språk from './_ui/Språk';
import Utdanningsnivå from './_ui/Utdanningsnivå';
import Innsatsgrupper from '@/app/kandidat/kandidat-søk-filter/_ui/Innsatsgrupper';

export default function KandidatSøkFilter() {
  return (
    <div className='flex flex-col  gap-4'>
      <FritekstSøk />
      <Arbeidsønsker />
      <KandidatStedSøk />
      <Kompetanse />
      <Førerkort />
      <Språk />
      <Arbeidserfaring /> <Hovedmål /> <Utdanningsnivå />
      <PrioriterteMålgrupper />
      <Innsatsgrupper />
    </div>
  );
}
