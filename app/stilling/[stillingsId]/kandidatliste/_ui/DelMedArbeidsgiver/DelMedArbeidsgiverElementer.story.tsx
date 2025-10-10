import DelMedArbeidsgiver from './DelMedArbeidsgiver';
import { createKandidatlisteMock } from '@/.storybook/ContextDecorators';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert (ryddes ved behov)
const meta = {
  tags: ['autodocs'],
  render: () => {
    const mockKandidatliste = createKandidatlisteMock({ antall: 2 });
    return (
      <div className='opacity-60 pointer-events-none'>
        <DelMedArbeidsgiver markerteKandidater={mockKandidatliste.kandidater} />
      </div>
    );
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
