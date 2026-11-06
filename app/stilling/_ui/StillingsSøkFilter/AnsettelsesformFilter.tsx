import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { StillingsAnsettelsesform } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export default function AnsettelsesformFilter() {
  const filterCtx = useStillingsSøkFilter();
  const { ansettelsesform, setAnsettelsesform } = filterCtx;
  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const combined = useStillingssøk({
    filter: filterCtx,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    navIdent: brukerData?.ident,
    formidlinger: filterCtx.formidlinger,
  });

  const buckets = combined.data?.antall?.ansettelsesformBuckets ?? [];
  const loading = combined.isLoading || combined.isValidating;

  const finnCount = (key: string) => {
    if (loading) return '-';
    return buckets.find((b) => b.key === key)?.count ?? 0;
  };

  return (
    <CheckboxGroup
      size='small'
      legend='Ansettelsesform'
      value={ansettelsesform}
      onChange={setAnsettelsesform}
    >
      {Object.entries(StillingsAnsettelsesform).map(([navn, verdi]) => (
        <Checkbox key={verdi} value={verdi}>
          {navn} ({finnCount(verdi)})
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
