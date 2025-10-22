import PubliserModal from './PubliserModal';
import EndreStillingStatus from './_felles/EndreStillingStatus';
import { MockStillingsProvider } from '@/.storybook/mocks';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { PencilWritingIcon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Publiseringsrelaterte moduler (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='space-y-8 opacity-60 pointer-events-none max-w-lg'>
        <PubliserModal disabled />
        <EndreStillingStatus
          nyStatus={StillingsStatus.Aktiv}
          tekst='Sett stillingen til aktiv?'
          knappNavn='Sett aktiv'
          knappIkon={<PencilWritingIcon aria-hidden />}
        />
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
