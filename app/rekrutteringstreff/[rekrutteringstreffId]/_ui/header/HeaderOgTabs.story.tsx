import RekrutteringstreffHeader from './RekrutteringstreffHeader';
import TabsNav from './TabsNav';
import { MockRekrutteringstreffProvider } from '@/storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Alternativ kompakt header + tabs story.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockRekrutteringstreffProvider>
      <div className='space-y-6 opacity-60 pointer-events-none'>
        <RekrutteringstreffHeader
          skalViseHeader
          erIForhåndsvisning={true}
          breadcrumbs={[{ label: 'Treff', href: '/rekrutteringstreff' }]}
          jobbsøkereAntall={3}
          arbeidsgivereAntall={2}
          lagrerNoe={false}
          lagretTekst='Lagret'
          erPubliseringklar={true}
          onToggleForhåndsvisning={() => {}}
          onBekreftRedigerPublisert={() => {}}
          onAvbrytRedigering={() => {}}
        />
        <TabsNav jobbsøkereAntall={3} arbeidsgivereAntall={2} />
      </div>
    </MockRekrutteringstreffProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Kompakt: Story = {};
