import { TilgangskontrollForInnhold } from './TilgangskontrollForInnhold';
import { Roller } from './roller';
import { ApplikasjonContextProvider } from '@/providers/ApplikasjonContext';
import { BodyLong, Heading } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

interface StoryExtraArgs {
  mockRoller?: Roller[];
}

// Mock brukerdata
const createMockBrukerData = (roller: Roller[]) => ({
  roller,
  ident: 'Z123456',
  navn: 'Test Testesen',
  fornavn: 'Test',
  etternavn: 'Testesen',
  enheter: [],
});

const meta: Meta<typeof TilgangskontrollForInnhold> = {
  tags: ['autodocs'],
  component: TilgangskontrollForInnhold,
  decorators: [
    (Story, ctx) => {
      const roller = (ctx.args as any).mockRoller || [];
      const brukerData = createMockBrukerData(roller);
      return (
        <ApplikasjonContextProvider
          brukerData={brukerData}
          aktivEnhet={null}
          aktivBruker={null}
        >
          <Story />
        </ApplikasjonContextProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ExampleContent = () => (
  <div
    style={{
      padding: '2rem',
      background: 'var(--ax-surface-subtle)',
      borderRadius: '8px',
    }}
  >
    <Heading size='medium' spacing>
      Beskyttet innhold
    </Heading>
    <BodyLong>Dette innholdet krever spesielle roller for å vises.</BodyLong>
  </div>
);

export const HarTilgang: Story = {
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    kreverEnAvRollene: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ],
    children: <ExampleContent />,
  },
} as any;

export const HarIkkeTilgang: Story = {
  args: {
    mockRoller: [],
    kreverEnAvRollene: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ],
    children: <ExampleContent />,
  },
} as any;

export const HarUtviklerRolle: Story = {
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER],
    kreverEnAvRollene: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ],
    children: <ExampleContent />,
  },
} as any;

export const KreverEnAvFlereRoller: Story = {
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET],
    kreverEnAvRollene: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
    children: <ExampleContent />,
  },
} as any;

export const ManglerEnAvFlereRoller: Story = {
  args: {
    mockRoller: [],
    kreverEnAvRollene: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_JOBBSOKERRETTET,
    ],
    children: <ExampleContent />,
  },
} as any;

export const ManglerEierskap: Story = {
  args: {
    mockRoller: [Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],
    kreverEnAvRollene: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ],
    manglerEierskap: true,
    children: <ExampleContent />,
  },
} as any;

export const SkjulVarsel: Story = {
  args: {
    mockRoller: [],
    kreverEnAvRollene: [
      Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
    ],
    skjulVarsel: true,
    children: <ExampleContent />,
  },
} as any;

export const IngenRollekrav: Story = {
  args: {
    mockRoller: [],
    kreverEnAvRollene: null,
    children: <ExampleContent />,
  },
} as any;
