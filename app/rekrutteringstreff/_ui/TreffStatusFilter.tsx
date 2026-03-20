'use client';

import { type FilterValg } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import {
  SokStatus,
  SokStatusLabel,
} from '@/app/rekrutteringstreff/_types/constants';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

interface TreffStatusFilterProps {
  aggregering: FilterValg[];
  loading?: boolean;
}

export default function TreffStatusFilter({
  aggregering,
  loading,
}: TreffStatusFilterProps) {
  const { statuser, setStatuser } = useRekrutteringstreffSøkFilter();

  const finnAntall = (status: string) => {
    if (loading) return '-';
    return aggregering.find((a) => a.verdi === status)?.antall ?? 0;
  };

  const toggleStatus = (status: string) => {
    if (statuser.includes(status)) {
      setStatuser(statuser.filter((s) => s !== status));
    } else {
      setStatuser([...statuser, status]);
    }
  };

  const alleStatuser = Object.values(SokStatus);

  return (
    <CheckboxGroup legend='Status' size='small'>
      <div className='flex flex-col gap-2'>
        {alleStatuser.map((status) => (
          <Checkbox
            key={status}
            checked={statuser.includes(status)}
            onChange={() => toggleStatus(status)}
            value={status}
            disabled={loading}
            size='small'
          >
            {SokStatusLabel[status]} ({finnAntall(status)})
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  );
}
