import { EndreArkivertStatusKnapp } from './EndreArkivertStatusModal';
import { ActionMenu, Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef, useState } from 'react';

const meta = {
  tags: ['autodocs'],
  component: EndreArkivertStatusKnapp,
} satisfies Meta<typeof EndreArkivertStatusKnapp>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SomKnapp: Story = {
  args: { lukketKandidatliste: false, modalRef: { current: null } as any },
  render: ({ lukketKandidatliste }) => {
    const ref = useRef<HTMLDialogElement>(null);
    return (
      <EndreArkivertStatusKnapp
        modalRef={ref as unknown as React.RefObject<HTMLDialogElement>}
        lukketKandidatliste={lukketKandidatliste}
      />
    );
  },
};

export const IHandlingMeny: Story = {
  args: {
    lukketKandidatliste: false,
    actionMenu: true,
    modalRef: { current: null } as any,
  },
  render: ({ lukketKandidatliste }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    return (
      <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Åpne meny
        </Button>
        <ActionMenu.Content>
          <EndreArkivertStatusKnapp
            actionMenu
            modalRef={ref as unknown as React.RefObject<HTMLDialogElement>}
            lukketKandidatliste={lukketKandidatliste}
          />
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
};
