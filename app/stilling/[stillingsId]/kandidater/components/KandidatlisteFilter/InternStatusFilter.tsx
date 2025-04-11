import { storForbokstavString } from '../../../../../kandidat/util';
import { InternKandidatstatus } from '../../KandidatTyper';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import * as React from 'react';

const InternStatusFilter: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <ActionMenu open={open} onOpenChange={setOpen}>
      <ActionMenu.Trigger>
        <Button
          iconPosition='right'
          variant='tertiary'
          icon={<ChevronDownIcon />}
          size='small'
        >
          Intern status
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <CheckboxGroup legend='Intern status' hideLegend onChange={console.log}>
          {Object.entries(InternKandidatstatus).map(([key, value]) => (
            <Checkbox key={key} value={key}>
              {storForbokstavString(value ?? '').replace(/_/g, ' ')}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

export default InternStatusFilter;
