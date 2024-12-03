import { ArrowForwardIcon, PencilIcon } from '@navikt/aksel-icons';
import { Button, Checkbox, CheckboxGroup, Search } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import SWRLaster from '../../../components/SWRLaster';
import { useStillingsContext } from '../StillingsContext';
import {
  KandidatHendelser,
  KandidatStatus,
  useStillingsKandidaterFilter,
} from './StillingsKandidaterFilterContext';
import StillingsKandidaterTabell from './StillingsKandidaterTabell';

const StillingsKandidater: React.FC = () => {
  const { stillingsData } = useStillingsContext();
  const { status, setStatus, hendelse, setHendelse } =
    useStillingsKandidaterFilter();

  const hook = useKandidatliste(stillingsData.stilling.uuid);

  const [search, setSearch] = React.useState('');

  return (
    <SWRLaster hook={hook}>
      {(kandidatliste) => (
        <div className='my-2'>
          <div className='mb-2 flex justify-end'>
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
          <div className='flex justify-between mt-2'>
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
                variant='tertiary'
                icon={<PencilIcon title='Rediger' />}
              >
                Rapporter personvernsbrudd
              </Button>
              <Button
                disabled
                variant='tertiary'
                icon={<PencilIcon title='Rediger' />}
              >
                Del med kandidaten
              </Button>
            </div>
          </div>

          <div className='mt-8 flex'>
            <aside className='sidebar w-full md:w-[20rem] mr-4 '>
              <CheckboxGroup
                legend='Status'
                onChange={setStatus}
                defaultValue={status}
                className='mb-8'
              >
                {Object.entries(KandidatStatus).map(([key, value]) => (
                  <Checkbox key={key} value={key}>
                    {value}
                  </Checkbox>
                ))}
              </CheckboxGroup>
              <CheckboxGroup
                disabled
                legend='Hendelser'
                onChange={setHendelse}
                defaultValue={hendelse}
              >
                {Object.entries(KandidatHendelser).map(([key, value]) => (
                  <Checkbox key={key} value={key}>
                    {value}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </aside>
            <div className='w-full'>
              <StillingsKandidaterTabell
                search={search}
                kandidatliste={kandidatliste}
              />
            </div>
          </div>
        </div>
      )}
    </SWRLaster>
  );
};

export default StillingsKandidater;
