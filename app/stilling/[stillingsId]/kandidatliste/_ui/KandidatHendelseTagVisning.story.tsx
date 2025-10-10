import KandidatHendelseTagVisning from './KandidatHendelseTagVisning';
import { Tag } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: KandidatHendelseTagVisning,
} satisfies Meta<typeof KandidatHendelseTagVisning>;
export default meta;
type Story = StoryObj<typeof meta>;

// Minimal mock som matcher KandidatHendelseInformasjon (dato og type kan være null)
const baseHendelse = {
  tekst: 'Kandidaten ble kontaktet',
  tag: (
    <Tag size='small' variant='alt3'>
      Kontaktet
    </Tag>
  ),
  dato: null,
  type: null,
  raw: {
    utfall: 'PRESENTERT',
    registrertAvIdent: 'Z123456',
    tidspunkt: new Date().toISOString(),
    sendtTilArbeidsgiversKandidatliste: false,
  },
};

export const UtenDato: Story = { args: { kandidatHendelse: baseHendelse } };

export const MedDato: Story = {
  args: { kandidatHendelse: { ...baseHendelse, dato: new Date() } },
};

export const Ingen: Story = { args: { kandidatHendelse: null } };
