import { useKandidatlisteFilterContext } from './KandidatlisteFilterContext';
import { storForbokstavString } from '@/app/kandidat/util';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { KandidatHendelseType } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function HendelseTypeFilter() {
  const { hendelseFilter, setHendelseFilter } = useKandidatlisteFilterContext();
  const { antallPerKategoriPerFilter } = useKandidatlisteContext();
  const antall = antallPerKategoriPerFilter.kandidatlisteHendelseType;

  return (
    <CheckboxGroup
      legend='Hendelse'
      value={hendelseFilter}
      onChange={(val: string[]) => setHendelseFilter(val)}
    >
      {Object.entries(KandidatHendelseType)
        .filter(([key]) => key !== 'PRESENTERT' && key !== 'IKKE_PRESENTERT')
        .map(([key, value]) => (
          <Checkbox key={key} value={key}>
            {storForbokstavString(value ?? '').replace(/_/g, ' ')} (
            {antall[key] ?? 0})
          </Checkbox>
        ))}
    </CheckboxGroup>
  );
}
