'use client';

import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Fieldset, Switch } from '@navikt/ds-react';
import { useEffect } from 'react';

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
  const buckets = combined.data?.antall?.visningsStatusBuckets || [];
  const loading = combined.isLoading || combined.isValidating;
  const finnCount = (key: string) => {
    if (loading) return '-';
    return buckets.find((b: any) => b.key === key)?.count ?? 0;
  };
  const toggleStatus = (status: VisningsStatus) => {
    const current = statuser || [];
    if (current.includes(status)) {
      setStatuser(current.filter((s) => s !== status));
    } else {
      setStatuser([...current, status]);
    }
  };

  const allStatuses: VisningsStatus[] = [
    VisningsStatus.ApenForSokere,
    VisningsStatus.StengtForSokere,
    VisningsStatus.UtloptStengtForSokere,
    VisningsStatus.Fullfort,
  ];

  // Auto-aktiver "Åpen for søkere" dersom bruker tømmer alle statuser.
  useEffect(() => {
    if (!loading && (statuser?.length ?? 0) === 0) {
      setStatuser([VisningsStatus.ApenForSokere]);
    }
  }, [loading, statuser, setStatuser]);

  return (
    <Fieldset legend={hideLegend ? undefined : 'Status'} size='small'>
      <div className='flex flex-col gap-2'>
        {allStatuses.map((status) => {
          const checked = !!statuser?.includes(status);
          const label =
            status === VisningsStatus.UtloptStengtForSokere ? 'Utløpt' : status;
          const onlySelectedApen =
            statuser?.length === 1 &&
            statuser[0] === VisningsStatus.ApenForSokere &&
            status === VisningsStatus.ApenForSokere;
          return (
            <Switch
              key={status}
              checked={checked}
              onChange={() => toggleStatus(status)}
              value={status}
              disabled={loading || onlySelectedApen}
              title={
                onlySelectedApen
                  ? 'Minst én status må være aktiv. Deaktiver en annen først om du vil slå av denne.'
                  : undefined
              }
              size='small'
            >
              {label} ({finnCount(status)})
            </Switch>
          );
        })}
      </div>
    </Fieldset>
  );
}
