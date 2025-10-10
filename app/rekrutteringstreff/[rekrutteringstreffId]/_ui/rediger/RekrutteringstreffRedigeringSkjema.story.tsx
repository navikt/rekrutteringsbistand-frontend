import InnleggForm from './InnleggForm';
import Praktiskeforhold from './Praktiskeforhold';
import RekrutteringstreffForm from './RekrutteringstreffForm';
import RekrutteringstreffRedigering from './RekrutteringstreffRedigering';
import StedForm from './StedForm';
import SvarfristForm from './SvarfristForm';
import TidspunktForm from './TidspunktForm';
import TittelForm from './TittelForm';
import { MockRekrutteringstreffProvider } from '@/storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';

// Samlet inert oversikt over redigeringsskjema komponenter.

const meta = {
  tags: ['autodocs'],
  render: () => {
    const methods = useForm({
      defaultValues: {
        tittel: 'Demo treff',
        startdato: undefined,
        sluttdato: undefined,
        svarfrist: undefined,
      },
    });
    return (
      <MockRekrutteringstreffProvider>
        <FormProvider {...methods}>
          <div className='space-y-12 opacity-60 pointer-events-none'>
            <section className='space-y-2'>
              <h4 className='text-sm font-semibold'>
                Hoved (RekrutteringstreffRedigering)
              </h4>
              <RekrutteringstreffRedigering />
            </section>
            <section className='space-y-2'>
              <h4 className='text-sm font-semibold'>RekrutteringstreffForm</h4>
              <RekrutteringstreffForm rekrutteringstreffId='storybook-form'>
                <div className='text-xs text-gray-600'>
                  Children placeholder
                </div>
              </RekrutteringstreffForm>
            </section>
            <div className='grid md:grid-cols-2 gap-10'>
              <div className='space-y-4'>
                <h5 className='text-xs font-semibold uppercase tracking-wide'>
                  Delskjema
                </h5>
                <TittelForm onUpdated={() => {}} />
                <Praktiskeforhold />
                <StedForm />
                <TidspunktForm control={methods.control} />
                <SvarfristForm control={methods.control} />
              </div>
              <div className='space-y-4'>
                <h5 className='text-xs font-semibold uppercase tracking-wide'>
                  Innlegg
                </h5>
                <InnleggForm onUpdated={() => {}} />
              </div>
            </div>
          </div>
        </FormProvider>
      </MockRekrutteringstreffProvider>
    );
  },
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
