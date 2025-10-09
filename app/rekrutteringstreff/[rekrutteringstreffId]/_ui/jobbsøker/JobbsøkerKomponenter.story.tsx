import InviterModal from './InviterModal';
import JobbsøkerHendelserKort from './JobbsøkerHendelserKort';
import JobbsøkerKort from './JobbsøkerKort';
import Jobbsøkere from './Jobbsøkere';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import NavnLenke from './NavnLenke';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// Inert samling av jobbsøkerrelaterte komponenter.

const meta = {
  tags: ['autodocs'],
  render: () => (
    <div className='space-y-10 opacity-60 pointer-events-none'>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>JobbsøkerKort</h4>
        <JobbsøkerKort
          fornavn='Ola'
          etternavn='Nordmann'
          personTreffId='person-1'
          navKontor='NAV Oslo'
          veileder={{ navn: 'Veileder V', navIdent: 'Z123456' }}
          datoLagtTil='01.10.2025'
          lagtTilAv='Z654321'
          status='Invitert'
          statusVariant='success'
          harPublisert={true}
          onCheckboxChange={() => {}}
          erValgt={false}
          kanInviteres={true}
          onInviterClick={() => {}}
        />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Jobbsøkere (liste)</h4>
        <Jobbsøkere />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>Hendelser kort</h4>
        <JobbsøkerHendelserKort jobbsøkerHendelserDTO={[]} />
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>
          Legg til jobbøker knapp & Invite modal
        </h4>
        <div className='flex gap-4 flex-wrap'>
          <LeggTilJobbsøkerKnapp />
          <InviterModal
            modalref={{ current: null }}
            inviterInternalDtoer={
              [
                {
                  personTreffId: 'person-1',
                  fornavn: 'Ola',
                  etternavn: 'Nordmann',
                  fødselsnummer: '01010112345',
                  veilederNavIdent: 'Z123456',
                },
              ] as any
            }
            onFjernJobbsøker={() => {}}
            onInvitasjonSendt={() => {}}
          />
        </div>
      </section>
      <section className='space-y-2'>
        <h4 className='font-semibold text-sm'>NavnLenke</h4>
        <NavnLenke
          fornavn='Ola'
          etternavn='Nordmann'
          personTreffId='person-1'
        />
      </section>
    </div>
  ),
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;
export const Oversikt: Story = {};
