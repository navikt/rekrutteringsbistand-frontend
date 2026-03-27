'use client';

import { useJobbsøkerFilterContext } from './JobbsøkerFilterContext';
import { useJobbsøkerFilterverdier } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerFilterverdier';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function NavkontorFilter() {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: filterverdier } =
    useJobbsøkerFilterverdier(rekrutteringstreffId);
  const { navkontor, setNavkontor } = useJobbsøkerFilterContext();

  const options = filterverdier?.navkontor ?? [];

  return (
    <CheckboxGroup legend='Nav-kontor'>
      {options.map((option) => (
        <Checkbox
          key={option}
          value={option}
          defaultChecked={navkontor === option}
          onChange={() => {
            setNavkontor(navkontor === option ? '' : option);
          }}
        >
          {option}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
