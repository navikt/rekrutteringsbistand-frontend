import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: Accordion,
  tags: ['autodocs'],
  args: { type: 'single', collapsible: true },
  argTypes: { type: { control: 'select', options: ['single', 'multiple'] } },
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Enkelt: Story = {
  render: (args) => (
    <Accordion {...args} className='w-80'>
      <AccordionItem value='a'>
        <AccordionTrigger>Første seksjon</AccordionTrigger>
        <AccordionContent>Innhold for første seksjon</AccordionContent>
      </AccordionItem>
      <AccordionItem value='b'>
        <AccordionTrigger>Andre seksjon</AccordionTrigger>
        <AccordionContent>Mer innhold i nummer to</AccordionContent>
      </AccordionItem>
      <AccordionItem value='c'>
        <AccordionTrigger>Tredje seksjon</AccordionTrigger>
        <AccordionContent>Enda litt innhold.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: { type: 'multiple' },
  render: (args) => (
    <Accordion {...args} className='w-80'>
      <AccordionItem value='1'>
        <AccordionTrigger>Seksjon 1</AccordionTrigger>
        <AccordionContent>Åpen samtidig med andre.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='2'>
        <AccordionTrigger>Seksjon 2</AccordionTrigger>
        <AccordionContent>Åpnes også.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
