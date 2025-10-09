import SideScroll from './SideScroll';
import { BodyLong, Heading, VStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: SideScroll,
} satisfies Meta<typeof SideScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

const LangtInnhold = () => (
  <VStack gap='4' style={{ padding: '2rem' }}>
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        style={{
          padding: '1rem',
          background: 'var(--ax-surface-subtle)',
          borderRadius: '8px',
        }}
      >
        <Heading size='small' spacing>
          Seksjon {i + 1}
        </Heading>
        <BodyLong>
          Dette er innhold i seksjon {i + 1}. SideScroll komponenten håndterer
          scrolling automatisk når innholdet er lengre enn det tilgjengelige
          området.
        </BodyLong>
      </div>
    ))}
  </VStack>
);

const BreddInnhold = () => (
  <div style={{ padding: '2rem' }}>
    <div
      style={{
        width: '2000px',
        height: '300px',
        background:
          'linear-gradient(90deg, var(--ax-surface-action-subtle) 0%, var(--ax-surface-info-subtle) 100%)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ax-text-on-action)',
      }}
    >
      <Heading size='large'>Scroll horisontalt for å se alt innhold</Heading>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: <LangtInnhold />,
  },
};

export const MedTrimHøyde: Story = {
  args: {
    trimHøyde: 300,
    children: <LangtInnhold />,
  },
};

export const MedHorizontalScroll: Story = {
  args: {
    enableHorizontalScroll: true,
    children: <BreddInnhold />,
  },
};

export const AutoHeight: Story = {
  args: {
    autoHeight: true,
    children: <LangtInnhold />,
  },
};

export const KortInnhold: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <Heading size='large' spacing>
          Kort innhold
        </Heading>
        <BodyLong>
          Dette innholdet er kort nok til at scrolling ikke er nødvendig.
        </BodyLong>
      </div>
    ),
  },
};

export const MedCustomClassName: Story = {
  args: {
    className: 'bg-surface-neutral-subtle',
    children: <LangtInnhold />,
  },
};

export const BeggeDimensjoner: Story = {
  args: {
    enableHorizontalScroll: true,
    children: (
      <div style={{ padding: '2rem' }}>
        <VStack gap='4'>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '2000px',
                padding: '1rem',
                background: 'var(--ax-surface-subtle)',
                borderRadius: '8px',
              }}
            >
              <Heading size='small'>
                Rad {i + 1} - Scroll både vertikalt og horisontalt
              </Heading>
            </div>
          ))}
        </VStack>
      </div>
    ),
  },
};
