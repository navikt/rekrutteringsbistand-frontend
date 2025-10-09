import SWRLaster from './SWRLaster';
import { RekbisError } from '@/util/rekbisError';
import { BodyLong, Heading, Skeleton, VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { z, ZodError } from 'zod';

// Mock SWR hook responses
const createMockHook = <T,>(options: {
  data?: T;
  error?: Error;
  isLoading?: boolean;
  isValidating?: boolean;
}) => ({
  data: options.data,
  error: options.error,
  isLoading: options.isLoading || false,
  isValidating: options.isValidating || false,
  mutate: async () => undefined,
});

const meta = {
  tags: ['autodocs'],
  component: SWRLaster,
} satisfies Meta<typeof SWRLaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleContent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <VStack
    gap='4'
    style={{
      padding: '2rem',
      background: 'var(--ax-surface-subtle)',
      borderRadius: '8px',
    }}
  >
    <Heading size='medium'>{title}</Heading>
    <BodyLong>{description}</BodyLong>
  </VStack>
);

export const MedData: Story = {
  args: {
    hooks: [createMockHook({ data: { name: 'Test Data', id: 1 } })],
    children: (data: any) => (
      <ExampleContent
        title='Data lastet inn'
        description={`Navn: ${data.name}, ID: ${data.id}`}
      />
    ),
  },
};

export const Laster: Story = {
  args: {
    hooks: [createMockHook({ isLoading: true })],
    children: () => (
      <ExampleContent title='Dette skal ikke vises' description='Laster...' />
    ),
  },
};

export const MedSkeleton: Story = {
  args: {
    hooks: [createMockHook({ isLoading: true })],
    skeleton: (
      <VStack gap='4' style={{ padding: '2rem' }}>
        <Skeleton width='400px' height={60} />
        <Skeleton width='400px' height={40} />
        <Skeleton width='400px' height={40} />
      </VStack>
    ),
    children: () => <ExampleContent title='Data' description='Innhold' />,
  },
};

export const MedFeil: Story = {
  args: {
    hooks: [
      createMockHook({
        error: new Error('Kunne ikke hente data fra serveren'),
      }),
    ],
    children: () => (
      <ExampleContent title='Data' description='Dette vises ikke ved feil' />
    ),
  },
};

export const MedRekbisFeil: Story = {
  args: {
    hooks: [
      createMockHook({
        error: new RekbisError({
          message: 'API-kall feilet',
          feilkode: 'REKBIS-500',
          details: 'Serveren svarte med status 500',
        }),
      }),
    ],
    children: () => (
      <ExampleContent title='Data' description='Dette vises ikke ved feil' />
    ),
  },
};

export const MedZodFeil: Story = {
  args: {
    hooks: [
      createMockHook({
        error: (() => {
          const schema = z.object({
            name: z.string().min(2),
            email: z.string().email(),
          });
          try {
            schema.parse({ name: 'A', email: 'invalid' });
          } catch (error) {
            return error as ZodError;
          }
        })(),
      }),
    ],
    children: () => (
      <ExampleContent title='Data' description='Dette vises ikke ved feil' />
    ),
  },
};

export const SkjulFeilmelding: Story = {
  args: {
    hooks: [
      createMockHook({
        error: new Error('Dette er en skjult feil'),
      }),
    ],
    skjulFeilmelding: true,
    children: () => (
      <ExampleContent title='Data' description='Feilmelding er skjult' />
    ),
  },
};

export const EgenFeilmelding: Story = {
  args: {
    hooks: [
      createMockHook({
        error: new Error('Custom error'),
      }),
    ],
    egenFeilmelding: (error) => (
      <div
        style={{
          padding: '2rem',
          background: 'var(--ax-surface-danger-subtle)',
          borderRadius: '8px',
        }}
      >
        <Heading size='small' spacing>
          Egendefinert feilmelding
        </Heading>
        <BodyLong>Feilen som oppstod: {error.message}</BodyLong>
      </div>
    ),
    children: () => (
      <ExampleContent title='Data' description='Dette vises ikke' />
    ),
  },
};

export const FlereHooks: Story = {
  args: {
    hooks: [
      createMockHook({ data: { users: ['User 1', 'User 2'] } }),
      createMockHook({ data: { posts: ['Post 1', 'Post 2'] } }),
    ],
    children: (users: any, posts: any) => (
      <VStack gap='4'>
        <ExampleContent title='Brukere' description={users.users.join(', ')} />
        <ExampleContent title='Innlegg' description={posts.posts.join(', ')} />
      </VStack>
    ),
  },
};

export const AllowPartialData: Story = {
  args: {
    hooks: [
      createMockHook({ data: { name: 'Data 1' } }),
      createMockHook({ error: new Error('Hook 2 feilet') }),
    ],
    allowPartialData: true,
    children: (data1: any, data2: any) => (
      <VStack gap='4'>
        <ExampleContent
          title='Data 1 (suksess)'
          description={data1?.name || 'Ingen data'}
        />
        <ExampleContent
          title='Data 2 (feilet)'
          description={
            data2?.name || 'Ingen data - men komponenten vises likevel!'
          }
        />
      </VStack>
    ),
  },
};

export const Validerer: Story = {
  args: {
    hooks: [
      createMockHook({
        data: { name: 'Eksisterende data' },
        isValidating: true,
      }),
    ],
    visLoaderUnderValidering: true,
    children: (data: any) => (
      <ExampleContent
        title='Data under validering'
        description={`Dette vises ikke fordi visLoaderUnderValidering er true`}
      />
    ),
  },
};
