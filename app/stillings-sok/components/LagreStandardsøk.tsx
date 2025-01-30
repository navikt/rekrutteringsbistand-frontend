import { FloppydiskIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { setNyttStandardsøk } from '../../api/stilling/standardsok/settStandardsøk';
import { useUseBrukerStandardSøk } from '../../api/stilling/standardsok/useBrukersStandardsøk';

export interface LagreStandardsøkProps {
  children?: React.ReactNode | undefined;
}

const LagreStandardsøk: React.FC<LagreStandardsøkProps> = ({ children }) => {
  const brukerStandardSøkData = useUseBrukerStandardSøk();
  const searchParams = useSearchParams();
  const searchString = new URLSearchParams(searchParams.toString()).toString();

  const brukerStandardSøk = searchString === brukerStandardSøkData.data?.søk;

  return (
    <Button
      className='whitespace-nowrap'
      disabled={brukerStandardSøk}
      variant='tertiary'
      aria-describedby='lagre-standardsok-beskrivelse'
      icon={<FloppydiskIcon />}
      size='small'
      onClick={() => {
        setNyttStandardsøk(searchString);
      }}
    >
      Lagre nytt standardsøk
    </Button>
  );
};

export default LagreStandardsøk;
