'use client';

import { type FilterValg } from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import { useRekrutteringstreffSøkFilter } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffSøkContext';
import {
  PublisertStatus,
  PublisertStatusLabel,
  publisertStatusVerdier,
  RekrutteringstreffStatus,
  RekrutteringstreffStatusLabel,
  rekrutteringstreffStatusVerdier,
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
  const { statuser, setStatuser, publisertStatuser, setPublisertStatuser } =
    useRekrutteringstreffSøkFilter();

  const finnAntall = (status: string) => {
    if (loading) return '-';
    return aggregering.find((a) => a.verdi === status)?.antall ?? 0;
  };

  const rekrutteringstreffStatusVerdierUtenSlettet =
    rekrutteringstreffStatusVerdier.filter(
      (value) => value != RekrutteringstreffStatus.SLETTET,
    );

  return (
    <CheckboxGroup
      legend='Status'
      size='small'
      value={statuser}
      onChange={(val: RekrutteringstreffStatus[]) => setStatuser(val)}
    >
      <div className='flex flex-col gap-2'>
        {rekrutteringstreffStatusVerdierUtenSlettet.map((status) => (
          <>
            <Checkbox
              key={status}
              value={status}
              disabled={loading}
              size='small'
            >
              {RekrutteringstreffStatusLabel[status]} ({finnAntall(status)})
            </Checkbox>
            {status === RekrutteringstreffStatus.PUBLISERT &&
              statuser.includes(RekrutteringstreffStatus.PUBLISERT) && (
                <CheckboxGroup
                  legend=''
                  size='small'
                  value={publisertStatuser}
                  onChange={(val: PublisertStatus[]) =>
                    setPublisertStatuser(val)
                  }
                  className={'-mt-3 ml-3'}
                >
                  {publisertStatusVerdier.map((publisertStatus) => (
                    <Checkbox
                      key={publisertStatus}
                      value={publisertStatus}
                      disabled={loading}
                      size='small'
                    >
                      {PublisertStatusLabel[publisertStatus]} (
                      {finnAntall(publisertStatus)})
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              )}
          </>
        ))}
      </div>
    </CheckboxGroup>
  );
}
