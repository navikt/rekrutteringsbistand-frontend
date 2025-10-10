import ValgteFiltre from './ValgteFiltre';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta: Meta<typeof ValgteFiltre> = {
  title: 'Filter/ValgteFiltre',
  component: ValgteFiltre,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Komponent for å vise valgte filtre med mulighet for å fjerne alle eller individuelle filtre. Beregner automatisk hvor mange filtre som får plass basert på tilgjengelig bredde og viser resten i en utvidbar seksjon.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock filter data
const createMockFilter = (values: string[], label: string) => ({
  type: values,
  setVerdi: (newValues: string[]) => {
    alert(`${label} oppdatert: ${newValues.join(', ')}`);
  },
  mapVerdiNavn: (value: string) => value,
});

export const Standard: Story = {
  name: 'Standard visning',
  parameters: {
    docs: {
      description: {
        story:
          'Standard visning med flere filtre hvor de siste skjules bak en utvidbar knapp.',
      },
    },
  },
  render: () => {
    const [filters] = useState([
      createMockFilter(['Oslo'], 'Sted'),
      createMockFilter(['Følges opp'], 'Status'),
      createMockFilter(['Tømrer'], 'Kompetanse'),
      createMockFilter(['Deltid'], 'Stillingsstørrelse'),
      createMockFilter(['Junior'], 'Erfaring'),
      createMockFilter(['Norsk'], 'Språk'),
    ]);

    return (
      <ValgteFiltre
        filtre={filters}
        tømFiltreProps={{
          fjernFritekst: () => {
            alert('Fjern fritekst kalt');
          },
        }}
      />
    );
  },
};

export const MangeFiltre: Story = {
  name: 'Mange filtre',
  parameters: {
    docs: {
      description: {
        story:
          'Eksempel med mange filtre hvor komponenten automatisk beregner hvor mange som får plass basert på tilgjengelig bredde. Resten skjules bak utvidbar knapp.',
      },
    },
  },
  render: () => {
    const [filters] = useState([
      createMockFilter(['Oslo', 'Bergen', 'Trondheim'], 'Sted'),
      createMockFilter(['Følges opp', 'Aktiv'], 'Status'),
      createMockFilter(
        ['Tømrer', 'Snekker', 'Elektriker', 'Maler'],
        'Kompetanse',
      ),
      createMockFilter(['Deltid', 'Heltid'], 'Stillingsstørrelse'),
      createMockFilter(['Junior', 'Senior'], 'Erfaring'),
      createMockFilter(['Norsk', 'Engelsk'], 'Språk'),
    ]);

    return (
      <div className='w-full max-w-4xl'>
        <ValgteFiltre
          filtre={filters}
          tømFiltreProps={{
            fjernFritekst: () => {
              alert('Fjern fritekst kalt');
            },
          }}
        />
      </div>
    );
  },
};

export const FåFiltre: Story = {
  name: 'Få filtre',
  parameters: {
    docs: {
      description: {
        story:
          'Eksempel med få filtre hvor alle vises uten behov for utvidbar knapp.',
      },
    },
  },
  render: () => {
    const [filters] = useState([
      createMockFilter(['Oslo'], 'Sted'),
      createMockFilter(['Følges opp'], 'Status'),
    ]);

    return (
      <ValgteFiltre
        filtre={filters}
        tømFiltreProps={{
          fjernFritekst: () => {
            alert('Fjern fritekst kalt');
          },
        }}
      />
    );
  },
};

export const IngenFiltre: Story = {
  name: 'Ingen filtre',
  parameters: {
    docs: {
      description: {
        story:
          'Når det ikke er valgt noen filtre vises komponenten ikke (returnerer null).',
      },
    },
  },
  render: () => {
    return (
      <ValgteFiltre
        filtre={[]}
        tømFiltreProps={{
          fjernFritekst: () => {
            alert('Fjern fritekst kalt');
          },
        }}
      />
    );
  },
};

export const UtenFjernAlle: Story = {
  name: 'Uten "Fjern alle" knapp',
  parameters: {
    docs: {
      description: {
        story:
          'Visning uten "Fjern alle filtre" knapp når tømFiltreProps ikke er oppgitt.',
      },
    },
  },
  render: () => {
    const [filters] = useState([
      createMockFilter(['Oslo'], 'Sted'),
      createMockFilter(['Følges opp'], 'Status'),
      createMockFilter(['Tømrer'], 'Kompetanse'),
    ]);

    return <ValgteFiltre filtre={filters} />;
  },
};

export const MedEksluderteParametre: Story = {
  name: 'Med ekskluderte parametere',
  parameters: {
    docs: {
      description: {
        story:
          'Eksempel hvor "Fjern alle filtre" ikke fjerner alle URL-parametere, men beholder spesifiserte parametere.',
      },
    },
  },
  render: () => {
    const [filters] = useState([
      createMockFilter(['Oslo', 'Bergen'], 'Sted'),
      createMockFilter(['Følges opp'], 'Status'),
      createMockFilter(['Tømrer', 'Snekker'], 'Kompetanse'),
    ]);

    return (
      <ValgteFiltre
        filtre={filters}
        tømFiltreProps={{
          fjernFritekst: () => {
            alert('Fjern fritekst kalt');
          },
          exlude: ['customParam', 'anotherParam'],
        }}
      />
    );
  },
};

export const FlereLinjerNårÅpen: Story = {
  name: 'Flere linjer når åpen',
  parameters: {
    docs: {
      description: {
        story:
          'Viser hvordan filtre brytes over flere linjer når de ekspanderes, med toggle-knappen til slutt.',
      },
    },
  },
  render: () => {
    const [filters] = useState([
      createMockFilter(['Oslo'], 'Sted'),
      createMockFilter(['Følges opp'], 'Status'),
      createMockFilter(['Tømrer'], 'Kompetanse'),
      createMockFilter(['Deltid'], 'Stillingsstørrelse'),
      createMockFilter(['Junior'], 'Erfaring'),
      createMockFilter(['Norsk'], 'Språk'),
      createMockFilter(['Bachelor'], 'Utdanning'),
      createMockFilter(['5+ år'], 'Arbeidserfaring'),
      createMockFilter(['Remote'], 'Arbeidssted'),
      createMockFilter(['Heltid'], 'Stillingsprosent'),
    ]);

    return (
      <div className='w-full max-w-2xl border p-4'>
        <h3 className='mb-2 font-semibold'>Åpne for å se flere linjer:</h3>
        <ValgteFiltre
          filtre={filters}
          tømFiltreProps={{
            fjernFritekst: () => {
              alert('Fjern fritekst kalt');
            },
          }}
        />
      </div>
    );
  },
};
