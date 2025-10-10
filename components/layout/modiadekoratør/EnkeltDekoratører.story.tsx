import DevDekoratør from './DevDekoratør';
import NavDekoratør from './NavDekoratør';
import UtviklerDekoratør from './UtviklerDekoratør';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Individuelle dekoratør-varianter (samlet i egen oversikt)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none space-y-6'>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>DevDekoratør</h4>
        <DevDekoratør />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>NavDekoratør</h4>
        <NavDekoratør />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>UtviklerDekoratør</h4>
        <UtviklerDekoratør />
      </div>
    </div>
  ),
} satisfies Meta;
export default meta;

export type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
