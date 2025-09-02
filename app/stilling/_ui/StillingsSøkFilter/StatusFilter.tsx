'use client';

import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { storForbokstav } from '@/app/kandidat/util';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export enum StillingsStatusTyper {
  Publisert = 'publisert',
  Utløpt = 'utløpt',
  Stoppet = 'stoppet',
}

export interface StatusFilterProps {
  hideLegend?: boolean;
}

export default function StatusFilter({ hideLegend }: StatusFilterProps) {
  const filterCtx = useStillingsSøkFilter();
  const { statuser, setStatuser } = filterCtx;
  const {
    brukerData: { ident },
    valgtNavKontor,
  } = useApplikasjonContext();
  const combined = useStillingssøk({
    filter: filterCtx,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    navIdent: ident,
    formidlinger: filterCtx.formidlinger,
  });
  const buckets = combined.data?.antall?.statusBuckets || [];
  const finnCount = (key: string) =>
    buckets.find((b: any) => b.key === key)?.count ?? 0;
  return (
    <CheckboxGroup
      hideLegend={hideLegend}
      legend='Status'
      size='small'
      onChange={setStatuser}
      value={statuser ? statuser : undefined}
    >
      <Checkbox value={StillingsStatusTyper.Publisert}>
        {storForbokstav(StillingsStatusTyper.Publisert)} ({finnCount('ACTIVE')})
      </Checkbox>
      <Checkbox value={StillingsStatusTyper.Utløpt}>
        {storForbokstav(StillingsStatusTyper.Utløpt)} ({finnCount('INACTIVE')})
      </Checkbox>
      <Checkbox value={StillingsStatusTyper.Stoppet}>
        {storForbokstav(StillingsStatusTyper.Stoppet)} ({finnCount('STOPPED')})
      </Checkbox>
    </CheckboxGroup>
  );
}
