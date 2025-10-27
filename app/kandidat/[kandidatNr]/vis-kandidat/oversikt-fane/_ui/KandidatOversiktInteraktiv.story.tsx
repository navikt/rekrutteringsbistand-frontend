import { withKandidatContext } from '../../../../../../.storybook/KandidatContextDecorator';
import KandidatBeskrivelse from './KandidatBeskrivelse';
import KandidatErfaring from './KandidatErfaring';
import KandidatGodkjenninger from './KandidatGodkjenninger';
import KandidatKompetanse from './KandidatKompetanse';
import KandidatSpråk from './KandidatSpråk';
import KandidatUtdanning from './KandidatUtdanning';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Forsøk på interaktiv variant: Avhenger av at SWR mocker leverer data; hvis ikke vises kun basiskomponenter uten data.

const meta = {
  decorators: [withKandidatContext],
  tags: ['autodocs'],
  render: () => (
    <div className='grid md:grid-cols-2 gap-8 max-w-[1200px]'>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Sammendrag (context)</h4>
        <KandidatBeskrivelse kandidatSammendrag='(Hentes fra context hvis tilgjengelig)' />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Kompetanse (context fallback)</h4>
        <KandidatKompetanse kompetanse={[]} />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Språk (context fallback)</h4>
        <KandidatSpråk språk={[]} />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>
          Godkjenninger (context fallback)
        </h4>
        <KandidatGodkjenninger godkjenninger={[]} sertifikatObj={[]} />
      </section>
      <section className='space-y-2 md:col-span-2'>
        <h4 className='font-semibold text-sm'>Erfaring (context)</h4>
        <KandidatErfaring />
      </section>
      <section className='space-y-2 md:col-span-2'>
        <h4 className='font-semibold text-sm'>Utdanning (context)</h4>
        <KandidatUtdanning />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {};
