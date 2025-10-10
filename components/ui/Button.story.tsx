import { Button } from './button';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SparklesIcon } from 'lucide-react';

const meta = {
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Klikk meg', variant: 'default', size: 'default' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
export const MedIkon: Story = {
  args: {
    children: (
      <>
        <SparklesIcon /> Med ikon
      </>
    ),
    variant: 'secondary',
  },
};
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Slett' },
};
export const Link: Story = {
  args: { variant: 'link', children: 'Lenke-stil' },
};
