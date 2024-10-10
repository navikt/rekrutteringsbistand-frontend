import { LanguageIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import GråRamme from './GråRamme';

export interface KandidatSpråkProps {
  children?: React.ReactNode | undefined;
}

const KandidatSpråk: React.FC<KandidatSpråkProps> = ({ children }) => {
  return <GråRamme tittel='Språk' ikon={<LanguageIcon />}></GråRamme>;
};

export default KandidatSpråk;
