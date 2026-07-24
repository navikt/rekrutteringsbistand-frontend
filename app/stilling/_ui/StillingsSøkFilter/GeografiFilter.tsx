import FylkerOgKommuner from './FylkerOgKommunerFilter';
import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import { useStillingssøk } from '@/app/api/stillings-sok/useStillingssøk';
import { useStillingsSøkFilter } from '@/app/stilling/StillingsSøkContext';
import SWRLaster from '@/components/SWRLaster';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';

export interface GeografiFilterProps {
  hideLegend?: boolean;
}

export default function GeografiFilter({ hideLegend }: GeografiFilterProps) {
  const geografiHook = usePamGeografi();
  const filterCtx = useStillingsSøkFilter();
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

  return (
    <SWRLaster hooks={[geografiHook]}>
      {(data) => (
        <FylkerOgKommuner
          geografi={data}
          hideLegend={hideLegend}
          fylker={filterCtx.fylker}
          setFylker={filterCtx.setFylker}
          kommuner={filterCtx.kommuner}
          setKommuner={filterCtx.setKommuner}
          fylkeBuckets={combined.data?.antall?.geografi?.fylker ?? []}
          kommuneBuckets={combined.data?.antall?.geografi?.kommuner ?? []}
          loading={combined.isLoading || combined.isValidating}
        />
      )}
    </SWRLaster>
  );
}
