import { storForbokstavString } from '../../../../../kandidat/util';
import { KandidatHendelseType } from '../KandidatHendelser/KandidatHendelseTag';
import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';

const HendelseTypeFilter: React.FC = () => {
  const { hendelseFilter, setHendelseFilter } = useKandidatlisteFilterContext();

  return (
    <CheckboxGroup legend='Hendelse'>
      {Object.entries(KandidatHendelseType)
        .filter(([key]) => key !== 'PRESENTERT' && key !== 'IKKE_PRESENTERT')
        .map(([key, value]) => (
          <Checkbox
            key={key}
            value={key}
            defaultChecked={hendelseFilter?.includes(key)}
            onChange={() => {
              if (hendelseFilter.includes(key)) {
                setHendelseFilter(
                  hendelseFilter.filter((status) => status !== key),
                );
              } else {
                setHendelseFilter([...hendelseFilter, key]);
              }
            }}
          >
            {storForbokstavString(value ?? '').replace(/_/g, ' ')}
          </Checkbox>
        ))}
    </CheckboxGroup>
  );
};

export default HendelseTypeFilter;
