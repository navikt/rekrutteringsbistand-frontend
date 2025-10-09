import InternStatusTag from './InternStatusTag';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: InternStatusTag,
} satisfies Meta<typeof InternStatusTag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vurderes: Story = {
  args: { status: InternKandidatstatus.VURDERES },
};
export const Kontaktet: Story = {
  args: { status: InternKandidatstatus.KONTAKTET },
};
export const Aktuell: Story = {
  args: { status: InternKandidatstatus.AKTUELL },
};
export const TilIntervju: Story = {
  args: { status: InternKandidatstatus.TIL_INTERVJU },
};
export const Uaktuell: Story = {
  args: { status: InternKandidatstatus.UAKTUELL },
};
export const Uinteressert: Story = {
  args: { status: InternKandidatstatus.UINTERESSERT },
};
