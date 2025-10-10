import RekrutteringstreffFeatureToggle from './RekrutteringstreffFeatureToggle';
import { BodyLong } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: RekrutteringstreffFeatureToggle,
  tags: ['autodocs'],
} satisfies Meta<typeof RekrutteringstreffFeatureToggle>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { children: <BodyLong>Kun synlig for utvikler-rolle.</BodyLong> },
  render: (args) => (
    <RekrutteringstreffFeatureToggle>
      {args.children}
    </RekrutteringstreffFeatureToggle>
  ),
};
