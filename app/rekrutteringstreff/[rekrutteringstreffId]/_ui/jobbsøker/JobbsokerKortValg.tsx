import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface JobbsøkerValgProps {
  onEndreSvar: () => void;
}

const JobbsøkerKortValg: FC<JobbsøkerValgProps> = ({ onEndreSvar }) => {
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
          <ActionMenu.Group label={''}></ActionMenu.Group>
          <ActionMenu.Group label={''}>
            <ActionMenu.Item onSelect={() => onEndreSvar()}>
              Endre svar for brukeren
            </ActionMenu.Item>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    </>
  );
};

export default JobbsøkerKortValg;
