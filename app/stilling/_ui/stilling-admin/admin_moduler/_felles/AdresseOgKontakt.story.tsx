import LeggTilKontaktperson from './LeggTilKontaktperson';
import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';
import VelgPoststed from './VelgPoststed';
import { MockStillingsProvider } from '@/.storybook/mocks';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';

// Adresse og kontakt-relaterte fellesmoduler.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <AdresseOgKontaktInnhold />
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};

// Lokal helper for å vise komponenter med minimale props
function AdresseOgKontaktInnhold() {
  const { control } = useForm();
  return (
    <div className='grid md:grid-cols-3 gap-8 opacity-60 pointer-events-none'>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>VelgPoststed</h4>
        <VelgPoststed
          control={control}
          lokasjonsFelt='lokasjoner'
          index={0}
          fjern={() => {}}
          oppdaterPoststed={() => {}}
          postSted={null}
        />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>VelgKommuneFylkeEllerLand</h4>
        <VelgKommuneFylkeEllerLand
          lokasjoner={[]}
          leggTilLokasjon={() => {}}
          fjernLokasjonId={() => {}}
        />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>LeggTilKontaktperson</h4>
        <LeggTilKontaktperson />
      </div>
    </div>
  );
}
