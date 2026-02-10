import { withStillingsKandidatliste } from '../../../../.storybook/ContextDecorators';
import StillingsBanner from './StillingsBanner';
import {
  mockBannerForlengOppdrag,
  mockBannerÅpneSøkeforslag,
  mockFullførtBesattLåst,
  mockFullførtIkkeBesattIkkeLåst,
  mockFullførtIkkeBesattLåst,
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

export const FullførtBesattLåst: Story = {
  name: 'Fullført banner (Besatt + Låst)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingsBanner />,
      undefined,
      mockFullførtBesattLåst,
    ),
};

export const FullførtIkkeBesattIkkeLåst: Story = {
  name: 'Fullført banner (Ikke besatt + Ikke låst)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingsBanner />,
      undefined,
      mockFullførtIkkeBesattIkkeLåst,
    ),
};

export const FullførtIkkeBesattLåst: Story = {
  name: 'Fullført banner (Ikke besatt + Låst)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingsBanner />,
      undefined,
      mockFullførtIkkeBesattLåst,
    ),
};
