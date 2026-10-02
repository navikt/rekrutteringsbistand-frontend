import InternStatusTag, {
  internStatusIcon,
  internStatusTekst,
} from './InternStatusTag';
import { endreKandidatStatus } from '@/app/api/kandidat/endreKandidatStatus';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import VelgStatus, {
  StatusAlternativ,
} from '@/components/internStatus/VelgStatus';
import { type FC } from 'react';

export interface VelgInternStatusProps {
  status: InternKandidatstatus;
  kandidatnr: string;
  lukketKandidatliste: boolean;
}

const alternativer: StatusAlternativ<InternKandidatstatus>[] = (
  Object.values(InternKandidatstatus) as InternKandidatstatus[]
).map((s) => ({
  verdi: s,
  tekst: internStatusTekst(s),
  ikon: internStatusIcon(s),
}));

const VelgInternStatus: FC<VelgInternStatusProps> = ({
  kandidatnr,
  status,
  lukketKandidatliste,
}) => {
  const { reFetchKandidatliste, kandidatlisteId } = useKandidatlisteContext();

  return (
    <VelgStatus
      status={status}
      alternativer={alternativer}
      tag={<InternStatusTag status={status} />}
      disabled={lukketKandidatliste}
      ariaLabel='Endre intern status'
      onEndreStatus={async (ny) => {
        await endreKandidatStatus(kandidatlisteId, kandidatnr, ny);
        reFetchKandidatliste();
      }}
    />
  );
};

export default VelgInternStatus;
