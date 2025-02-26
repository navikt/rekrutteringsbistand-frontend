import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { endreKandidatStatus } from '../../../../api/kandidat/endreKandidatStatus';
import { InternKandidatstatus } from './KandidatTyper';

export interface VelgInternStatusProps {
  status: InternKandidatstatus;
  kandidatlisteId: string;
  kandidatnr: string;
  lukketKandidatliste: boolean;
}
const VelgInternStatus: React.FC<VelgInternStatusProps> = ({
  kandidatlisteId,
  kandidatnr,
  status,
  lukketKandidatliste,
}) => {
  const [valgtStatus, setValgtStatus] =
    React.useState<InternKandidatstatus>(status);

  const endreStatus = (status: InternKandidatstatus) => {
    setValgtStatus(status);
    endreKandidatStatus(kandidatlisteId, kandidatnr, status);
  };

  return (
    <Select
      disabled={lukketKandidatliste}
      label='Velg intern status'
      value={valgtStatus}
      hideLabel
      onChange={(e) => endreStatus(e.target.value as InternKandidatstatus)}
    >
      <option value={InternKandidatstatus.VURDERES}>Vurderes</option>
      <option value={InternKandidatstatus.KONTAKTET}>Kontaktet</option>
      <option value={InternKandidatstatus.AKTUELL}>Aktuell</option>
      <option value={InternKandidatstatus.TIL_INTERVJU}>Til intervju</option>
      <option value={InternKandidatstatus.UAKTUELL}>Ikke aktuell</option>
      <option value={InternKandidatstatus.UINTERESSERT}>
        Ikke interessert
      </option>
    </Select>
  );
};

export default VelgInternStatus;
