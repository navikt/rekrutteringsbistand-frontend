import SideLayout from './SideLayout';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: SideLayout,
  render: (args) => (
    <SideLayout {...args}>
      <div className='p-6 space-y-4'>
        <p>Hovedinnhold</p>
        <p>Flere avsnitt med tekst for å demonstrere layout.</p>
      </div>
    </SideLayout>
  ),
  args: {
    fremdriftspanel: <div>Innhold i fremdriftspanel</div>,
  },
} satisfies Meta<typeof SideLayout>;
export default meta;

type Story = StoryObj<typeof meta>;

export const MedPanel: Story = { args: {} as any } as any;
export const SkjultPanel: Story = {
  args: { skjulFremdriftspanel: true } as any,
} as any;
