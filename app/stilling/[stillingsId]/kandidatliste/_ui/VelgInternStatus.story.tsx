import {
  createKandidatlisteMock,
  withStillingsKandidatliste,
} from '../../../../../.storybook/ContextDecorators';
import VelgInternStatus from './VelgInternStatus';
import { InternKandidatstatus } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: VelgInternStatus,
} satisfies Meta<typeof VelgInternStatus>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vurderes: Story = {
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false,
  },
  render: (args) =>
    withStillingsKandidatliste(() => <VelgInternStatus {...args} />),
};

export const LukketListe: Story = {
  args: {
    kandidatnr: 'kandidatnr-1',
    status: InternKandidatstatus.AKTUELL,
    lukketKandidatliste: true,
  },
  render: (args) =>
    withStillingsKandidatliste(
      () => <VelgInternStatus {...args} />,
      createKandidatlisteMock({ lukket: true }),
    ),
};

export const FlereStatuser: Story = {
  args: {
    kandidatnr: 'dummy',
    status: InternKandidatstatus.VURDERES,
    lukketKandidatliste: false,
  },
  render: () =>
    withStillingsKandidatliste(() => (
      <div className='flex flex-col gap-4'>
        {Object.values(InternKandidatstatus).map((s) => (
          <VelgInternStatus
            key={s}
            kandidatnr={`kandidat-${s}`}
            status={s}
            lukketKandidatliste={false}
          />
        ))}
      </div>
    )),
};
