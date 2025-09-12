import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { internStatusTekst } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/InternStatusTag';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function InternStatusFilter() {
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
}
