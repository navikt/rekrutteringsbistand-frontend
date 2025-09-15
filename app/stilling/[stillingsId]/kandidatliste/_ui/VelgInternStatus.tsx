import InternStatusTag, {
  internStatusIcon,
  internStatusTekst,
} from './InternStatusTag';
import { endreKandidatStatus } from '@/app/api/kandidat/endreKandidatStatus';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface VelgInternStatusProps {
  status: InternKandidatstatus;
  kandidatnr: string;
  lukketKandidatliste: boolean;
}

const alleStatuser: InternKandidatstatus[] = Object.values(
  InternKandidatstatus,
) as InternKandidatstatus[];

const VelgInternStatus: FC<VelgInternStatusProps> = ({
  kandidatnr,
  status,
  lukketKandidatliste,
}) => {
  const { reFetchKandidatliste, kandidatlisteId } = useKandidatlisteContext();
  const [pending, setPending] = useState(false);

  const endreStatus = async (ny: InternKandidatstatus) => {
    if (pending || ny === status) return;
    setPending(true);
    try {
      await endreKandidatStatus(kandidatlisteId, kandidatnr, ny);
      reFetchKandidatliste();
    } finally {
      setPending(false);
    }
  };

  return (
    <Dropdown>
      <div className='flex justify-left'>
        <InternStatusTag status={status} />
        <Button
          disabled={lukketKandidatliste || pending}
          size='small'
          icon={<PencilIcon aria-hidden />}
          variant='tertiary-neutral'
          aria-label='Endre intern status'
          as={Dropdown.Toggle}
        />
      </div>
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          {alleStatuser.map((s) => (
            <Dropdown.Menu.GroupedList.Item
              key={s}
              onClick={() => endreStatus(s)}
            >
              {internStatusIcon(s)}
              {internStatusTekst(s)}
            </Dropdown.Menu.GroupedList.Item>
          ))}
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default VelgInternStatus;
