import KiAnalysePanel from '../rediger/ki/KiAnalysePanel';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none opacity-60'>
      <KiAnalysePanel
        validating={false}
        analyse={undefined}
        analyseError={undefined}
        harGodkjentKiFeil={false}
        showAnalysis={false}
        erRedigeringAvPublisertTreff={false}
        onGodkjennKiFeil={() => {}}
        ariaLabel='Mock KI Analyse Panel'
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
