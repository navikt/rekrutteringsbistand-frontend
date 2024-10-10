import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import GråRamme from './GråRamme';
export interface KandidatGodkjenningerProps {
  children?: React.ReactNode | undefined;
}

const KandidatGodkjenninger: React.FC<KandidatGodkjenningerProps> = ({
  children,
}) => {
  return (
    <GråRamme tittel='Godkjenninger' ikon={<SealCheckmarkIcon />}></GråRamme>
  );
};

export default KandidatGodkjenninger;
