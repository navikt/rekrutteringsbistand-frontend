'use client';

import { useJobbsøkerFilterContext } from './JobbsøkerFilterContext';
import { useJobbsøkerInnsatsgrupper } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerInnsatsgrupper';
import { storForbokstavString } from '@/app/kandidat/util';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function InnsatsgruppeFilter() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: innsatsgrupperRespons } =
    useJobbsøkerInnsatsgrupper(rekrutteringstreffId);
  const { innsatsgruppe, setInnsatsgruppe } = useJobbsøkerFilterContext();

  const options = innsatsgrupperRespons?.innsatsgrupper ?? [];

  return (
    <CheckboxGroup
      legend='Innsatsgruppe'
      value={innsatsgruppe}
      onChange={setInnsatsgruppe}
    >
      {options.map((option) => (
        <Checkbox key={option} value={option}>
          {storForbokstavString(option).replace(/_/g, ' ')}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
