import HeaderActions from './HeaderActions';
import RekrutteringstreffHeader from './RekrutteringstreffHeader';
import TabsNav from './TabsNav';
import { RekrutteringstreffProvider } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert visning av header + navigasjon. Vi mocker kun nødvendige props og context.

const headerProps = {
  skalViseHeader: true,
  // Bruk muterbar array (ikke readonly) for å tilfredsstille prop-typen
  breadcrumbs: [
    { href: '#', label: 'Rekrutteringstreff' },
    { href: '#', label: 'Demo-treff' },
  ] as { href: string; label: string }[],
  erIForhåndsvisning: true,
  viserFullskjermForhåndsvisning: false,
  jobbsøkereAntall: 12,
  arbeidsgivereAntall: 3,
  lagrerNoe: false,
  lagretTekst: 'Lagret',
  erPubliseringklar: false,
  onToggleForhåndsvisning: () => {},
  onBekreftRedigerPublisert: () => {},
  onAvbrytRedigering: () => {},
  onPublisert: () => {},
  onRepubliser: async () => {},
  republiserDisabled: false,
  inTabsContext: true,
} as const;

const actionsProps = {
  erIForhåndsvisning: headerProps.erIForhåndsvisning,
  viserFullskjermForhåndsvisning: headerProps.viserFullskjermForhåndsvisning,
  erPubliseringklar: headerProps.erPubliseringklar,
  onToggleForhåndsvisning: headerProps.onToggleForhåndsvisning,
  onBekreftRedigerPublisert: headerProps.onBekreftRedigerPublisert,
  onAvbrytRedigering: headerProps.onAvbrytRedigering,
  onPublisert: headerProps.onPublisert,
  onRepubliser: headerProps.onRepubliser,
  republiserDisabled: headerProps.republiserDisabled,
};

const meta = {
  tags: ['autodocs'],
  render: () => (
    <RekrutteringstreffProvider rekrutteringstreffId='dummy-id'>
      <div className='space-y-6 opacity-60 pointer-events-none border rounded-md p-4'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Header</h4>
          <RekrutteringstreffHeader {...headerProps} />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Header actions (separat)</h4>
          <HeaderActions {...actionsProps} />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>Tabs navigasjon</h4>
          <TabsNav
            jobbsøkereAntall={headerProps.jobbsøkereAntall}
            arbeidsgivereAntall={headerProps.arbeidsgivereAntall}
          />
        </section>
      </div>
    </RekrutteringstreffProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
