import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import FilterChip from '@/components/felles/filter/FilterChip';
import TømFiltre from '@/components/felles/filter/TømFiltre';
import { Chips } from '@navikt/ds-react';

const KandidatListeChip: React.FC = () => {
  const filter = useKandidatlisteFilterContext();

  return (
    <div className='relative mt-4 w-full'>
      <Chips>
        <div className='flex flex-row flex-wrap gap-2  pb-2'>
          {Object.values(filter).some(
            (value) => Array.isArray(value) && value.length > 0,
          ) && <TømFiltre exlude={['stillingFane']} />}

          {filter.hendelseFilter && (
            <FilterChip
              type={filter.hendelseFilter}
              setVerdi={filter.setHendelseFilter}
            />
          )}
          {filter.internStatus && (
            <FilterChip
              type={filter.internStatus}
              setVerdi={filter.setInternStatus}
            />
          )}
        </div>
      </Chips>
    </div>
  );
};

export default KandidatListeChip;
