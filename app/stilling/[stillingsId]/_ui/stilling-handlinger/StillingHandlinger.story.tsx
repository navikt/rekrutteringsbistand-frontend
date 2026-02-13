import { withStillingsKandidatliste } from '../../../../../.storybook/ContextDecorators';
import StillingHandlinger from './StillingHandlinger';
import {
  mockFullførtStilling,
  mockPublisertEksternStilling,
  mockPublisertStilling,
  mockSlettetStilling,
  mockStengtForSøkereStilling,
  mockUtløptStilling,
} from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/mocks/stillingMock';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  title: 'Stilling/StillingHandlinger',
  component: StillingHandlinger,
} satisfies Meta<typeof StillingHandlinger>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PublisertIntern: Story = {
  name: 'Publisert (intern)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingHandlinger />,
      undefined,
      mockPublisertStilling,
    ),
};

export const PublisertEkstern: Story = {
  name: 'Publisert (arbeidsplassen.no)',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingHandlinger />,
      undefined,
      mockPublisertEksternStilling,
    ),
};

export const Utløpt: Story = {
  name: 'Utløpt',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingHandlinger />,
      undefined,
      mockUtløptStilling,
    ),
};

export const StengtForSøkere: Story = {
  name: 'Stengt for søkere',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingHandlinger />,
      undefined,
      mockStengtForSøkereStilling,
    ),
};

export const Slettet: Story = {
  name: 'Slettet',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingHandlinger />,
      undefined,
      mockSlettetStilling,
    ),
};

export const Fullført: Story = {
  name: 'Fullført',
  render: () =>
    withStillingsKandidatliste(
      () => <StillingHandlinger />,
      undefined,
      mockFullførtStilling,
    ),
};
