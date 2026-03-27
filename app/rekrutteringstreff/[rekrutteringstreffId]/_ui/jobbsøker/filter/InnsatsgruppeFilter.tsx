'use client';

import { useJobbsøkerFilterContext } from './JobbsøkerFilterContext';
import { useJobbsøkerFilterverdier } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerFilterverdier';
import { storForbokstavString } from '@/app/kandidat/util';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function InnsatsgruppeFilter() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: filterverdier } =
    useJobbsøkerFilterverdier(rekrutteringstreffId);
  const { innsatsgruppe, setInnsatsgruppe } = useJobbsøkerFilterContext();

  const options = filterverdier?.innsatsgrupper ?? [];

  return (
    <CheckboxGroup legend='Innsatsgruppe'>
      {options.map((option) => (
        <Checkbox
          key={option}
          value={option}
          defaultChecked={innsatsgruppe.includes(option)}
          onChange={() => {
            if (innsatsgruppe.includes(option)) {
              setInnsatsgruppe(innsatsgruppe.filter((i) => i !== option));
            } else {
              setInnsatsgruppe([...innsatsgruppe, option]);
            }
          }}
        >
          {storForbokstavString(option).replace(/_/g, ' ')}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
