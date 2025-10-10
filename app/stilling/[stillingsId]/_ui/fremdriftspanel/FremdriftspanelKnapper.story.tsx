import EndreSøkeforslag from './EndreSøkeforslag';
import RedigerStillingKnapp from './RedigerStillingKnapp';
import StoppStillingKnapp from './StoppStillingKnapp';
import FullførStillingKnapp from './fullfør-stilling/FullførStillingKnapp';
import GjenåpneStillingKnapp from './fullfør-stilling/GjenåpneStillingKnapp';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Knapper isolert (duplikat sti – ryddes ved behov)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='flex flex-wrap gap-3 opacity-60 pointer-events-none'>
      <StoppStillingKnapp />
      <RedigerStillingKnapp />
      <FullførStillingKnapp />
      <GjenåpneStillingKnapp />
      <EndreSøkeforslag />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
