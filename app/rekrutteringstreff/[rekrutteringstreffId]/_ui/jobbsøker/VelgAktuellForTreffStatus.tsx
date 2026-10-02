'use client';

import AktuellForTreffStatusTag, {
  aktuellForTreffStatusIkon,
  aktuellForTreffStatusTekst,
} from './AktuellForTreffStatusTag';
import { endreAktuellForTreffStatus } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/endreAktuellForTreffStatus';
import { AktuellForTreffStatus } from '@/app/rekrutteringstreff/_types/constants';
import VelgStatus, {
  StatusAlternativ,
} from '@/components/internStatus/VelgStatus';
import { FC } from 'react';

const alternativer: StatusAlternativ<AktuellForTreffStatus>[] = (
  Object.values(AktuellForTreffStatus) as AktuellForTreffStatus[]
).map((s) => ({
  verdi: s,
  tekst: aktuellForTreffStatusTekst[s],
  ikon: aktuellForTreffStatusIkon[s],
}));

interface Props {
  rekrutteringstreffId: string;
  personTreffId: string;
  aktuellForTreffStatus: AktuellForTreffStatus | null;
  disabled?: boolean;
  oppdaterJobbsøkere: () => Promise<void>;
}

const VelgAktuellForTreffStatus: FC<Props> = ({
  rekrutteringstreffId,
  personTreffId,
  aktuellForTreffStatus,
  disabled,
  oppdaterJobbsøkere,
}) => (
  <VelgStatus
    status={aktuellForTreffStatus}
    tittel={'Aktuell for å delta på treffet?'}
    alternativer={alternativer}
    tag={<AktuellForTreffStatusTag status={aktuellForTreffStatus} />}
    disabled={disabled}
    ariaLabel='Endre aktuell for treff-status'
    onEndreStatus={async (ny) => {
      await endreAktuellForTreffStatus(rekrutteringstreffId, personTreffId, ny);
      await oppdaterJobbsøkere();
    }}
  />
);

export default VelgAktuellForTreffStatus;
