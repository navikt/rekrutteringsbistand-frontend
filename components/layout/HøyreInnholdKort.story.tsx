import HøyreInnholdKort from './HøyreInnholdKort';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: HøyreInnholdKort,
  args: {
    lukkSidebar: () => {},
    nesteSide: null,
    forrigeSide: null,
    ekspanderSidebar: () => {},
    ekspanderHøyre: false,
  },
  render: (args) => (
    <HøyreInnholdKort {...args}>
      <div className='p-4 space-y-2'>
        <p>Innhold i høyre kort.</p>
        <p>Bruk knappene i header for navigasjon / ekspansjon.</p>
      </div>
    </HøyreInnholdKort>
  ),
} satisfies Meta<typeof HøyreInnholdKort>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const MedNavigasjon: Story = {
  args: {
    nesteSide: () => alert('Neste side'),
    forrigeSide: () => alert('Forrige side'),
  },
};
