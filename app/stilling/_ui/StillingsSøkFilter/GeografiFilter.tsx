import FylkerOgKommuner from './FylkerOgKommunerFilter';
import { usePamGeografi } from '@/app/api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import SWRLaster from '@/components/SWRLaster';
import * as React from 'react';

const GeografiFilter: React.FC = () => {
  const geografiHook = usePamGeografi();
  return (
    <SWRLaster hooks={[geografiHook]}>
      {(data) => (
        <div>
          <FylkerOgKommuner geografi={data} />
        </div>
      )}
    </SWRLaster>
  );
};

export default GeografiFilter;
