'use client';

import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import {
  leggtilNyJobbsøker,
  LeggTilNyJobbsøkerDTO,
} from '@/app/api/rekrutteringstreff/ny-jobbsøker/leggTilNyjobbsøker';
import { rekbisError } from '@/util/rekbisError';
import { faker } from '@faker-js/faker/locale/nb_NO';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import navfaker from 'nav-faker/dist/index';
import * as React from 'react';

interface LeggTilJobbsøkerKnappProps {
  className?: string;
  onNyJobbsøkerLagtTil?: () => void;
}

const LeggTilJobbsøkerKnapp: React.FC<LeggTilJobbsøkerKnappProps> = ({
  className,
  onNyJobbsøkerLagtTil,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const handleLeggTil = async () => {
    const jobbsøker: LeggTilNyJobbsøkerDTO = {
      fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
      fornavn: faker.person.firstName(),
      etternavn: faker.person.lastName(),
      kandidatnummer: 'PAM016jg9faeo',
      navkontor: 'NAV Asker',
      veilederNavn: 'Jens Jensen',
      veilederNavIdent: 'A123123',
    };

    try {
      await leggtilNyJobbsøker(jobbsøker, rekrutteringstreffId);
      onNyJobbsøkerLagtTil?.();
    } catch (error) {
      throw new rekbisError({
        beskrivelse: 'Feiler når prøver å legge til ny jobbsøker:',
        error,
      });
    }
  };

  return (
    <Button
      icon={<PlusIcon />}
      type='button'
      variant='secondary'
      onClick={handleLeggTil}
      className={className}
    >
      Legg til jobbsøker
    </Button>
  );
};

export default LeggTilJobbsøkerKnapp;
