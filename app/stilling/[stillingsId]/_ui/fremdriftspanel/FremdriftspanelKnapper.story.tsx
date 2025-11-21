import EndreSøkeforslag from './EndreSøkeforslag';
import RedigerStillingKnapp from './RedigerStillingKnapp';
import StoppStillingKnapp from './StoppStillingKnapp';
import GjenåpneStillingKnapp from './fullfør-stilling/GjenåpneStillingKnapp';
import FullførStillingKnapp from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingKnapp';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Knapper isolert (duplikat sti – ryddes ved behov)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none flex flex-wrap gap-3 opacity-60'>
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
