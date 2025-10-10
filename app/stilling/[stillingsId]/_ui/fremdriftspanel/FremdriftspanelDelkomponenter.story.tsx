import AktivStilling from './AktivStilling';
import EndreSøkeforslag from './EndreSøkeforslag';
import FullførtStilling from './FullførtStilling';
import RedigerStillingKnapp from './RedigerStillingKnapp';
import StoppStillingKnapp from './StoppStillingKnapp';
import FremdriftspanelArbeidsplassen from './arbeidsplassen/FremdriftspanelArbeidsplassen';
import HarKandidatlisteVisning from './arbeidsplassen/HarKandidatlisteVisning';
import OpprettStillingsoppdrag from './arbeidsplassen/OpprettStillingsoppdrag';
import FullførStillingKnapp from './fullfør-stilling/FullførStillingKnapp';
import GjenåpneStillingKnapp from './fullfør-stilling/GjenåpneStillingKnapp';
import { StillingsContextMedData } from '@/app/stilling/[stillingsId]/StillingsContext';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Minimal stillingsdata mock for context-avhengige komponenter
const mockStillingsData: any = {
  stilling: {
    uuid: 'demo-stilling-id',
    updated: new Date().toISOString(),
    administration: { reportee: 'Ola Veileder' },
    status: 'ACTIVE',
  },
  stillingsinfo: { stillingskategori: 'STILLING' },
};

// Wrapper som leverer det contexten forventer (subset er nok for visning)
const MockStillingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <StillingsContextMedData stillingsData={mockStillingsData}>
    {children}
  </StillingsContextMedData>
);

// Inert oversikt over fremdriftspanel-relaterte komponenter.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <div className='space-y-12 opacity-60 pointer-events-none'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>
            AktivStilling / FullførtStilling
          </h4>
          <div className='flex flex-col gap-4'>
            <AktivStilling
              antallFåttJobben={1}
              antallDelt={2}
              totalStillinger={5}
            />
            <FullførtStilling antallFåttJobben={1} totalStillinger={5} />
          </div>
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Knapper</h4>
          <div className='flex flex-wrap gap-3'>
            <StoppStillingKnapp />
            <RedigerStillingKnapp />
            <FullførStillingKnapp />
            <GjenåpneStillingKnapp />
            <EndreSøkeforslag />
          </div>
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Arbeidsplassen</h4>
          <div className='space-y-4'>
            <FremdriftspanelArbeidsplassen />
            <OpprettStillingsoppdrag />
            <HarKandidatlisteVisning />
          </div>
        </section>
      </div>
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
