'use client';

import { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  Alert,
  BodyShort,
  Checkbox,
  Loader,
  Search,
  VStack,
} from '@navikt/ds-react';
import { FC, useMemo } from 'react';

interface Props {
  jobbsøkere: JobbsøkerDTO[];
  laster: boolean;
  valgteFnr: string[];
  onToggle: (fnr: string) => void;
  søk: string;
  onSøk: (verdi: string) => void;
  hjelpetekst?: string;
}

const JobbsøkerVelger: FC<Props> = ({
  jobbsøkere,
  laster,
  valgteFnr,
  onToggle,
  søk,
  onSøk,
  hjelpetekst,
}) => {
  const filtrerte = useMemo(() => {
    const q = søk.trim().toLowerCase();
    if (!q) return jobbsøkere;
    return jobbsøkere.filter((j) => {
      const fulltNavn = `${j.fornavn ?? ''} ${j.etternavn ?? ''}`
        .toLowerCase()
        .trim();
      const omvendt = `${j.etternavn ?? ''} ${j.fornavn ?? ''}`
        .toLowerCase()
        .trim();
      return (
        fulltNavn.includes(q) ||
        omvendt.includes(q) ||
        j.fødselsnummer.includes(q)
      );
    });
  }, [jobbsøkere, søk]);

  if (laster) return <Loader />;
  if (jobbsøkere.length === 0) {
    return (
      <Alert variant='info'>Treffet har ingen jobbsøkere å legge til.</Alert>
    );
  }

  return (
    <VStack gap='space-8'>
      {hjelpetekst && <BodyShort textColor='subtle'>{hjelpetekst}</BodyShort>}
      <Search
        label='Søk etter navn eller fødselsnummer'
        hideLabel
        size='small'
        variant='simple'
        placeholder='Søk etter navn eller fødselsnummer'
        value={søk}
        onChange={(verdi) => onSøk(verdi)}
      />
      <BodyShort size='small' textColor='subtle'>
        {valgteFnr.length} valgt av {jobbsøkere.length}
      </BodyShort>
      <div className='border-border-subtle border-t pt-2'>
        {filtrerte.length === 0 ? (
          <BodyShort textColor='subtle'>
            Ingen jobbsøkere matcher søket.
          </BodyShort>
        ) : (
          filtrerte.map((j) => (
            <Checkbox
              key={j.personTreffId}
              checked={valgteFnr.includes(j.fødselsnummer)}
              onChange={() => onToggle(j.fødselsnummer)}
            >
              <div>
                <BodyShort weight='semibold'>
                  {j.etternavn ?? ''}
                  {j.etternavn && j.fornavn ? ', ' : ''}
                  {j.fornavn ?? ''}
                </BodyShort>
                <BodyShort size='small' textColor='subtle'>
                  f.nr {j.fødselsnummer}
                </BodyShort>
              </div>
            </Checkbox>
          ))
        )}
      </div>
    </VStack>
  );
};

export default JobbsøkerVelger;
