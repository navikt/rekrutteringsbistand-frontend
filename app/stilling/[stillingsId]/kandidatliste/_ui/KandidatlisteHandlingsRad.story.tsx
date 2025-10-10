import {
  createKandidatlisteMock,
  withStillingsKandidatliste,
} from '../../../../../.storybook/ContextDecorators';
import KandidatlisteHandlingsRad from './KandidatlisteHandlingsRad';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: KandidatlisteHandlingsRad,
} satisfies Meta<typeof KandidatlisteHandlingsRad>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ÅpenListe: Story = {
  render: () => withStillingsKandidatliste(() => <KandidatlisteHandlingsRad />),
};

export const LukketListe: Story = {
  render: () =>
    withStillingsKandidatliste(
      () => <KandidatlisteHandlingsRad />,
      createKandidatlisteMock({ lukket: true }),
    ),
};

export const FlereMarkerte: Story = {
  render: () => {
    const liste = createKandidatlisteMock({
      antall: 5,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.PRESENTERT,
    });
    return withStillingsKandidatliste(
      () => <KandidatlisteHandlingsRad />,
      liste,
    );
  },
};
