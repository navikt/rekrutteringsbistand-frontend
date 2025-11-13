import StillingTabs from './StillingTabs';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert tabs (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <StillingTabs />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
