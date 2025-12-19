import InnleggForm from './InnleggForm';
import Praktiskeforhold from './Praktiskeforhold';
import RekrutteringstreffForm, {
  RekrutteringstreffFormValues,
} from './RekrutteringstreffForm';
import RekrutteringstreffRedigering from './RekrutteringstreffRedigering';
import StedForm from './StedForm';
import SvarfristForm from './SvarfristForm';
import TidspunktForm from './TidspunktForm';
import TittelForm from './TittelForm';
import { MockRekrutteringstreffProvider } from '@/.storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';

// Samlet inert oversikt over redigeringsskjema komponenter.

const meta = {
  tags: ['autodocs'],
  render: () => {
    const methods = useForm<RekrutteringstreffFormValues>({
      defaultValues: {
        tittel: 'Demo treff',
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
      <MockRekrutteringstreffProvider>
        <FormProvider {...methods}>
          <div className='pointer-events-none space-y-12 opacity-60'>
            <section className='space-y-2'>
              <h4 className='text-sm font-semibold'>
                Hoved (RekrutteringstreffRedigering)
              </h4>
              <RekrutteringstreffRedigering />
            </section>
            <section className='space-y-2'>
              <h4 className='text-sm font-semibold'>RekrutteringstreffForm</h4>
              <RekrutteringstreffForm>
                <div className='text-xs text-[var(--ax-text-neutral-subtle)]'>
                  Children placeholder
                </div>
              </RekrutteringstreffForm>
            </section>
            <div className='grid gap-10 md:grid-cols-2'>
              <div className='space-y-4'>
                <h5 className='text-xs font-semibold tracking-wide uppercase'>
                  Delskjema
                </h5>
                <TittelForm onUpdated={() => {}} />
                <Praktiskeforhold />
                <StedForm />
                <TidspunktForm control={methods.control} />
                <SvarfristForm control={methods.control} />
              </div>
              <div className='space-y-4'>
                <h5 className='text-xs font-semibold tracking-wide uppercase'>
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
