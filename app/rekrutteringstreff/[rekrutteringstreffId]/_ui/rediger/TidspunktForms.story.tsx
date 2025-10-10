import SvarfristForm from './SvarfristForm';
import TidspunktForm from './TidspunktForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Tidspunkt relaterte skjema (duplisert)
const mockControl = {
  register: () => ({}),
  control: {},
  handleSubmit: () => () => {},
  watch: () => {},
  setValue: () => {},
  getValues: () => ({}),
  formState: { errors: {} },
};

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-6 opacity-60 pointer-events-none'>
      <TidspunktForm control={mockControl} />
      <SvarfristForm control={mockControl} />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
