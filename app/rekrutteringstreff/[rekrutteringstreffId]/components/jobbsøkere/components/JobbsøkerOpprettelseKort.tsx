import { RekrutteringstreffTabs } from '../../../Rekrutteringstreff';
import { useRekrutteringstreffContext } from '../../../RekrutteringstreffContext';
import JobbsøkerIcon from './JobbsøkerIcon';
import { leggtilNyJobbsøker } from '@/app/api/rekrutteringstreff/ny-arbeidssøker/leggTilNyjobbsøker';
import { rekbisError } from '@/util/rekbisError';
import { faker } from '@faker-js/faker/locale/nb_NO';
import { PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import navfaker from 'nav-faker/dist/index';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const JobbsøkerOpprettelseKort = () => {
  const router = useRouter();
  const rekrutteringstreffId =
    useRekrutteringstreffContext().rekrutteringstreffId;

  const handleLeggTil = () => {
    const jobbsøker = {
      fødselsnummer: navfaker.personIdentifikator.fødselsnummer(),
      fornavn: faker.person.firstName(),
      etternavn: faker.person.lastName(),
    };

    console.log('jobbsøker', jobbsøker);

    if (jobbsøker) {
      leggtilNyJobbsøker(jobbsøker, rekrutteringstreffId)
        .then(() => {
          router.push(
            `/rekrutteringstreff/${rekrutteringstreffId}?visFane=${RekrutteringstreffTabs.JOBBSØKERE}`,
          );
        })
        .catch((error) => {
          throw new rekbisError({
            beskrivelse: 'Feiler når prøver å legge til ny arbeidsgiver:',
            error,
          });
        });
    }
  };

  return (
    <div>
      <Box.New
        background='neutral-softA'
        className='mb-4 max-w-[30rem] flex flex-col items-center justify-center'
        borderColor='neutral-subtleA'
        borderRadius='xlarge'
        borderWidth='1'
        padding='6'
      >
        <div>
          <Heading level='2' size='medium' className='mb-4 text-left'>
            Jobbsøker
          </Heading>
          <div className='p-4 mb-12 flex flex-col items-center'>
            <Box.New
              background='raised'
              className='rounded-full mb-2 flex items-center justify-center'
            >
              <JobbsøkerIcon />
            </Box.New>
            <BodyShort className='text-center'>
              <span className='block'>
                Finn og legg til en jobbsøker så dukker aktivitetene deres opp
                her.
              </span>
            </BodyShort>
          </div>
          <div>
            <Button
              icon={<PlusIcon />}
              type='button'
              variant='secondary'
              onClick={handleLeggTil}
              className='w-full max-w-2xl'
            >
              Legg til jobbsøker
            </Button>
          </div>
        </div>
      </Box.New>
    </div>
  );
};

export default JobbsøkerOpprettelseKort;
