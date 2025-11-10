import { RekrutteringstreffKort } from './RekrutteringstreffKort';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  component: RekrutteringstreffKort,
  tags: ['autodocs'],
  args: {
    rekrutteringstreff: {
      id: 'demo-1',
      fraTid: '2025-10-12T10:00:00+01:00',
      tilTid: '2025-10-12T14:00:00+01:00',
      tittel: 'Mini-rekrutteringstreff',
      beskrivelse: 'Et lokalt treff for å koble kandidater og arbeidsgivere.',
      gateadresse: 'Storgata 1',
      postnummer: '0155',
      poststed: 'Oslo',
      opprettetAvPersonNavident: 'Kari Nordmann',
      opprettetAvTidspunkt: '2025-10-01T17:39:37.322+01:00',
      opprettetAvNavkontorEnhetId: 'NAV Oslo',
      status: 'UTKAST',
      antallArbeidsgivere: 5,
      antallJobsøkere: 7,
    },
  },
} satisfies Meta<typeof RekrutteringstreffKort>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
