import AvlystSteg from './AvlystSteg';
import FullføreSteg from './FullføreSteg';
import InvitereSteg from './InvitereSteg';
import PublisereSteg from './PublisereSteg';
import {
  SjekklisteContainer,
  SjekklisteInfo,
  SjekklisteRad,
} from './Sjekkliste';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert oversikt over steg-komponenter.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='pointer-events-none space-y-12 opacity-60'>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>PublisereSteg</h4>
        <PublisereSteg />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>InvitereSteg</h4>
        <InvitereSteg />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>FullføreSteg</h4>
        <FullføreSteg />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold text-red-400'>AvlystSteg</h4>
        <AvlystSteg />
      </section>
      <section className='space-y-2'>
        <h4 className='text-sm font-semibold'>Sjekkliste (byggeklosser)</h4>
        <SjekklisteContainer>
          <SjekklisteRad erOppfylt label='Eksempel punkt' />
          <SjekklisteInfo>Infodel for sjekkliste</SjekklisteInfo>
        </SjekklisteContainer>
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
