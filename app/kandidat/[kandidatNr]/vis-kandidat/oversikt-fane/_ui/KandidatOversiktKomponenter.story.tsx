import KandidatBeskrivelse from './KandidatBeskrivelse';
import KandidatErfaring from './KandidatErfaring';
import KandidatGodkjenninger from './KandidatGodkjenninger';
import KandidatKompetanse from './KandidatKompetanse';
import KandidatSpråk from './KandidatSpråk';
import KandidatUtdanning from './KandidatUtdanning';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Flere av disse komponentene forventer context (useKandidatContext). Vi viser derfor kun de som kan få enkel props direkte.
// De som krever context (KandidatErfaring, KandidatUtdanning m.fl.) settes i en grået inert wrapper uten reell data.

const dummyKompetanse = [
  { kompKodeNavn: 'Teamarbeid' },
  { kompKodeNavn: 'TypeScript' },
  { kompKodeNavn: 'Tilrettelegging' },
] as any;

const dummySpråk = [
  {
    sprakKodeTekst: 'Norsk',
    ferdighetSkriftlig: 'GODT',
    ferdighetMuntlig: 'VELDIG_GODT',
  },
  {
    sprakKodeTekst: 'Engelsk',
    ferdighetSkriftlig: 'VELDIG_GODT',
    ferdighetMuntlig: 'VELDIG_GODT',
  },
] as any;

const dummyGodkjenninger = [
  { tittel: 'Truckførerbevis', konseptId: '1', gjennomfoert: '2023-01-01' },
] as any;

const dummySertifikat = [
  {
    sertifikatKodeNavn: 'Førerkort klasse B',
    sertifikatKode: 'B',
    fraDato: '2020-01-01',
  },
] as any;

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='grid max-w-[1200px] gap-8 md:grid-cols-2'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Beskrivelse</h4>
        <KandidatBeskrivelse kandidatSammendrag='Engasjert kandidat med fokus på kvalitet og samarbeid.' />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Kompetanse</h4>
        <KandidatKompetanse kompetanse={dummyKompetanse} />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Språk</h4>
        <KandidatSpråk språk={dummySpråk} />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Godkjenninger</h4>
        <KandidatGodkjenninger
          godkjenninger={dummyGodkjenninger}
          sertifikatObj={dummySertifikat}
        />
      </section>
      <section className='pointer-events-none space-y-2 opacity-60 md:col-span-2'>
        <h4 className='text-sm font-semibold'>Erfaring (krever context)</h4>
        <KandidatErfaring />
      </section>
      <section className='pointer-events-none space-y-2 opacity-60 md:col-span-2'>
        <h4 className='text-sm font-semibold'>Utdanning (krever context)</h4>
        <KandidatUtdanning />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {};
