import InternStatusTag, {
  internStatusIcon,
  internStatusTekst,
} from './InternStatusTag';
import { endreKandidatStatus } from '@/app/api/kandidat/endreKandidatStatus';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';
import { useEffect, useState, type FC } from 'react';

export interface VelgInternStatusProps {
  status: InternKandidatstatus;
  kandidatnr: string;
  lukketKandidatliste: boolean;
}

const VelgInternStatus: FC<VelgInternStatusProps> = ({
  kandidatnr,
  status,
  lukketKandidatliste,
}) => {
  const { reFetchKandidatliste, kandidatlisteId } = useKandidatlisteContext();
  const [valgtStatus, setValgtStatus] = useState<InternKandidatstatus>(status);
  useEffect(() => {
    setValgtStatus(status);
  }, [status]);

  const endreStatus = (status: InternKandidatstatus) => {
    setValgtStatus(status);
    endreKandidatStatus(kandidatlisteId, kandidatnr, status);
    reFetchKandidatliste();
  };

  return (
    <>
      <Dropdown>
        <div className='flex justify-left'>
          <InternStatusTag status={valgtStatus} />
          <Button
            disabled={lukketKandidatliste}
            size='small'
            icon={<PencilIcon />}
            variant='tertiary-neutral'
            as={Dropdown.Toggle}
          />
        </div>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            {(Object.keys(InternKandidatstatus) as InternKandidatstatus[]).map(
              (status) => (
                <Dropdown.Menu.GroupedList.Item
                  key={status}
                  onClick={() => endreStatus(status)}
                >
                  {internStatusIcon(status)}
                  {internStatusTekst(status)}
                </Dropdown.Menu.GroupedList.Item>
              ),
            )}
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default VelgInternStatus;
