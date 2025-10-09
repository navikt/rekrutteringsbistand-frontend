import TekstMedIkon from './TekstMedIkon';
import { BriefcaseIcon, PersonIcon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: TekstMedIkon,
} satisfies Meta<typeof TekstMedIkon>;
export default meta;

type Story = StoryObj<typeof meta>;

export const KunTekst: Story = {
  args: { tekst: 'Bare tekst' },
};

export const MedIkon: Story = {
  args: {
    tekst: 'Med ikon',
    ikon: <BriefcaseIcon aria-hidden className='w-5 h-5' />,
  },
};

export const SubtleTekst: Story = {
  args: {
    tekst: 'Primær tekst',
    subtle: 'Sekundær informasjon',
    ikon: <PersonIcon aria-hidden className='w-5 h-5' />,
  },
};

export const SplitLayout: Story = {
  args: {
    tekst: 'Overtekst',
    subtle: 'Undertekst',
    splitSubtle: true,
    ikon: <PersonIcon aria-hidden className='w-5 h-5' />,
  },
};

export const UtenData: Story = {
  args: {
    tekst: null,
  },
};

export const SkjultNårTom: Story = {
  args: {
    tekst: null,
    hideIfEmpty: true,
  },
};
