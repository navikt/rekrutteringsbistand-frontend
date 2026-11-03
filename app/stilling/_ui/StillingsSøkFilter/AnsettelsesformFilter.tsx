import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import { StillingsAnsettelsesform } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

// Verdier fra rekrutteringsbistand og arbeidsplassen (pam-ad), med «Annet» sist
const kjenteAnsettelsesformer: string[] = [
  ...Object.values(StillingsAnsettelsesform).filter(
    (verdi) => verdi !== StillingsAnsettelsesform.Annet,
  ),
  'Frilanser',
  StillingsAnsettelsesform.Annet,
];

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

  // Ta med verdier som finnes i indeksen eller er valgt, selv om de ikke er kjente
  const ukjenteVerdier = [
    ...buckets.map((b) => b.key),
    ...ansettelsesform,
  ].filter(
    (verdi, indeks, liste) =>
      verdi.length > 0 &&
      !kjenteAnsettelsesformer.includes(verdi) &&
      liste.indexOf(verdi) === indeks,
  );
  const alternativer = [...kjenteAnsettelsesformer, ...ukjenteVerdier.sort()];

  return (
    <CheckboxGroup
      size='small'
      legend='Ansettelsesform'
      value={ansettelsesform}
      onChange={setAnsettelsesform}
    >
      {alternativer.map((verdi) => (
        <Checkbox key={verdi} value={verdi}>
          {verdi} ({finnCount(verdi)})
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
