import { usePamGeografi } from '../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import SWRLaster from '../../../components/SWRLaster';
import FylkerOgKommuner from './FylkerOgKommunerFilter';
import * as React from 'react';

const GeografiFilter: React.FC = () => {
  const geografiHook = usePamGeografi();
  return (
    <SWRLaster hooks={[geografiHook]}>
      {(data) => {
        return (
          <div>
            <FylkerOgKommuner geografi={data} />
          </div>
        );
      }}
    </SWRLaster>
  );
};

export default GeografiFilter;
