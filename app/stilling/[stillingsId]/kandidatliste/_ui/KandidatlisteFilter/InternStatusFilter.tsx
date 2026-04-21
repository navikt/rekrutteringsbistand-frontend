import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { internStatusTekst } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/InternStatusTag';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function InternStatusFilter() {
  const { internStatus, setInternStatus } = useKandidatlisteFilterContext();
  const { antallPerKategoriPerFilter } = useKandidatlisteContext();
  const antall = antallPerKategoriPerFilter.internStatus;

  return (
    <CheckboxGroup
      legend='Intern status'
      value={internStatus}
      onChange={(val: string[]) => setInternStatus(val)}
    >
      {Object.entries(InternKandidatstatus).map(([key, value]) => (
        <Checkbox key={key} value={key}>
          {internStatusTekst(value ?? '')} ({antall[key] ?? 0})
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
