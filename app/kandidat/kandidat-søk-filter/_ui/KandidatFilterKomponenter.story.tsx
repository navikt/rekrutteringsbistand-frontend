import Arbeidserfaring from './Arbeidserfaring';
import Arbeidsønsker from './Arbeidsønsker';
import FritekstSøk from './FritekstSøk';
import Førerkort from './Førerkort';
import Innsatsgrupper from './Innsatsgrupper';
import KandidatStedSøk from './KandidatStedSøk';
import Kompetanse from './Kompetanse';
import PrioriterteMålgrupper from './PrioriterteMålgrupper';
import Språk from './Språk';
import Utdanningsnivå from './Utdanningsnivå';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Disse komponentene er sterkt avhengige av context + API hooks. Vi viser dem i en inert tilstand.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='max-w-[880px] grid grid-cols-1 md:grid-cols-2 gap-8 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Arbeidsønsker</h4>
        <Arbeidsønsker />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Kompetanse</h4>
        <Kompetanse />
      </section>
      <section className='space-y-2 md:col-span-2'>
        <h4 className='font-semibold text-sm'>Innsatsgrupper</h4>
        <Innsatsgrupper />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Utdanningsnivå</h4>
        <Utdanningsnivå />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Språk</h4>
        <Språk />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Førerkort</h4>
        <Førerkort />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Arbeidserfaring</h4>
        <Arbeidserfaring />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Prioriterte målgrupper</h4>
        <PrioriterteMålgrupper />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Fritekstsøk</h4>
        <FritekstSøk />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Kandidat sted søk</h4>
        <KandidatStedSøk />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {};
