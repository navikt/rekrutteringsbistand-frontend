import * as React from 'react';
import { usePamGeografi } from '../../../api/pam-geografi/typehead/lokasjoner/usePamGeografi';
import SWRLaster from '../../../components/SWRLaster';
import FylkerOgKommuner from './FylkerOgKommunerFilter';
export interface IGeografiFilter {
  children?: React.ReactNode | undefined;
}

const GeografiFilter: React.FC<IGeografiFilter> = ({ children }) => {
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
