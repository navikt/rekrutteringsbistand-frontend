import {
  BodyShort,
  Button,
  Heading,
  Radio,
  RadioGroup,
} from '@navikt/ds-react';
import * as React from 'react';
import { endreKandidatStatus } from '../../../../api/kandidat/endreKandidatStatus';
import { Kandidatstatus } from '../KandidatIKandidatlisteTyper';

export interface VelgStatusProps {
  status: Kandidatstatus;
  kandidatlisteId: string;
  kandidatnr: string;
}
//TODO Enable this
const VelgStatus: React.FC<VelgStatusProps> = ({
  kandidatlisteId,
  kandidatnr,
  status,
}) => {
  const [valgtStatus, setValgtStatus] = React.useState<Kandidatstatus>(status);
  return (
    <div>
      <Heading size='small' spacing>
        Velg intern status
      </Heading>
      <RadioGroup legend='' value={valgtStatus} onChange={setValgtStatus}>
        <Radio value={Kandidatstatus.Vurderes}>
          Vurderes
          <BodyShort size='small' className='text-gray-600'>
            Settes automatisk når en kandidat legges i listen
          </BodyShort>
        </Radio>
        <Radio value={Kandidatstatus.Kontaktet}>Kontaktet</Radio>
        <Radio value={Kandidatstatus.Aktuell}>Aktuell</Radio>
        <Radio value={Kandidatstatus.TilIntervju}>Til intervju</Radio>
        <Radio value={Kandidatstatus.Uaktuell}>Ikke aktuell</Radio>
        <Radio value={Kandidatstatus.Uinteressert}>Ikke interessert</Radio>
      </RadioGroup>
      <Button
        disabled={valgtStatus === status}
        onClick={() =>
          endreKandidatStatus(kandidatlisteId, kandidatnr, valgtStatus)
        }
        variant='primary'
        size='small'
        className='mt-4'
      >
        Lagre status
      </Button>
    </div>
  );
};

export default VelgStatus;
