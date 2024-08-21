import * as React from 'react';
import Sidelaster from './Sidelaster';
import Feilmelding from './feilhåndtering/Feilmelding';

export interface ISWRLaster {
  children?: React.ReactNode | undefined;
  swrData: any;
}

const SWRLaster: React.FC<ISWRLaster> = ({ swrData, children }) => {
  if (swrData.isLoading || swrData.isValidating) {
    return <Sidelaster />;
  }

  if (swrData.error) {
    return <Feilmelding {...swrData.error} tittel='Feil ved henting av data' />;
  }

  if (swrData.data) {
    return children;
  }

  return null;

};

export default SWRLaster;
