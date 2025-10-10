import KandidatHendelseKort from './KandidatHendelseKort';
import {
  HandShakeHeartIcon,
  SealCheckmarkIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: KandidatHendelseKort,
} satisfies Meta<typeof KandidatHendelseKort>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    tittel: 'Kontaktet kandidat',
    tekst: 'Kandidaten ble kontaktet',
    fargeKode: 'info',
    ikon: <HandShakeHeartIcon aria-hidden />,
    dato: new Date(),
  },
};

export const Success: Story = {
  args: {
    tittel: 'Til intervju',
    tekst: 'Intervju avtalt',
    fargeKode: 'success',
    ikon: <SealCheckmarkIcon aria-hidden />,
    frist: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
};

export const Error: Story = {
  args: {
    tittel: 'Avsluttet',
    tekst: 'Prosessen stoppet',
    fargeKode: 'error',
    ikon: <XMarkOctagonIcon aria-hidden />,
    dato: new Date(),
  },
};
