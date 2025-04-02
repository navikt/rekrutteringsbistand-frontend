import { RekrutteringstreffTabs } from '../Rekrutteringstreff';
import { useRekrutteringstreffContext } from '../RekrutteringstreffContext';
import { jobbsøkereEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
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

  const handleLeggTil = () => {
    const jobbsøker = {
      fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
      fornavn: faker.person.firstName(),
      etternavn: faker.person.lastName(),
    };

    if (jobbsøker) {
      leggtilNyJobbsøker(jobbsøker, rekrutteringstreffId)
        .then(() => {
          mutate(jobbsøkereEndepunkt(rekrutteringstreffId), true);
          router.push(
            `/rekrutteringstreff/${rekrutteringstreffId}?visFane=${RekrutteringstreffTabs.JOBBSØKERE}`,
          );
        })
        .catch((error) => {
          throw new rekbisError({
            beskrivelse: 'Feiler når prøver å legge til ny jobbsøker:',
            error,
          });
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
