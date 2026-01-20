import LenkeKortMedIkon from './LenkeKortMedIkon';
import {
  BriefcaseIcon,
  CalendarIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
  PersonIcon,
} from '@navikt/aksel-icons';
import { HStack } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

const meta = {
  tags: ['autodocs'],
  component: LenkeKortMedIkon,

  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LenkeKortMedIkon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MedIkon: Story = {
  args: {
    tittel: 'Se kandidater',
    beskrivelse: 'Bla gjennom alle kandidater i systemet',
    onClick: () => alert('Kort klikket'),
    ikon: <PersonIcon />,
  },
};

export const MedEmoji: Story = {
  args: {
    tittel: 'Opprett stilling',
    beskrivelse: 'Lag en ny stillingsannonse',
    onClick: () => alert('Opprett stilling'),
    ikon: '💼',
  },
};

export const UtenBeskrivelse: Story = {
  args: {
    tittel: 'Min side',
    onClick: () => alert('Min side'),
    ikon: <PersonIcon />,
  },
};

export const Loading: Story = {
  args: {
    tittel: 'Laster data...',
    beskrivelse: 'Vennligst vent',
    onClick: () => {},
    ikon: <PersonIcon />,
    loading: true,
  },
};

export const LangTittel: Story = {
  args: {
    tittel:
      'Dette er en veldig lang tittel som kanskje må bryte til flere linjer',
    beskrivelse:
      'Beskrivelsen er også ganske lang og detaljert for å teste hvordan kortet håndterer mye tekst',
    onClick: () => alert('Langt kort'),
    ikon: <FileTextIcon />,
  },
};

export const FlereKort: Story = {
  args: {
    tittel: '',
    onClick: () => {},
    ikon: <PersonIcon />,
  },
  render: () => (
    <HStack gap='space-16' wrap={false}>
      <LenkeKortMedIkon
        tittel='Kandidater'
        beskrivelse='Se alle kandidater'
        onClick={() => alert('Kandidater')}
        ikon={<PersonIcon />}
      />
      <LenkeKortMedIkon
        tittel='Stillinger'
        beskrivelse='Administrer stillinger'
        onClick={() => alert('Stillinger')}
        ikon={<BriefcaseIcon />}
      />
      <LenkeKortMedIkon
        tittel='Kalender'
        beskrivelse='Se dine avtaler'
        onClick={() => alert('Kalender')}
        ikon={<CalendarIcon />}
      />
    </HStack>
  ),
};

export const ForskjelligeIkoner: Story = {
  args: {
    tittel: '',
    onClick: () => {},
    ikon: <PersonIcon />,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        width: '800px',
      }}
    >
      <LenkeKortMedIkon
        tittel='Person'
        beskrivelse='Med Aksel-ikon'
        onClick={() => {}}
        ikon={<PersonIcon />}
      />
      <LenkeKortMedIkon
        tittel='Emoji'
        beskrivelse='Med emoji-ikon'
        onClick={() => {}}
        ikon='📧'
      />
      <LenkeKortMedIkon
        tittel='Dokument'
        beskrivelse='Dokumenthåndtering'
        onClick={() => {}}
        ikon={<FileTextIcon />}
      />
      <LenkeKortMedIkon
        tittel='Kalender'
        beskrivelse='Avtaler og møter'
        onClick={() => {}}
        ikon='📅'
      />
    </div>
  ),
};

export const Interaktiv: Story = {
  args: {
    tittel: '',
    onClick: () => {},
    ikon: <PersonIcon />,
  },
  render: () => {
    const [klikket, setKlikket] = useState(0);

    return (
      <div>
        <LenkeKortMedIkon
          tittel='Klikk meg'
          beskrivelse={`Klikket ${klikket} ganger`}
          onClick={() => setKlikket((prev) => prev + 1)}
          ikon={<EnvelopeClosedIcon />}
        />
      </div>
    );
  },
};
