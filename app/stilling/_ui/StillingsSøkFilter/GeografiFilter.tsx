import FylkerOgKommuner from './FylkerOgKommunerFilter';
import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import SWRLaster from '@/components/SWRLaster';

export interface GeografiFilterProps {
  hideLegend?: boolean;
}

export default function GeografiFilter({ hideLegend }: GeografiFilterProps) {
  const geografiHook = usePamGeografi();
  return (
    <SWRLaster hooks={[geografiHook]}>
      {(data) => <FylkerOgKommuner geografi={data} hideLegend={hideLegend} />}
    </SWRLaster>
  );
}
