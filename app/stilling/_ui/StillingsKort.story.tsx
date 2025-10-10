import StillingsKort from './StillingsKort';
import { mockStillingssøk } from '@/app/api/stillings-sok/mocks/mockStillingssøk';
import { RekrutteringsbistandStillingSchemaDTO } from '@/app/api/stillings-sok/schema/rekrutteringsbistandStillingSchema.zod';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Plukk ut et par mock-hits og konverter til forventet shape (._source)
const firstHit = mockStillingssøk.hits.hits[0]._source as any;
const formidlingHit = mockStillingssøk.hits.hits.find(
  (h: any) => h._source.stillingsinfo.stillingskategori === 'FORMIDLING',
)?._source as any;

// StillingsKort forventer RekrutteringsbistandStillingSchemaDTO (stilling + stillingsinfo)
const toDto = (src: any): RekrutteringsbistandStillingSchemaDTO => ({
  stilling: {
    ...src.stilling,
    // Normaliser feltnavn hvis nødvendig
  },
  stillingsinfo: src.stillingsinfo,
});

const meta = {
  tags: ['autodocs'],
  component: StillingsKort,
} satisfies Meta<typeof StillingsKort>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: { stillingData: toDto(firstHit) },
};

export const Formidling: Story = {
  args: { stillingData: toDto(formidlingHit) },
};
