'use client';

import LeggTilArbeidsgiverModal from './components/LeggTilArbeidsgiverModal';
import ArbeidsgiverKort from './components/arbeidsgivere/components/ArbeidsgiverKort';
import OmTreffet from './components/om-treffet/OmTreffet';
import { ArbeidsgiverDTO } from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import { BodyShort, Box, Heading, Table, Tabs } from '@navikt/ds-react';
import * as React from 'react';

export enum RekrutteringstreffTabs {
  OM_TREFFET = 'om_treffet',
  DELTAKERE = 'deltakere',
  ARBEIDSGIVERE = 'arbeidsgivere',
}

const Rekrutteringstreff: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(
    RekrutteringstreffTabs.OM_TREFFET,
  );
  const [arbeidsgivere, setArbeidsgivere] = React.useState<ArbeidsgiverDTO[]>(
    [],
  );

  const handleLeggTilArbeidsgiver = (arbeidsgiver: ArbeidsgiverDTO | null) => {
    setArbeidsgivere((prev) => (arbeidsgiver ? [...prev, arbeidsgiver] : prev));
    setActiveTab(RekrutteringstreffTabs.ARBEIDSGIVERE);
  };

  return (
    <Box.New>
      <Tabs
        value={activeTab}
        onChange={(value) => setActiveTab(value as RekrutteringstreffTabs)}
      >
        <Tabs.List className='w-full'>
          <Tabs.Tab
            value={RekrutteringstreffTabs.OM_TREFFET}
            label='Om treffet'
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.DELTAKERE}
            label='Deltakere'
          />
          <Tabs.Tab
            value={RekrutteringstreffTabs.ARBEIDSGIVERE}
            label='Arbeidsgivere'
          />
        </Tabs.List>

        <OmTreffet handleLeggTilArbeidsgiver={handleLeggTilArbeidsgiver} />

        <Tabs.Panel value={RekrutteringstreffTabs.DELTAKERE}>
          <div className='p-4'>
            <Heading level='2' size='medium' className='mb-2'>
              Deltakere
            </Heading>
            <BodyShort>TODO</BodyShort>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value={RekrutteringstreffTabs.ARBEIDSGIVERE}>
          <div className='p-4 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <Heading level='2' size='medium'>
                Arbeidsgivere
              </Heading>
              <LeggTilArbeidsgiverModal
                onLeggTilArbeidsgiver={handleLeggTilArbeidsgiver}
                onCloseModal={() => {}}
                leggTilKnappTekst='Legg til arbeidsgiver'
              />
            </div>
            {arbeidsgivere.length === 0 ? (
              <BodyShort>Ingen arbeidsgivere lagt til</BodyShort>
            ) : (
              <ul>
                {arbeidsgivere.map((a, index) => (
                  <li key={index}>
                    {<ArbeidsgiverKort navn={a.navn} adresse={a.adresse} />}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Tabs.Panel>
      </Tabs>
    </Box.New>
  );
};

export default Rekrutteringstreff;
