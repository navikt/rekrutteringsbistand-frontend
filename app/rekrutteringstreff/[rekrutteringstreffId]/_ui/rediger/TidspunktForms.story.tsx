import { RekrutteringstreffFormValues } from './RekrutteringstreffForm';
import SvarfristForm from './SvarfristForm';
import TidspunktForm from './TidspunktForm';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';

const meta = {
  tags: ['autodocs'],
  render: () => {
    const { control } = useForm<RekrutteringstreffFormValues>({
      defaultValues: {
        tittel: '',
        gateadresse: null,
        postnummer: null,
        poststed: null,
        fraDato: null,
        fraTid: '08:00',
        tilDato: null,
        tilTid: '08:00',
        svarfristDato: null,
        svarfristTid: '08:00',
      },
    });

    return (
      <div className='space-y-6 opacity-60 pointer-events-none'>
        <TidspunktForm control={control} />
        <SvarfristForm control={control} />
      </div>
    );
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
