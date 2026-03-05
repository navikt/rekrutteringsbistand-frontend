import KandidatKort from './KandidatKort';
import { getSingleKandidatDataSchema } from '@/app/api/kandidat-sok/mocks/kandidat.mock';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Lager et par kandidater
const kandidat = getSingleKandidatDataSchema(1);
const alleredeLagtTil: string[] = [kandidat.arenaKandidatnr].filter(
  (v): v is string => typeof v === 'string',
);

const Wrapper = (props: any) => (
  <KandidatSøkMarkerteContextProvider>
    <KandidatKort {...props} />
  </KandidatSøkMarkerteContextProvider>
);

const meta = {
  tags: ['autodocs'],
  component: KandidatKort,
} satisfies Meta<typeof KandidatKort>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { kandidat },
};

export const MarkertOgLagtTil: Story = {
  render: (args) => <Wrapper {...args} />,
  args: { kandidat, alleredeLagtTil },
};
