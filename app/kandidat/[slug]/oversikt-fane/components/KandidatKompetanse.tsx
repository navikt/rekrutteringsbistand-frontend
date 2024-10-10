import { ClipboardIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import GråRamme from './GråRamme';
export interface KandidatKompetanseProps {
  children?: React.ReactNode | undefined;
}

const KandidatKompetanse: React.FC<KandidatKompetanseProps> = ({
  children,
}) => {
  return <GråRamme tittel='Kompetanse' ikon={<ClipboardIcon />}></GråRamme>;
};

export default KandidatKompetanse;
