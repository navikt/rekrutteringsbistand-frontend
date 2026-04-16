import EndreSvarJobbsøkerModal from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/EndreSvarJobbsøkerModal';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { useState, type FC } from 'react';

export interface JobbsøkerValgProps {
  rekrutteringstreffId: string;
  personTreffId: string;
  fornavn: string;
  etternavn: string;
}

const JobbsøkerKortValg: FC<JobbsøkerValgProps> = ({
  personTreffId,
  rekrutteringstreffId,
  fornavn,
  etternavn,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [visEndreSvarJobbsøkerModal, setVisEndreSvarJobbsøkerModal] =
    useState(false);

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
            <ActionMenu.Item
              onSelect={() => setVisEndreSvarJobbsøkerModal(true)}
            >
              Endre svar for brukeren
            </ActionMenu.Item>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
      {visEndreSvarJobbsøkerModal && (
        <EndreSvarJobbsøkerModal
          rekrutteringstreffId={rekrutteringstreffId}
          personTreffId={personTreffId}
          fornavn={fornavn}
          etternavn={etternavn}
          lukkModal={() => setVisEndreSvarJobbsøkerModal(false)}
        />
      )}
    </>
  );
};

export default JobbsøkerKortValg;
