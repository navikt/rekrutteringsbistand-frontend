import NavigasjonWrapper from './NavigasjonWrapper';
import { BodyLong } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: NavigasjonWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigasjonWrapper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => (
    <NavigasjonWrapper>
      <div style={{ padding: '2rem' }}>
        <BodyLong>Innhold som vises i hovedflaten.</BodyLong>
      </div>
    </NavigasjonWrapper>
  ),
};
