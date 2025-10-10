import Infokort, { InfokortSkeleton } from './Infokort';
import { BriefcaseIcon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Infokort,
  tags: ['autodocs'],
  args: {
    tittel: 'Antall kandidater',
    tall: 42,
    ikonFront: true,
    ikon: <BriefcaseIcon aria-hidden />,
  },
} satisfies Meta<typeof Infokort>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
export const MedDetaljer: Story = {
  args: {
    detaljer: [
      { beskrivelse: 'Under 30 år', tall: 10 },
      { beskrivelse: 'Innsatsgruppe annet', tall: 5 },
    ],
  },
};
export const MedBeskrivelse: Story = {
  args: { beskrivelse: 'Periode: siste 30 dager' },
};
export const Skeleton: Story = { render: () => <InfokortSkeleton /> };
