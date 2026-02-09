import { withStillingsKandidatliste } from '../../../../.storybook/ContextDecorators';
import StillingsBanner from './StillingsBanner';
import {
  mockBannerForlengOppdrag,
  mockBannerGjenåpne,
  mockBannerÅpneSøkeforslag,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Stilling/StillingsBanner',
  component: StillingsBanner,
} satisfies Meta<typeof StillingsBanner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ForlengOppdrag: Story = {
  name: 'Stillingsbanner (Forleng oppdrag)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingsBanner />,
      undefined,
      mockBannerForlengOppdrag,
    ),
};

export const ÅpneSøkeforslag: Story = {
  name: 'Stillingsbanner (Åpne søkeforslag)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingsBanner />,
      undefined,
      mockBannerÅpneSøkeforslag,
    ),
};

export const GjenåpneBanner: Story = {
  name: 'Stillingsbanner (Gjenåpne banner)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingsBanner />,
      undefined,
      mockBannerGjenåpne,
    ),
};
