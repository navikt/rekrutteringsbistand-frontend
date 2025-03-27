import { endreKandidatStatus } from '../../../../api/kandidat/endreKandidatStatus';
import { InternKandidatstatus } from './KandidatTyper';
import {
  CircleSlashIcon,
  ClipboardCheckmarkIcon,
  ClipboardIcon,
  FileXMarkIcon,
  PencilIcon,
  PersonChatIcon,
  ReceptionIcon,
} from '@navikt/aksel-icons';
import { Button, Dropdown, Tag } from '@navikt/ds-react';
import * as React from 'react';

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

  React.useEffect(() => {
    setValgtStatus(status);
  }, [status]);

  const endreStatus = (status: InternKandidatstatus) => {
    setValgtStatus(status);
    endreKandidatStatus(kandidatlisteId, kandidatnr, status);
  };

  const formatStatus = (status: string): string => {
    // Split by underscore and convert each part to PascalCase
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const formIcon = (status: InternKandidatstatus) => {
    switch (status) {
      case InternKandidatstatus.VURDERES:
        return <ClipboardIcon />;
      case InternKandidatstatus.KONTAKTET:
        return <PersonChatIcon />;
      case InternKandidatstatus.AKTUELL:
        return <ClipboardCheckmarkIcon />;
      case InternKandidatstatus.TIL_INTERVJU:
        return <ReceptionIcon />;
      case InternKandidatstatus.UAKTUELL:
        return <FileXMarkIcon />;
      case InternKandidatstatus.UINTERESSERT:
        return <CircleSlashIcon />;
      default:
        return '';
    }
  };

  const tagVariant = (status: InternKandidatstatus) => {
    switch (status) {
      case InternKandidatstatus.VURDERES:
        return 'neutral';
      case InternKandidatstatus.KONTAKTET:
        return 'neutral';
      case InternKandidatstatus.AKTUELL:
        return 'info';
      case InternKandidatstatus.TIL_INTERVJU:
        return 'info';
      case InternKandidatstatus.UAKTUELL:
        return 'alt1';
      case InternKandidatstatus.UINTERESSERT:
        return 'alt1';
      default:
        return 'neutral';
    }
  };

  return (
    <>
      <Dropdown>
        <div className='flex justify-center'>
          <Tag
            variant={tagVariant(valgtStatus)}
            className='flex justify-center gap-2
            '
          >
            {formIcon(valgtStatus)} {formatStatus(valgtStatus)}
          </Tag>
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
                  {formIcon(status)}
                  {formatStatus(status)}
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
