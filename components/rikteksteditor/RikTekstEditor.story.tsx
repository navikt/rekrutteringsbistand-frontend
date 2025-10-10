import RikTekstEditor, { IRikTekstEditor } from './RikTekstEditor';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

// Common render helper so we can keep internal editor state in sync with Storybook controls
const EditorWrapper = (
  props: Omit<IRikTekstEditor, 'onChange'> & { initial?: string },
) => {
  const [value, setValue] = useState<string>(
    props.tekst ?? props.initial ?? '',
  );
  return (
    <div style={{ width: '100%', maxWidth: 720 }}>
      <RikTekstEditor
        {...props}
        tekst={value}
        onChange={(html) => {
          setValue(html);
        }}
      />
      <div style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.7 }}>
        <strong>HTML output:</strong>
        <div
          style={{
            border: '1px solid var(--ax-border-neutral-subtle)',
            padding: '0.5rem',
            marginTop: '0.25rem',
            borderRadius: 4,
          }}
        >
          <code style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {value || '<tom>'}
          </code>
        </div>
      </div>
    </div>
  );
};

const meta: Meta<typeof RikTekstEditor> = {
  tags: ['autodocs'],
  component: RikTekstEditor,

  // Provide required props with safe defaults. onChange is overridden inside render wrapper.
  args: {
    id: 'riktekst-editor',
    onChange: () => {},
    tekst: '',
  },
  render: (args) => <EditorWrapper {...(args as any)} />,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Tom: Story = {};

export const MedStartinnhold: Story = {
  args: { tekst: '<p>Skriv noe her…</p>' },
};

export const SkjultToolbar: Story = {
  args: {
    skjulToolbar: true,
    tekst: '<p>Toolbar er skjult i denne varianten.</p>',
  },
};

export const MedFeilmelding: Story = {
  args: {
    tekst: '<p>Dette feltet har en feil.</p>',
    feilMelding: 'Du må fylle inn tekst',
  },
};

export const MedUtviklerExtensions: Story = {
  args: {
    tekst:
      '<p>Marker en tekst og trykk lenke‑ikonet for å legge til en URL.</p>',
    utviklerExtensions: true,
  },
};

export const ListeOgFormatering: Story = {
  args: {
    tekst:
      '<p><strong>Eksempel:</strong></p><ul><li>Første punkt</li><li><em>Andre</em> punkt</li><li>Tredje punkt</li></ul>',
  },
};

export const Interaktiv: Story = {
  name: 'Interaktiv (skriv her)',
  args: {
    tekst: '<p>Prøv å skrive / formattere tekst her.</p>',
    utviklerExtensions: true,
  },
};
