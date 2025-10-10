import FilterKomponent from './FilterKomponent';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  component: FilterKomponent,
} satisfies Meta<typeof FilterKomponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MedCheckboxer: Story = {
  args: {
    tittel: 'Velg type',
    children: (
      <CheckboxGroup legend='Velg alternativer' hideLegend>
        <Checkbox value='heltid'>Heltid</Checkbox>
        <Checkbox value='deltid'>Deltid</Checkbox>
        <Checkbox value='fast'>Fast</Checkbox>
        <Checkbox value='midlertidig'>Midlertidig</Checkbox>
      </CheckboxGroup>
    ),
  },
};

export const MedMangeAlternativer: Story = {
  args: {
    tittel: 'Velg fylke',
    children: (
      <CheckboxGroup legend='Velg fylke' hideLegend>
        <Checkbox value='oslo'>Oslo</Checkbox>
        <Checkbox value='viken'>Viken</Checkbox>
        <Checkbox value='innlandet'>Innlandet</Checkbox>
        <Checkbox value='vestfold'>Vestfold og Telemark</Checkbox>
        <Checkbox value='agder'>Agder</Checkbox>
        <Checkbox value='rogaland'>Rogaland</Checkbox>
        <Checkbox value='vestland'>Vestland</Checkbox>
        <Checkbox value='more'>Møre og Romsdal</Checkbox>
        <Checkbox value='trondelag'>Trøndelag</Checkbox>
        <Checkbox value='nordland'>Nordland</Checkbox>
        <Checkbox value='troms'>Troms og Finnmark</Checkbox>
      </CheckboxGroup>
    ),
  },
};

export const Enkel: Story = {
  args: {
    tittel: 'Filter',
    children: <div style={{ padding: '1rem' }}>Egendefinert innhold</div>,
  },
};
