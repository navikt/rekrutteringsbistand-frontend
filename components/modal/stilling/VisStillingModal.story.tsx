import VisStillingModal from '@/components/modal/stilling/VisStillingModal';
import { Button } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

// Inert forhåndsvisning for kandidat.

const meta = {
  parameters: {
    query: { finnStilling: '1' },
  },
  tags: ['autodocs'],
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: '1rem' }}>
        <Button onClick={() => setOpen(true)}>Vis stilling modal</Button>
        {open && (
          <VisStillingModal
            tittel={'Tittel input for modal'}
            stillingsId='minStilling'
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    );
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};
