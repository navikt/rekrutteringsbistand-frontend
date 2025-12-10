import KiAnalyse from '../../rediger/_ui/ki/KiAnalyseIntro';
import KiAnalysePanel from '../../rediger/_ui/ki/KiAnalysePanel';
import KiLogg from '../kilogg/components/KiLogg';
import { MockRekrutteringstreffProvider } from '@/.storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// KI-relaterte komponenter (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockRekrutteringstreffProvider>
      <div className='pointer-events-none space-y-10 opacity-60'>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>KiAnalyse</h4>
          <KiAnalyse />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>KiAnalysePanel</h4>
          <KiAnalysePanel
            validating={false}
            analyse={{
              begrunnelse: 'Alt ser bra ut',
              bryterRetningslinjer: false,
            }}
            analyseError={undefined}
            harGodkjentKiFeil={false}
            showAnalysis={true}
            erRedigeringAvPublisertTreff={false}
            onGodkjennKiFeil={() => {}}
            ariaLabel='Analyse av innlegget'
          />
        </section>
        <section className='space-y-2'>
          <h4 className='text-sm font-semibold'>KiLogg</h4>
          <KiLogg />
        </section>
      </div>
    </MockRekrutteringstreffProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
