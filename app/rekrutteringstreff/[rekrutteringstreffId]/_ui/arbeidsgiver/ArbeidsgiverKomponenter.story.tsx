import ArbeidsgiverKort from './ArbeidsgiverKort';
import Arbeidsgivere from './Arbeidsgivere';
import LeggTilArbeidsgiverModal from './LeggTilArbeidsgiverModal';
import SlettArbeidsgiverModal from './SlettArbeidsgiverModal';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import { MockRekrutteringstreffProvider } from '@/.storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert samling (API + context-avhengig); modalene rendres uten åpning.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockRekrutteringstreffProvider>
      <div className='pointer-events-none space-y-10 opacity-60'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>ArbeidsgiverKort</h4>
          <ArbeidsgiverKort
            navn='Eksempelbedrift AS'
            organisasjonsnummer='999999999'
            gateadresse='Storgata 1'
            postnummer='0155'
            poststed='Oslo'
            status='Lagt til'
          />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Arbeidsgivere (liste)</h4>
          <Arbeidsgivere />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>VelgArbeidsgiver</h4>
          <VelgArbeidsgiver arbeidsgiverCallback={() => {}} />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Modaler</h4>
          <div className='flex flex-wrap gap-4'>
            <LeggTilArbeidsgiverModal modalRef={{ current: null } as any} />
            <SlettArbeidsgiverModal
              navn='Eksempelbedrift AS'
              loading={false}
              disabled={false}
              onConfirm={() => {}}
              arbeidsgivereHook={{ mutate: () => {} } as any}
              variant='trash'
              renderTrigger={() => null as any}
            />
          </div>
        </section>
      </div>
    </MockRekrutteringstreffProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
