import TabellRad from './TabellRad';
import { Table } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta = {
  tags: ['autodocs'],
  render: (args) => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Dato</Table.HeaderCell>
          <Table.HeaderCell>Tittel</Table.HeaderCell>
          <Table.HeaderCell>Arbeidsgiver</Table.HeaderCell>
          <Table.HeaderCell>Lagt til av</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <TabellRad {...args} />
      </Table.Body>
    </Table>
  ),
  args: {
    dato: new Date().toISOString(),
    tittel: 'Utvikler',
    arbeidsgiver: 'Tech AS',
    lagtTilAv: 'Z123456',
    status: 'VURDERES',
    stillingId: 'demo-stilling',
    erMaskert: false,
  },
} satisfies Meta<typeof TabellRad>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
export const Maskert: Story = {
  args: { erMaskert: true },
};
