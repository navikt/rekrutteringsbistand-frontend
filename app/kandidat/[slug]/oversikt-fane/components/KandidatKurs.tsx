import { HatSchoolIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import GråRamme from './GråRamme';

export interface KandidatKursProps {
  children?: React.ReactNode | undefined;
}

const KandidatKurs: React.FC<KandidatKursProps> = ({ children }) => {
  return <GråRamme tittel='Kurs' ikon={<HatSchoolIcon />}></GråRamme>;
};

export default KandidatKurs;
