import { Select } from '@navikt/ds-react';
import * as React from 'react';
import { endreKandidatStatus } from '../../../../api/kandidat/endreKandidatStatus';
import { Kandidatstatus } from './KandidatTyper';

export interface VelgInternStatusProps {
  status: Kandidatstatus;
  kandidatlisteId: string;
  kandidatnr: string;
}
const VelgInternStatus: React.FC<VelgInternStatusProps> = ({
  kandidatlisteId,
  kandidatnr,
  status,
}) => {
  const [valgtStatus, setValgtStatus] = React.useState<Kandidatstatus>(status);

  const endreStatus = (status: Kandidatstatus) => {
    setValgtStatus(status);
    endreKandidatStatus(kandidatlisteId, kandidatnr, status);
  };

  return (
    <Select
      label='Velg intern status'
      value={valgtStatus}
      hideLabel
      onChange={(e) => endreStatus(e.target.value as Kandidatstatus)}
    >
      <option value={Kandidatstatus.VURDERES}>Vurderes</option>
      <option value={Kandidatstatus.KONTAKTET}>Kontaktet</option>
      <option value={Kandidatstatus.AKTUELL}>Aktuell</option>
      <option value={Kandidatstatus.TIL_INTERVJU}>Til intervju</option>
      <option value={Kandidatstatus.UAKTUELL}>Ikke aktuell</option>
      <option value={Kandidatstatus.UINTERESSERT}>Ikke interessert</option>
    </Select>
  );
};

export default VelgInternStatus;
