import AvlysRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/AvlysRekrutteringstreffButton';
import FullførRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/FullførRekrutteringstreffButton';
import PubliserRekrutteringstreffButton from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/header/actions/PubliserRekrutteringstreffButton';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FormProvider, useForm } from 'react-hook-form';

function KiFormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm({
    defaultValues: {
      tittelKiSjekket: true,
      htmlContentKiSjekket: true,
      tittelKiFeil: false,
      htmlContentKiFeil: false,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
}

const meta = {
  tags: ['autodocs'],
  render: () => (
    <KiFormWrapper>
      <div className='pointer-events-none flex max-w-sm flex-col gap-4 opacity-60'>
        <PubliserRekrutteringstreffButton
          erPubliseringklar={false}
          rekrutteringstreffId='demo'
          oppdaterData={() => {}}
        />
        <AvlysRekrutteringstreffButton />
        <FullførRekrutteringstreffButton />
      </div>
    </KiFormWrapper>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
