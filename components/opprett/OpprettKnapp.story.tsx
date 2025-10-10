import { OpprettKnapp } from './OpprettKnapp';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: OpprettKnapp,
  args: { kategori: Stillingskategori.Stilling },
} satisfies Meta<typeof OpprettKnapp>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Stilling: Story = {
  args: { kategori: Stillingskategori.Stilling },
};
export const Formidling: Story = {
  args: { kategori: Stillingskategori.Formidling },
};
