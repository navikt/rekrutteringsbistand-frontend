import { ArrowForwardIcon } from '@navikt/aksel-icons';
import { Button, Checkbox, CheckboxGroup, Search } from '@navikt/ds-react';
import * as React from 'react';
import SWRLaster from '../../../../components/SWRLaster';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import { useStillingsContext } from '../StillingsContext';
import StillingsKandidaterTabell from './StillingsKandidaterTabell';

enum Kandidatstatus {
  VURDERES = 'Vurderes',
  KONTAKTET = 'Kontaktet',
  AKTUELL = 'Aktuell',
  TIL_INTERVJU = 'Til intervju',
  UAKTUELL = 'Uaktuell',
  UINTERESSERT = 'Uinteressert',
}
enum Hendelser {
  NY_KANDIDAT = 'Ny kandidat',
  STILLING_DELT = 'Stilling delt med kandidat',
  SVART_JA = 'Svart ja',
  SVART_NEI = 'Svart nei',
  CV_DELT = 'CV delt med arbeidsgiver',
  FÅTT_JOBB = 'Fått jobb',
}

const StillingsKandidater: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const hook = useKandidatliste(stillingsData.stilling.uuid);

  const [search, setSearch] = React.useState('');

  const handleChange = (val: string[]) => console.info(val);

  return (
    <SWRLaster hook={hook}>
      {(kandidatliste) => (
        <div className='mt-10'>
          <div className='flex justify-between'>
            <div className=' md:w-[15rem]'>
              <Search
                placeholder='Søk i kandidatene'
                label='Kandidatsøk'
                hideLabel
                variant='primary'
                value={search}
                onChange={(val) => setSearch(val)}
              />
            </div>
            <div>
              <Button
                disabled
                className='mr-2'
                variant='secondary'
                icon={<ArrowForwardIcon aria-hidden />}
              >
                Finn kandidater
              </Button>
              <Button
                disabled
                variant='secondary'
                className='mr-2'
                icon={<ArrowForwardIcon aria-hidden />}
              >
                Legg til kandidat
              </Button>
              <Button
                disabled
                variant='secondary'
                icon={<ArrowForwardIcon aria-hidden />}
              >
                Del med kandidat
              </Button>
            </div>
          </div>

          <div className='mt-8 flex'>
            <aside className='sidebar w-full md:w-[20rem] mr-4 '>
              <CheckboxGroup
                disabled
                legend='Status'
                onChange={handleChange}
                className='mb-8'
              >
                {Object.values(Kandidatstatus).map((status) => (
                  <Checkbox key={status} value={status}>
                    {status}
                  </Checkbox>
                ))}
              </CheckboxGroup>
              <CheckboxGroup
                disabled
                legend='Hendelser'
                onChange={handleChange}
              >
                {Object.values(Hendelser).map((hendelse) => (
                  <Checkbox key={hendelse} value={hendelse}>
                    {hendelse}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </aside>
            <StillingsKandidaterTabell
              search={search}
              kandidatliste={kandidatliste}
            />
          </div>
        </div>
      )}
    </SWRLaster>
  );
};

export default StillingsKandidater;
