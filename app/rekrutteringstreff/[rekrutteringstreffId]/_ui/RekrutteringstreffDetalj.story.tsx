import RekrutteringstreffDetalj from './RekrutteringstreffDetalj';
import { MockRekrutteringstreffProvider } from '@/.storybook/mocks';
import { PlusIcon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Detaljvisning (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <MockRekrutteringstreffProvider>
        <RekrutteringstreffDetalj
          tittelIkon={<PlusIcon aria-hidden />}
          tittel='Detaljer'
          knapp={
            <button type='button' className='btn'>
              Handling
            </button>
          }
        >
          <p className='text-sm'>Innhold / children</p>
        </RekrutteringstreffDetalj>
      </MockRekrutteringstreffProvider>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
