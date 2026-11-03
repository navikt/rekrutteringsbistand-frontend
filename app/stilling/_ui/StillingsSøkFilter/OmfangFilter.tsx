import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { StillingsSøkOmfang } from '@/app/stilling/_util/stillingssøk-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

export const omfangVisningsnavn: Record<StillingsSøkOmfang, string> = {
  [StillingsSøkOmfang.Heltid]: 'Heltid',
  [StillingsSøkOmfang.Deltid]: 'Deltid',
  [StillingsSøkOmfang.IkkeOppgitt]: 'Ikke oppgitt',
};

export default function OmfangFilter() {
  const filterCtx = useStillingsSøkFilter();
  const { omfang, setOmfang } = filterCtx;
  const { brukerData, valgtNavKontor } = useApplikasjonContext();

  const combined = useStillingssøk({
    filter: filterCtx,
    eierNavKontorEnhetId: valgtNavKontor?.navKontor,
    navIdent: brukerData?.ident,
    formidlinger: filterCtx.formidlinger,
  });

  const buckets = combined.data?.antall?.omfangBuckets ?? [];
  const loading = combined.isLoading || combined.isValidating;

  const finnCount = (key: StillingsSøkOmfang) => {
    if (loading) return '-';
    return buckets.find((b) => b.key === key)?.count ?? 0;
  };

  return (
    <CheckboxGroup
      size='small'
      legend='Heltid/deltid'
      value={omfang}
      onChange={setOmfang}
    >
      {Object.values(StillingsSøkOmfang).map((verdi) => (
        <Checkbox key={verdi} value={verdi}>
          {omfangVisningsnavn[verdi]} ({finnCount(verdi)})
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
