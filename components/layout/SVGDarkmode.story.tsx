import SVGDarkmode from './SVGDarkmode';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: SVGDarkmode,
  tags: ['autodocs'],
  args: {
    light: '/nav.svg',
    dark: '/nav.svg',
    alt: 'NAV logo',
  },
} satisfies Meta<typeof SVGDarkmode>;
export default meta;
type Story = StoryObj<typeof meta>;

export const MedLightOgDark: Story = {};
export const BareSrc: Story = {
  args: { light: undefined, dark: undefined, src: '/nav.svg' },
};
