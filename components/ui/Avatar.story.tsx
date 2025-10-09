import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Avatar,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Avatar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MedBilde: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='https://i.pravatar.cc/100?img=12' alt='Bruker' />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src='/no-such-image.png' alt='Ugyldig' />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};
