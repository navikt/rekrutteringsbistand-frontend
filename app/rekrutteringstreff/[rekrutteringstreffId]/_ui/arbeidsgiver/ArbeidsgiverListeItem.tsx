'use client';

import ArbeidsgiverKort from './ArbeidsgiverKort';
import { ArbeidsgiverDTO as TreffArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { FC, ReactNode } from 'react';

interface Props {
  arbeidsgiver: TreffArbeidsgiverDTO;
  status?: string;
  actionSlot?: ReactNode;
}

const ArbeidsgiverListeItem: FC<Props> = ({ arbeidsgiver, actionSlot }) => {
  const orgnr = arbeidsgiver.organisasjonsnummer;

  return (
    <ArbeidsgiverKort
      navn={arbeidsgiver.navn}
      organisasjonsnummer={orgnr}
      gateadresse={arbeidsgiver.gateadresse}
      postnummer={arbeidsgiver.postnummer}
      poststed={arbeidsgiver.poststed}
      status={arbeidsgiver.status}
      actionSlot={actionSlot}
    />
  );
};

export default ArbeidsgiverListeItem;
