import AutoBreadcrumbs, { defaultPathConfig, PathConfig } from './Brødsmuler';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta<typeof AutoBreadcrumbs> = {
  component: AutoBreadcrumbs,
  argTypes: {
    erstattPath: {
      control: 'object',
      description:
        "Tuple [originalSegment, nyLabel] – erstatter ett segment i path'en",
    },
  },
};
export default meta;

type Story = StoryObj<typeof AutoBreadcrumbs>;

export const Standard: Story = {
  render: (args: any) => (
    <AutoBreadcrumbs {...args} forcedPath='/stilling/123' />
  ),
  args: {
    erstattPath: ['123', 'Servitørstilling'],
  },
};

export const UtenOverride: Story = {
  render: (args: any) => (
    <AutoBreadcrumbs {...args} forcedPath='/kandidat/987654' />
  ),
  args: {
    erstattPath: undefined,
  },
};

export const MedCustomMapping: Story = {
  render: (args: any) => {
    const custom: PathConfig = {
      ...defaultPathConfig,
      admin: { label: 'Admin' },
      rapporter: { label: 'Rapporter' },
    };
    return (
      <AutoBreadcrumbs
        {...args}
        pathConfig={custom}
        forcedPath='/admin/rapporter/2024/kvartal-1'
      />
    );
  },
};

export const Width200: Story = {
  render: (args: any) => (
    <div
      style={{
        width: 400,
        border: '1px dashed var(--ax-border-neutral-subtle)',
        padding: '4px',
      }}
    >
      <AutoBreadcrumbs
        {...args}
        forcedPath='/stilling/avdeling/region/område/underområde/detalj/123'
      />
    </div>
  ),
  name: 'Ellipsis ved smal bredde (200px)',
  args: {
    erstattPath: ['123', 'Detalj'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Viser automatisk ellipsis når containerbredden er for liten. Containeren er satt til 200px.',
      },
    },
  },
};

// Tidligere fantes en manuell ellipsis-variant; nå brukes dynamisk bredde.
