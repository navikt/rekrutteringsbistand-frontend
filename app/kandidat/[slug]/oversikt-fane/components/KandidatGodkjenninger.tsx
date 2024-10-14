import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import { GodkjenningSchemaDTO } from '../../../../api/kandidat-sok/schema/godkjenningSchema.zod';
import GråRamme from './GråRamme';
export interface KandidatGodkjenningerProps {
  children?: React.ReactNode | undefined;
  godkjenninger?: GodkjenningSchemaDTO[] | null;
}

const KandidatGodkjenninger: React.FC<KandidatGodkjenningerProps> = ({
  children,
  godkjenninger,
}) => {
  if (!godkjenninger || !godkjenninger.length) {
    return null;
  }
  return (
    <GråRamme tittel='Godkjenninger' ikon={<SealCheckmarkIcon />}></GråRamme>
  );
};

export default KandidatGodkjenninger;
