'use client';

import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import {
  fetchJobbsøkere,
  jobbsøkereEndepunkt,
} from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { leggtilNyJobbsøker } from '@/app/api/rekrutteringstreff/ny-arbeidssøker/leggTilNyjobbsøker';
import { rekbisError } from '@/util/rekbisError';
import { faker } from '@faker-js/faker/locale/nb_NO';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import navfaker from 'nav-faker/dist/index';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { mutate } from 'swr';

interface LeggTilJobbsøkerKnappProps {
  className?: string;
}

const LeggTilJobbsøkerKnapp: React.FC<LeggTilJobbsøkerKnappProps> = ({
  className,
}) => {
  const router = useRouter();
  const rekrutteringstreffId =
    useRekrutteringstreffContext().rekrutteringstreffId;

  const handleLeggTil = async () => {
    const jobbsøker = {
      fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
      fornavn: faker.person.firstName(),
      etternavn: faker.person.lastName(),
      kandidatnummer: 'PAM016jg9faeo',
    };

    const mutateId = jobbsøkereEndepunkt(rekrutteringstreffId);
    const currentTab = new URLSearchParams(window.location.search).get(
      'visFane',
    );

    try {
      await leggtilNyJobbsøker(jobbsøker, rekrutteringstreffId);

      if (currentTab === RekrutteringstreffTabs.JOBBSØKERE) {
        await mutate(mutateId, async () => {
          return await fetchJobbsøkere(mutateId);
        });
      } else {
        router.push(
          `/rekrutteringstreff/${rekrutteringstreffId}?visFane=${RekrutteringstreffTabs.JOBBSØKERE}`,
        );
      }
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
