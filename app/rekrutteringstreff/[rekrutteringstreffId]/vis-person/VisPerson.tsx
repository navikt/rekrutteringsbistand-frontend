'use client';

import { useKandidatnummer } from '@/app/api/rekrutteringstreff/[...slug]/useKandidatnummer';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

export interface VisPersonProps {
  personTreffId?: string;
}

const VisPerson: React.FC<VisPersonProps> = ({ personTreffId }) => {
  const { data: kandidatnummerData } = useKandidatnummer(personTreffId || null);

  return (
    <div>
      <BodyShort>Viser personTreffId: {personTreffId}</BodyShort>
      <BodyShort>
        Viser kandidatnummer om det finnes {kandidatnummerData?.kandidatnummer}
      </BodyShort>
    </div>
  );
};

export default VisPerson;
