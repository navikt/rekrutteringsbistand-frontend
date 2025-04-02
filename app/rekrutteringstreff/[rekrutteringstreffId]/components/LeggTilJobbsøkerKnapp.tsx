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

  // TODO: Bytt ut med kandidatsøket
  const handleLeggTil = () => {
    const jobbsøker = {
      fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
      fornavn: faker.person.firstName(),
      etternavn: faker.person.lastName(),
      kandidatnummer: 'PAM016jg9faeo',
    };

    const mutateId = jobbsøkereEndepunkt(rekrutteringstreffId);
    console.log('LeggTilJobbsøkerKnapp mutateId', mutateId);

    if (jobbsøker) {
      leggtilNyJobbsøker(jobbsøker, rekrutteringstreffId)
        .then(() => {
          console.log('Legg til jobbsøker', jobbsøker);

          const currentTab = new URLSearchParams(window.location.search).get(
            'visFane',
          );
          console.log('Nåværende fane:', currentTab);

          if (currentTab === RekrutteringstreffTabs.JOBBSØKERE) {
            mutate(mutateId, true);
            console.log(
              'Er i jobbsæker fane, mutate kjørt for oppdatering av jobbsøkere',
            );
          } else {
            router.push(
              `/rekrutteringstreff/${rekrutteringstreffId}?visFane=${RekrutteringstreffTabs.JOBBSØKERE}`,
            );
            console.log(
              'Navigerer til fanen:',
              RekrutteringstreffTabs.JOBBSØKERE,
            );
          }
        })
        .catch((error) => {
          console.error('Feil ved leggtilNyJobbsøker:', error);
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
