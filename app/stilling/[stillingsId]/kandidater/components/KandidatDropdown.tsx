import { MenuElipsisVerticalIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import * as React from 'react';

// export interface KandidatDropdownProps {
//   children?: React.ReactNode | undefined;
// }

const KandidatDropdown: React.FC = ({}) => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant='tertiary-neutral'
          icon={<MenuElipsisVerticalIcon title='Saksmeny' />}
          size='small'
        />
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Item onSelect={console.info}>Ta sak</ActionMenu.Item>
        <ActionMenu.Sub>
          <ActionMenu.SubTrigger>Endre status</ActionMenu.SubTrigger>
          <ActionMenu.SubContent>
            <ActionMenu.Item onSelect={console.info}>Avslått</ActionMenu.Item>
            <ActionMenu.Item onSelect={console.info}>Godkjent</ActionMenu.Item>
            <ActionMenu.Sub>
              <ActionMenu.SubTrigger>Andre valg</ActionMenu.SubTrigger>
              <ActionMenu.SubContent>
                <ActionMenu.Item onSelect={console.info}>
                  Til godkjenning
                </ActionMenu.Item>
                <ActionMenu.Item onSelect={console.info}>
                  Under behandling
                </ActionMenu.Item>
                <ActionMenu.Item onSelect={console.info}>
                  Under kontroll
                </ActionMenu.Item>
              </ActionMenu.SubContent>
            </ActionMenu.Sub>
          </ActionMenu.SubContent>
        </ActionMenu.Sub>
        <ActionMenu.Sub>
          <ActionMenu.SubTrigger>Tildel saksbehandler</ActionMenu.SubTrigger>
          <ActionMenu.SubContent>
            <ActionMenu.Group label='Saksbehandlere'>
              <ActionMenu.Item onSelect={console.info}>
                Ola Normann
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info}>
                Bo Ramberg
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info} disabled>
                Ole Olsen
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info} disabled>
                Janne Nilssen
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info}>
                Karin Jakobsen
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info}>
                Kari Nordmann
              </ActionMenu.Item>
            </ActionMenu.Group>
          </ActionMenu.SubContent>
        </ActionMenu.Sub>

        <ActionMenu.Divider />
        <ActionMenu.Item variant='danger' onSelect={console.info}>
          Slett kandidat
        </ActionMenu.Item>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

export default KandidatDropdown;
