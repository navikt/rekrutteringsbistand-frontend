import { Input } from './input';
import { Label } from './label';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta = {
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Skriv noe...' },
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
export const MedLabel: Story = {
  render: (args) => (
    <div className='flex flex-col gap-2 w-64'>
      <Label htmlFor='felt'>Navn</Label>
      <Input id='felt' {...args} />
    </div>
  ),
};
export const Kontrollert: Story = {
  render: (args) => {
    const [verdi, setVerdi] = useState('Initial');
    return (
      <div className='flex flex-col gap-2 w-64'>
        <Label htmlFor='kontroll'>Kontrollert input</Label>
        <Input
          id='kontroll'
          value={verdi}
          onChange={(e) => setVerdi(e.target.value)}
          {...args}
        />
        <div className='text-xs text-muted-foreground'>Verdi: {verdi}</div>
      </div>
    );
  },
};
