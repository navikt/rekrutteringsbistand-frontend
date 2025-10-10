import { DatoVelger } from './DatoVelger';
import EndreStillingStatus from './EndreStillingStatus';
import LeggTilKontaktperson from './LeggTilKontaktperson';
import RedigerBoks from './RedigerBoks';
import VelgArbeidsgiver from './VelgArbeidsgiver';
import VelgKommuneFylkeEllerLand from './VelgKommuneFylkeEllerLand';
import VelgPoststed from './VelgPoststed';
import { StillingsStatus } from '@/app/stilling/_ui/stilling-typer';
import { MockStillingsProvider } from '@/storybook/mocks';
import { PencilIcon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';

// Felles admin input-moduler (inert)

const meta = {
  tags: ['autodocs'],
  render: () => (
    <MockStillingsProvider>
      <FellesInputInnhold />
    </MockStillingsProvider>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};

function FellesInputInnhold() {
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
        <h4 className='text-sm font-semibold'>VelgArbeidsgiver</h4>
        <VelgArbeidsgiver arbeidsgiverCallback={() => {}} />
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
        <h4 className='text-sm font-semibold'>DatoVelger</h4>
        <DatoVelger label='Velg dato' setDato={() => {}} />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>LeggTilKontaktperson</h4>
        <LeggTilKontaktperson />
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>RedigerBoks</h4>
        <RedigerBoks tittel='Tittel'>Innhold</RedigerBoks>
      </div>
      <div className='space-y-2'>
        <h4 className='text-sm font-semibold'>EndreStillingStatus</h4>
        <EndreStillingStatus
          nyStatus={StillingsStatus.Aktiv}
          tekst='Endre status til aktiv?'
          knappNavn='Aktiver'
          knappIkon={<PencilIcon aria-hidden />}
        />
      </div>
    </div>
  );
}
