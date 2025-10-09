import { Button } from './button';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant='secondary'>Hold over</Button>
      </TooltipTrigger>
      <TooltipContent>Dette er en tooltip</TooltipContent>
    </Tooltip>
  ),
};

export const MedLangTekst: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Lang tekst</Button>
      </TooltipTrigger>
      <TooltipContent side='bottom' className='max-w-64'>
        Dette er en litt lengre forklaring som viser at tooltips kan brekke
        linjer og fortsatt se ryddige ut.
      </TooltipContent>
    </Tooltip>
  ),
};
