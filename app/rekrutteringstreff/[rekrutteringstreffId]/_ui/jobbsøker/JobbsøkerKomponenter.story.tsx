import InviterModal, { InviterInternalDto } from './InviterModal';
import JobbsøkerHendelserKort from './JobbsøkerHendelserKort';
import JobbsøkerKort from './JobbsøkerKort';
import LeggTilJobbsøkerKnapp from './LeggTilJobbsøkerKnapp';
import NavnLenke from './NavnLenke';
import { RekrutteringstreffProvider } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { AktivtSteg } from '@/app/rekrutteringstreff/_types/constants';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef, useState } from 'react';

// Minimal mock av SWRLaster for å unngå nettverkskall
const SWRLasterMock: React.FC<{ children: (data: any) => React.ReactNode }> = ({
  children,
}) => {
  // Returner fiktive jobbsøkere slik Jobbsøkere-komponent ville fått dem fra API
  const jobbsøkere = [
    {
      fornavn: 'Ola',
      etternavn: 'Nordmann',
      personTreffId: 'person-1',
      fødselsnummer: '01010112345',
      veilederNavIdent: 'Z123456',
      veilederNavn: 'Veileder V',
      navkontor: 'NAV Oslo',
      hendelser: [
        {
          id: 'h1',
          hendelsestype: 'OPPRETT',
          tidspunkt: new Date().toISOString(),
          aktørIdentifikasjon: 'Z654321',
          fornavn: 'Ola',
          etternavn: 'Nordmann',
          fødselsnummer: '01010112345',
          kandidatnummer: 'kand1',
          personTreffId: 'person-1',
        },
      ],
    },
    {
      fornavn: 'Kari',
      etternavn: 'Hansen',
      personTreffId: 'person-2',
      fødselsnummer: '02020254321',
      veilederNavIdent: 'Z111111',
      veilederNavn: 'Veileder K',
      navkontor: 'NAV Bergen',
      hendelser: [
        {
          id: 'h2',
          hendelsestype: 'OPPRETT',
          tidspunkt: new Date().toISOString(),
          aktørIdentifikasjon: 'Z222222',
          fornavn: 'Kari',
          etternavn: 'Hansen',
          fødselsnummer: '02020254321',
          kandidatnummer: 'kand2',
          personTreffId: 'person-2',
        },
        {
          id: 'h3',
          hendelsestype: 'INVITER',
          tidspunkt: new Date().toISOString(),
          aktørIdentifikasjon: 'Z222222',
          fornavn: 'Kari',
          etternavn: 'Hansen',
          fødselsnummer: '02020254321',
          kandidatnummer: 'kand2',
          personTreffId: 'person-2',
        },
      ],
    },
  ];

  return <>{children(jobbsøkere)}</>;
};

// Enkel mock av Jobbsøkere-komponenten for story (isolert fra hooks)
const JobbsøkereMock: React.FC = () => {
  const [valgte, setValgte] = useState<Set<string>>(new Set());
  const [inviterModalJobbsøkere, setInviterModalJobbsøkere] = useState<
    InviterInternalDto[]
  >([]);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  return (
    <SWRLasterMock>
      {(jobbsøkere: any[]) => (
        <div style={{ display: 'grid', gap: '1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {jobbsøkere.map((j) => {
              const erValgt = valgte.has(j.fødselsnummer);
              return (
                <li key={j.fødselsnummer}>
                  <JobbsøkerKort
                    fornavn={j.fornavn}
                    etternavn={j.etternavn}
                    personTreffId={j.personTreffId}
                    fødselsnummer={j.fødselsnummer}
                    navKontor={j.navkontor}
                    veileder={{
                      navn: j.veilederNavn,
                      navIdent: j.veilederNavIdent,
                    }}
                    datoLagtTil={new Date().toLocaleDateString('nb-NO')}
                    lagtTilAv={'Z654321'}
                    status={undefined}
                    aktivtSteg={AktivtSteg.INVITERE}
                    statusVariant={undefined}
                    erValgt={erValgt}
                    onCheckboxChange={(checked) => {
                      setValgte((prev) => {
                        const next = new Set(prev);
                        if (checked) next.add(j.fødselsnummer);
                        else next.delete(j.fødselsnummer);
                        return next;
                      });
                    }}
                    kanInviteres
                    onInviterClick={() => {
                      setInviterModalJobbsøkere([
                        {
                          personTreffId: j.personTreffId,
                          fornavn: j.fornavn,
                          etternavn: j.etternavn,
                          fødselsnummer: j.fødselsnummer,
                          veilederNavIdent: j.veilederNavIdent,
                        },
                      ]);
                      modalRef.current?.showModal();
                    }}
                  />
                </li>
              );
            })}
          </ul>
          <InviterModal
            modalref={modalRef}
            inviterInternalDtoer={inviterModalJobbsøkere}
            onInvitasjonSendt={() => {
              modalRef.current?.close();
              setInviterModalJobbsøkere([]);
              setValgte(new Set());
            }}
            onFjernJobbsøker={(fnr) =>
              setInviterModalJobbsøkere((prev) =>
                prev.filter((p) => p.fødselsnummer !== fnr),
              )
            }
          />
        </div>
      )}
    </SWRLasterMock>
  );
};

const Section = (props: { title: string; children: React.ReactNode }) => (
  <section style={{ display: 'grid', gap: '0.5rem' }}>
    <h4 style={{ fontWeight: 600, fontSize: '0.85rem' }}>{props.title}</h4>
    {props.children}
  </section>
);

const meta: Meta = {
  title: 'App/Rekrutteringstreff/JobbsøkerKomponenter',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Samleside for jobbsøker-relaterte UI-komponenter. Hver seksjon viser en enkelt komponent i en minimal state.',
      },
    },
  },
  decorators: [
    (Story) => (
      <RekrutteringstreffProvider rekrutteringstreffId='storybook-treff'>
        <Story />
      </RekrutteringstreffProvider>
    ),
  ],
  render: () => {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [åpen, setÅpen] = useState(false);

    return (
      <div style={{ display: 'grid', gap: '2.5rem' }}>
        <Section title='JobbsøkerKort'>
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
            aktivtSteg={AktivtSteg.INVITERE}
            onCheckboxChange={() => {}}
            erValgt={false}
            kanInviteres
            onInviterClick={() => setÅpen(true)}
          />
        </Section>

        <Section title='Jobbsøkere (liste mock)'>
          <JobbsøkereMock />
        </Section>

        <Section title='JobbsøkerHendelserKort (tom)'>
          <JobbsøkerHendelserKort jobbsøkerHendelserDTO={[]} />
        </Section>

        <Section title='LeggTilJobbsøkerKnapp & InviterModal'>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <LeggTilJobbsøkerKnapp />
            <button
              type='button'
              onClick={() => setÅpen(true)}
              style={{
                border: '1px solid #ccc',
                padding: '0.5rem 0.75rem',
                borderRadius: 4,
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Åpne InviterModal
            </button>
            <InviterModal
              modalref={modalRef}
              inviterInternalDtoer={[
                {
                  personTreffId: 'person-1',
                  fornavn: 'Ola',
                  etternavn: 'Nordmann',
                  fødselsnummer: '01010112345',
                  veilederNavIdent: 'Z123456',
                },
              ]}
              onFjernJobbsøker={() => {}}
              onInvitasjonSendt={() => {
                setÅpen(false);
              }}
            />
            {åpen && (
              <p style={{ fontSize: 12, color: '#555' }}>
                (Modal ville vært åpen her dersom komponenten styrer dialog)
              </p>
            )}
          </div>
        </Section>

        <Section title='NavnLenke'>
          <NavnLenke
            fornavn='Ola'
            etternavn='Nordmann'
            personTreffId='person-1'
          />
        </Section>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Oversikt: Story = {};
