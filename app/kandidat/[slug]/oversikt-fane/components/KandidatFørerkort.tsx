import { CarIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import GråRamme from './GråRamme';
export interface KandidatFørerkortProps {
  children?: React.ReactNode | undefined;
}

const KandidatFørerkort: React.FC<KandidatFørerkortProps> = ({ children }) => {
  return <GråRamme tittel='Førerkort' ikon={<CarIcon />}></GråRamme>;
};

export default KandidatFørerkort;
