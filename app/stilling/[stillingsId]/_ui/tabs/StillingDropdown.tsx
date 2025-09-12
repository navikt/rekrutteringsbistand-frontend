import {
  MenuElipsisHorizontalIcon,
  PadlockLockedIcon,
  TabsAddIcon,
  TrashIcon,
} from '@navikt/aksel-icons';
import { Button, Dropdown } from '@navikt/ds-react';

export default function StillingDropdown() {
  return (
    <Dropdown>
      <Button
        variant='tertiary'
        icon={<MenuElipsisHorizontalIcon />}
        as={Dropdown.Toggle}
      />
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
            <PadlockLockedIcon />
            Ta over eierskap
          </Dropdown.Menu.GroupedList.Item>
          <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
            <TabsAddIcon />
            Dupliser oppdraget
          </Dropdown.Menu.GroupedList.Item>

          <Dropdown.Menu.GroupedList.Item onClick={() => {}}>
            <TrashIcon />
            Avbryt oppdraget
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  );
}
