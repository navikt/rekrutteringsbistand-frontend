import Feilmelding from './Feilmelding';
import { RekbisError } from '@/util/rekbisError';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { z, ZodError } from 'zod';

const meta = {
  tags: ['autodocs'],
  component: Feilmelding,
} satisfies Meta<typeof Feilmelding>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnkelFeilmelding: Story = {
  args: {
    message: 'Dette er en enkel feilmelding',
  },
};

export const RekbisFeil: Story = {
  args: {
    error: new RekbisError({
      message: 'Kunne ikke hente kandidater',
      feilkode: 'REKBIS-12345',
      details:
        'API-kall til /api/kandidater feilet med 500 Internal Server Error',
    }),
  },
};

export const RekbisFeilUtenDetails: Story = {
  args: {
    error: new RekbisError({
      message: 'En feil oppstod under lagring',
      feilkode: 'REKBIS-67890',
    }),
  },
};

export const ZodValideringsFeil: Story = {
  args: {
    zodError: (() => {
      const schema = z.object({
        navn: z.string().min(2, 'Navn må være minst 2 tegn'),
        epost: z.string().email('Ugyldig e-postadresse'),
        alder: z.number().min(18, 'Må være minst 18 år'),
      });

      try {
        schema.parse({
          navn: 'A',
          epost: 'ikke-en-epost',
          alder: 15,
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return error;
        }
      }
      return undefined;
    })(),
  },
};

export const ZodFlereValideringsFeil: Story = {
  args: {
    zodError: (() => {
      const schema = z.object({
        fornavn: z.string().min(1, 'Fornavn er påkrevd'),
        etternavn: z.string().min(1, 'Etternavn er påkrevd'),
        telefon: z.string().regex(/^\d{8}$/, 'Telefonnummer må være 8 siffer'),
        postnummer: z.string().length(4, 'Postnummer må være 4 siffer'),
        dato: z.string().min(1, 'Dato er påkrevd'),
      });

      try {
        schema.parse({
          fornavn: '',
          etternavn: '',
          telefon: '123',
          postnummer: '12',
          dato: '',
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return error;
        }
      }
      return undefined;
    })(),
  },
};

export const UkjentFeil: Story = {
  args: {
    error: new Error('Dette er en standard JavaScript Error'),
    message: 'En uventet feil oppstod',
  },
};
