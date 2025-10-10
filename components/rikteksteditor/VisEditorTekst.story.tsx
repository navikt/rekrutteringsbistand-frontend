import VisEditorTekst from './VisEditorTekst';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: VisEditorTekst,
} satisfies Meta<typeof VisEditorTekst>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Tom: Story = {
  args: {
    htmlTekst: '',
  },
};

export const EnkelTekst: Story = {
  args: {
    htmlTekst:
      '<p>Dette er en enkel avsnittstekst med litt <strong>utheving</strong>.</p>',
  },
};

export const MedOverskrifter: Story = {
  args: {
    htmlTekst: `
      <h1>Stor hovedoverskrift</h1>
      <p>Innledningstekst.</p>
      <h2>Seksjon</h2>
      <p>Litt tekst i en seksjon.</p>
      <h3>Underseksjon</h3>
      <p>Mer tekst.</p>
    `,
  },
};

export const ListerOgLenker: Story = {
  args: {
    htmlTekst: `
      <p>Under ser du en liste:</p>
      <ul>
        <li>Første punkt</li>
        <li>Andre punkt med <strong>utheving</strong></li>
        <li><a href='https://www.nav.no'>Lenke til nav.no</a></li>
      </ul>
      <p>Og en ordnet liste:</p>
      <ol>
        <li>Steg en</li>
        <li>Steg to</li>
      </ol>
    `,
  },
};

export const TallSomInput: Story = {
  args: {
    htmlTekst: 123456,
  },
};

export const KompleksInnhold: Story = {
  args: {
    htmlTekst: `
      <h2>Stillingsbeskrivelse</h2>
      <p>Vi ser etter en person som:</p>
      <ul>
        <li>Er nysgjerrig</li>
        <li>Liker å jobbe i team</li>
        <li>Bygger robuste løsninger</li>
      </ul>
      <p>Ta kontakt for spørsmål.</p>
    `,
  },
};
