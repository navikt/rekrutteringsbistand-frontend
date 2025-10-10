import Definisjon from './Definisjon';
import OmStillingBoks from './OmStillingBoks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: OmStillingBoks,
} satisfies Meta<typeof OmStillingBoks>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    tittel: 'Arbeidssted',
    gridInnhold: (
      <>
        <Definisjon tittel='By' innhold='Oslo' />
        <Definisjon tittel='Land' innhold='Norge' />
        <Definisjon tittel='Kontor' innhold=' NAV Oslo' />
      </>
    ),
    innhold: (
      <ul>
        <li>Krav om førerkort B</li>
        <li>Turnusarbeid</li>
      </ul>
    ),
  },
};

export const InnholdTopp: Story = {
  args: {
    tittel: 'Om stillingen',
    innholdTopp: true,
    gridInnhold: (
      <>
        <Definisjon tittel='Antall stillinger' innhold='3' />
        <Definisjon tittel='Ansettelsesform' innhold='Fast' />
      </>
    ),
    innhold: (
      <ul>
        <li>Ansvar for team</li>
        <li>Bidra i fagmiljø</li>
      </ul>
    ),
  },
};
