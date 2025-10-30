'use client';

import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';
import { StillingsSøkPortefølje } from '@/app/stilling/_util/stillingssøk-typer';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import { useEffect, useRef } from 'react';

export interface StatusFilterProps {
  hideLegend?: boolean;
}

export default function StatusFilter({ hideLegend }: StatusFilterProps) {
  const { harRolle } = useApplikasjonContext();
  const filterCtx = useStillingsSøkFilter();
  const { statuser, setStatuser, portefølje } = filterCtx;
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

  const statusRef = useRef(0);

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

  const harArbeidsgiverrettetRolle = harRolle([
    Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
  ]);

  const allStatuses: VisningsStatus[] = [
    VisningsStatus.ApenForSokere,
    VisningsStatus.StengtForSokere,
    VisningsStatus.UtloptStengtForSokere,
    VisningsStatus.Fullfort,
    VisningsStatus.IkkePublisert,
  ];

  // Auto-aktiver "Åpen for søkere" dersom bruker tømmer alle statuser - men kun for ikke-formidlinger.
  useEffect(() => {
    if (
      statusRef.current < 1 &&
      !filterCtx.formidlinger &&
      !loading &&
      (statuser?.length ?? 0) === 0
    ) {
      setStatuser([VisningsStatus.ApenForSokere]);
      statusRef.current = statusRef.current + 1;
    }
  }, [loading, statuser, setStatuser, filterCtx.formidlinger]);

  if (!harArbeidsgiverrettetRolle) {
    return null;
  }
  return (
    <CheckboxGroup legend={hideLegend ? undefined : 'Status'} size='small'>
      <div className='flex flex-col gap-2'>
        {allStatuses.map((status) => {
          // Vis kun "Ikke publisert" under Mine stillinger
          if (
            status === VisningsStatus.IkkePublisert &&
            portefølje !== StillingsSøkPortefølje.VIS_MINE
          ) {
            return null;
          }

          const checked = !!statuser?.includes(status);
          const label =
            status === VisningsStatus.UtloptStengtForSokere ? 'Utløpt' : status;

          return (
            <Checkbox
              key={status}
              checked={checked}
              onChange={() => toggleStatus(status)}
              value={status}
              disabled={loading}
              size='small'
            >
              {label} ({finnCount(status)})
            </Checkbox>
          );
        })}
      </div>
    </CheckboxGroup>
  );
}
