import Sidepanel from './Sidepanel';
import { BodyShort, Button, Heading, VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: Sidepanel,

  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{
            flex: 1,
            padding: '2rem',
            background: 'var(--ax-surface-default)',
          }}
        >
          <Heading size='large'>Hovedinnhold</Heading>
          <BodyShort>Dette er hovedinnholdet på siden</BodyShort>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidepanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Dette er innholdet i Sidepanelet</BodyShort>
      </VStack>
    ),
  },
};

export const MedHandlinger: Story = {
  args: {
    children: (
      <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Oppgaver som må fullføres:</BodyShort>
        <VStack gap='2'>
          <Button variant='primary' size='small'>
            Registrer kandidat
          </Button>
          <Button variant='secondary' size='small'>
            Send til arbeidsgiver
          </Button>
          <Button variant='tertiary' size='small'>
            Marker som ferdig
          </Button>
        </VStack>
      </VStack>
    ),
  },
};

export const MedLangtInnhold: Story = {
  args: {
    children: (
      <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Status for kandidatprosess</BodyShort>
        <VStack gap='3'>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                padding: '0.5rem',
                background: 'var(--ax-surface-neutral-subtle)',
                borderRadius: '4px',
              }}
            >
              <BodyShort weight='semibold'>Steg {i + 1}</BodyShort>
              <BodyShort size='small'>Beskrivelse av steg {i + 1}</BodyShort>
            </div>
          ))}
        </VStack>
      </VStack>
    ),
  },
};

export const Tomt: Story = {
  args: {
    children: (
      <VStack gap='4'>
        <Heading size='medium'>Fremdrift</Heading>
        <BodyShort>Ingen oppgaver å vise</BodyShort>
      </VStack>
    ),
  },
};
