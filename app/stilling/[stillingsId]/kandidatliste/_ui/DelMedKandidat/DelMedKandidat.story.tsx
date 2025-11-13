import DelMedKandidatModal from './DelMedKandidatModal';
import VelgSvarfrist from './VelgSvarfrist';
import { MockStillingsProvider } from '@/.storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Del med kandidat moduler (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='pointer-events-none max-w-lg space-y-10 opacity-60'>
        <VelgSvarfrist setValgtSvarfrist={() => {}} />
        <DelMedKandidatModal
          markerteKandidater={[]}
          fjernAllMarkering={() => {}}
        />
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
