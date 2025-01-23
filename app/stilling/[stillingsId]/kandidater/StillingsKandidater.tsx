import { ArrowForwardIcon, TenancyIcon } from '@navikt/aksel-icons';
import { Button, Checkbox, CheckboxGroup, Search } from '@navikt/ds-react';
import * as React from 'react';
import { useKandidatliste } from '../../../api/kandidat/useKandidatliste';
import SWRLaster from '../../../components/SWRLaster';
import { useStillingsContext } from '../StillingsContext';
import SendSmsModal from './SendSMS/SendSmsModal';
import {
  KandidatHendelser,
  KandidatStatus,
  useStillingsKandidaterFilter,
} from './StillingsKandidaterFilterContext';
import StillingsKandidaterTabell from './StillingsKandidaterTabell';

const StillingsKandidater: React.FC = () => {
  const { stillingsData, erEier } = useStillingsContext();
  const { status, setStatus, hendelse, setHendelse } =
    useStillingsKandidaterFilter();
  const [markerteFnr, setMarkerteFnr] = React.useState<string[]>([]);
  const hook = useKandidatliste(stillingsData.stilling.uuid);

  const [search, setSearch] = React.useState('');

  return (
    <SWRLaster hook={hook}>
      {(kandidatliste) => (
        <div className='my-2'>
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
              <SendSmsModal
                markerteFnr={markerteFnr}
                stillingId={stillingsData.stilling.uuid}
                stillingskategori={
                  stillingsData.stillingsinfo?.stillingskategori ?? null
                }
                fjernAllMarkering={() => setMarkerteFnr([])}
              />
              <Button
                disabled
                variant='tertiary'
                icon={<ArrowForwardIcon title='Del med kandidat' />}
              >
                Del med kandidat
              </Button>
              <Button
                disabled
                variant='tertiary'
                icon={<TenancyIcon title='Del med arbeidsgiver' />}
              >
                Del med arbeidsgiver
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
                valgteFnr={markerteFnr}
                setValgteFnr={setMarkerteFnr}
                search={search}
                kandidatliste={kandidatliste}
                stillingsId={stillingsData.stilling.uuid}
                stillingskategori={
                  stillingsData.stillingsinfo?.stillingskategori ?? null
                }
              />
            </div>
          </div>
        </div>
      )}
    </SWRLaster>
  );
};

export default StillingsKandidater;
