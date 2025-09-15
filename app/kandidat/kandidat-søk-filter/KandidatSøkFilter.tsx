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
import AlleFilterKomponent from '@/components/felles/filter/AlleFilterKomponent';

export default function KandidatSøkFilter() {
  return (
    <div className='flex gap-4 '>
      <FritekstSøk />
      <div className='block @[720px]:hidden'>
        <div className='whitespace-nowrap'>
          <AlleFilterKomponent>
            <Arbeidsønsker />
            <KandidatStedSøk />
            <Kompetanse />
            <Førerkort />
            <Språk />
            <Arbeidserfaring /> <Hovedmål /> <Utdanningsnivå />
            <PrioriterteMålgrupper />
            <Innsatsgrupper />
          </AlleFilterKomponent>
        </div>
      </div>
    </div>
  );
}
