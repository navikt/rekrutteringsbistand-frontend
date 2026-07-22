import { JobbsøkerStatusType } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkerSøk';
import { RekrutteringstreffStatusType } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { ActionMenyPunkt } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/ActionMenyPunkt';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatus,
} from '@/app/rekrutteringstreff/_types/constants';
import {
  MenuElipsisVerticalIcon,
  PencilIcon,
  PersonCheckmarkIcon,
  TrashIcon,
  XMarkIcon,
} from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface JobbsøkerValgProps {
  endreSvar: () => void;
  slettJobbsøker: () => void;
  jobbsøkerStatus: JobbsøkerStatusType;
  rekrutteringstreffStatus: RekrutteringstreffStatusType;
  visOppmøte?: boolean;
  erMøtt?: boolean;
  onToggleOppmøte?: () => void;
}

const JobbsøkerKortValg: FC<JobbsøkerValgProps> = ({
  endreSvar,
  slettJobbsøker,
  jobbsøkerStatus,
  rekrutteringstreffStatus,
  visOppmøte = false,
  erMøtt = false,
  onToggleOppmøte,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <ActionMenu open={menuOpen} onOpenChange={(open) => setMenuOpen(open)}>
        <ActionMenu.Trigger>
          <Button
            data-color='neutral'
            variant='tertiary'
            icon={<MenuElipsisVerticalIcon title='Saksmeny' />}
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setMenuOpen(!menuOpen);
            }}
          />
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          {visOppmøte && (
            <>
              <ActionMenyPunkt
                ikon={erMøtt ? <XMarkIcon /> : <PersonCheckmarkIcon />}
                tekst={erMøtt ? 'Fjern oppmøte' : 'Registrer oppmøte'}
                onSelect={() => onToggleOppmøte?.()}
              />
              <ActionMenu.Divider />
            </>
          )}
          <ActionMenyPunkt
            ikon={<PencilIcon />}
            tekst='Endre svar'
            onSelect={() => endreSvar()}
            disabled={
              rekrutteringstreffStatus !== RekrutteringstreffStatus.PUBLISERT ||
              [
                JobbsøkerStatus.LAGT_TIL.toString(),
                JobbsøkerStatus.SLETTET.toString(),
              ].includes(jobbsøkerStatus)
            }
            disabledTooltip='Kan kun endre svar når jobbsøker er invitert og treffet er i status publisert'
          />

          <ActionMenu.Divider />

          <ActionMenu.Group label={''}>
            <ActionMenyPunkt
              ikon={<TrashIcon title='Slett' />}
              tekst='Slett'
              onSelect={() => slettJobbsøker()}
              disabled={jobbsøkerStatus !== JobbsøkerStatus.LAGT_TIL}
              disabledTooltip='Kan ikke slette jobbsøker som er invitert'
              variant='danger'
            />
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    </>
  );
};

export default JobbsøkerKortValg;
