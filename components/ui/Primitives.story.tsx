import { Input } from './input';
import { Label } from './label';
import { Separator } from './separator';
import { Skeleton } from './skeleton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {
  render: () => (
    <div className='flex w-[320px] flex-col gap-6'>
      <section className='flex flex-col gap-2'>
        <h4 className='text-sm font-semibold'>Label + Input</h4>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='navn'>Navn</Label>
          <Input id='navn' placeholder='Skriv...' />
        </div>
      </section>
      <Separator />
      <section className='flex flex-col gap-2'>
        <h4 className='text-sm font-semibold'>Skeleton</h4>
        <Skeleton className='h-4 w-2/3' />
        <Skeleton className='h-4 w-1/3' />
        <Skeleton className='h-8 w-full' />
      </section>
    </div>
  ),
};
