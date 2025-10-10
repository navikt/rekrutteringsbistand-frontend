import KiAnalysePanel from '../rediger/ki/KiAnalysePanel';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Duplisert
const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='opacity-60 pointer-events-none'>
      <KiAnalysePanel
        validating={false}
        analyse={undefined}
        analyseError={undefined}
        forceSave={false}
        showAnalysis={false}
        erRedigeringAvPublisertTreff={false}
        onForceSave={() => {}}
        ariaLabel='Mock KI Analyse Panel'
      />
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Placeholder: Story = {};
