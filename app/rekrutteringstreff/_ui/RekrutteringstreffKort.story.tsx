import { RekrutteringstreffKort } from './RekrutteringstreffKort';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: RekrutteringstreffKort,
  tags: ['autodocs'],
  args: {
    id: 'demo-1',
    dato: '12.10.2025',
    tidspunkt: '10:00 - 14:00',
    antallArbeidsgivere: 5,
    tittel: 'Mini-rekrutteringstreff',
    beskrivelse: 'Et lokalt treff for å koble kandidater og arbeidsgivere.',
    gateadresse: 'Storgata 1',
    postnummer: '0155',
    poststed: 'Oslo',
    opprettetAv: 'Kari Nordmann',
    opprettetDato: '01.10.2025',
    navKontor: 'NAV Oslo',
  },
} satisfies Meta<typeof RekrutteringstreffKort>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
