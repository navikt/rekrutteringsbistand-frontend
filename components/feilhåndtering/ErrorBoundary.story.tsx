import ErrorBoundary from './ErrorBoundary';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Komponent som alltid kaster en feil
const AlwaysThrowError = ({ message }: { message: string }) => {
  throw new Error(message);
};

const meta = {
  tags: ['autodocs'],
  component: ErrorBoundary,
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UtenFeil: Story = {
  render: () => (
    <ErrorBoundary>
      <div style={{ padding: '2rem' }}>
        <h2>Alt fungerer!</h2>
        <p>Denne komponenten kaster ingen feil.</p>
      </div>
    </ErrorBoundary>
  ),
};

export const MedFeil: Story = {
  render: () => (
    <ErrorBoundary>
      <AlwaysThrowError message='Dette er en test-feil!' />
    </ErrorBoundary>
  ),
};

export const MedLangFeilmelding: Story = {
  render: () => (
    <ErrorBoundary>
      <AlwaysThrowError message='Dette er en veldig lang feilmelding som beskriver hva som gikk galt i detalj. Den inneholder mye informasjon om konteksten rundt feilen, hva som ble forsøkt, og hvorfor det feilet. Dette kan være nyttig for debugging, men kan også være overveldende for brukeren.' />
    </ErrorBoundary>
  ),
};
