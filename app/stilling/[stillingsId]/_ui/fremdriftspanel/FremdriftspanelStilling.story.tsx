import {
  createKandidatlisteMock,
  withStillingsKandidatliste,
} from '../../../../../.storybook/ContextDecorators';
import FremdriftspanelStilling from './FremdriftspanelStilling';
import {
  mockBaseStilling,
  mockFormidling,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import {
  InternKandidatstatus,
  KandidatutfallTyper,
} from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: FremdriftspanelStilling,
} satisfies Meta<typeof FremdriftspanelStilling>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Aktiv: Story = {
  render: () =>
    withStillingsKandidatliste(() => (
      <FremdriftspanelStilling dropDown={false} />
    )),
};

export const AktivDropdown: Story = {
  render: () =>
    withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />),
};

export const Fullført: Story = {
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin:
          mockBaseStilling.stilling.publishedByAdmin ||
          new Date().toISOString(),
      },
    } as typeof mockBaseStilling;

    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData,
    });
    return withStillingsKandidatliste(
      () => <FremdriftspanelStilling dropDown={false} />,
      liste,
      stillingsData,
    );
  },
};

export const FormidlingVariant: Story = {
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({ stillingsData, antall: 2 });
    return withStillingsKandidatliste(
      () => <FremdriftspanelStilling dropDown />,
      liste,
      stillingsData,
    );
  },
};
