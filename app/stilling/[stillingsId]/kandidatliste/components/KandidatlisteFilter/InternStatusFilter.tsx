import { InternKandidatstatus } from '../../KandidatTyper';
import { internStatusTekst } from '../InternStatusTag';
import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';

const InternStatusFilter: React.FC = () => {
  const { internStatus, setInternStatus } = useKandidatlisteFilterContext();

  return (
    <CheckboxGroup legend='Intern status'>
      {Object.entries(InternKandidatstatus).map(([key, value]) => (
        <Checkbox
          key={key}
          value={key}
          defaultChecked={internStatus.includes(key)}
          onChange={() => {
            if (internStatus.includes(key)) {
              setInternStatus(internStatus.filter((status) => status !== key));
            } else {
              setInternStatus([...internStatus, key]);
            }
          }}
        >
          {internStatusTekst(value ?? '')}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default InternStatusFilter;
