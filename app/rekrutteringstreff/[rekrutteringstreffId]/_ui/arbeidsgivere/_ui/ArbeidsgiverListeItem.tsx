'use client';

import ArbeidsgiverKort, { ArbeidsgiverAdresse } from './ArbeidsgiverKort';
import { useFinnArbeidsgiver } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { ArbeidsgiverDTO as TreffArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { FC, ReactNode, useMemo } from 'react';

interface Props {
  arbeidsgiver: TreffArbeidsgiverDTO;
  status?: string;
  actionSlot?: ReactNode;
}

const ArbeidsgiverListeItem: FC<Props> = ({
  arbeidsgiver,
  status,
  actionSlot,
}) => {
  const orgnr = arbeidsgiver.organisasjonsnummer;

  const { data } = useFinnArbeidsgiver(orgnr);

  const pamDetalj = useMemo(
    () => data?.find((a) => a.organisasjonsnummer === orgnr),
    [data, orgnr],
  );

  const adresse: ArbeidsgiverAdresse | null = pamDetalj?.adresse ?? null;

  return (
    <ArbeidsgiverKort
      navn={arbeidsgiver.navn}
      organisasjonsnummer={orgnr}
      adresse={adresse}
      status={status}
      actionSlot={actionSlot}
    />
  );
};

export default ArbeidsgiverListeItem;
