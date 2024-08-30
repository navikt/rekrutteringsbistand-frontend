import * as React from 'react';
import SWRLaster from '../../../../components/SWRLaster';
import { useGeografi } from '../../../api/stilling/geografi/geografi';

export interface IGeografiFilter {
  children?: React.ReactNode | undefined;
}

const GeografiFilter: React.FC<IGeografiFilter> = ({ children }) => {
  const hook = useGeografi();
  return (
    <SWRLaster hook={hook}>
      {(data) => {
        console.log('🎺 data', data);
        return <div>{children}</div>;
      }}
    </SWRLaster>
  );
};

export default GeografiFilter;
