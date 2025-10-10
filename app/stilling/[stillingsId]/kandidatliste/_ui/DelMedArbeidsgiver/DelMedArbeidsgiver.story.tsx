import DelMedArbeidsgiver from './DelMedArbeidsgiver';
import ForhåndsvisningAvEpost from './ForhåndsvisningAvEpost';
import { MockStillingsProvider } from '@/storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Del med arbeidsgiver moduler (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='space-y-10 opacity-60 pointer-events-none max-w-2xl'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>DelMedArbeidsgiver</h4>
          <DelMedArbeidsgiver markerteKandidater={[]} />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>ForhåndsvisningAvEpost</h4>
          <ForhåndsvisningAvEpost
            opprettetAvNavn='Veileder Veiledersen'
            stillingstittel='Utvikler'
          />
        </section>
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
