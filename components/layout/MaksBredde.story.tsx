import MaksBredde from './MaksBredde';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: MaksBredde,
  tags: ['autodocs'],
} satisfies Meta<typeof MaksBredde>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Innhold innenfor maks bredde (1440px)' },
  render: (args) => (
    <MaksBredde>
      <div style={{ background: 'var(--ax-surface-info-subtle)', padding: 24 }}>
        {args.children}
      </div>
    </MaksBredde>
  ),
};
