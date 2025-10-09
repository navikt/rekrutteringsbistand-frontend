import KandidatlisteTittel from './KandidatlisteTittel';
import LagreIKandidatlisteButton from './LagreIKandidatlisteButton';
// Modal krever flere hooks/context; holder den kommentert i inert visning til videre mock er på plass
// import LagreIKandidatlisteModal from './LagreIKandidatlisteModal';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert lagre kandidatliste komponenter (duplisert for korrekt sti – se eventuell ryddejobb senere)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-8 opacity-60 pointer-events-none max-w-md'>
      <KandidatlisteTittel stillingsId='demo-stilling' />
      <LagreIKandidatlisteButton />
      {/* <LagreIKandidatlisteModal onClose={() => {}} /> */}
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
