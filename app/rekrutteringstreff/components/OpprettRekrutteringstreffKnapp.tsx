import { useApplikasjonContext } from '../../providers/ApplikasjonContext';
import { OpprettNyttRekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/dto';
import { opprettNyttRekrutteringstreff } from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import { rekbisError } from '@/util/rekbisError';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface OpprettRekrutteringstreffKnappProps {
  children?: React.ReactNode | undefined;
}

const OpprettRekrutteringstreffKnapp: React.FC<
  OpprettRekrutteringstreffKnappProps
> = () => {
  const { valgtNavKontor } = useApplikasjonContext();
  const router = useRouter();

  const nyTreff: OpprettNyttRekrutteringstreffDTO = {
    opprettetAvNavkontorEnhetId: valgtNavKontor?.navKontor || null,
  };

  const handleButtonClick = () => {
    opprettNyttRekrutteringstreff(nyTreff)
      .then((response) => {
        const id = response.id;
        router.push(`/rekrutteringstreff/${id}`);
      })
      .catch((error) => {
        throw new rekbisError({
          beskrivelse: 'Feil ved opprettelse av nytt rekrutteringstreff:',
          error,
        });
      });
  };

  return (
    <Button variant='primary' icon={<PlusIcon />} onClick={handleButtonClick}>
      Opprett treff
    </Button>
  );
};

export default OpprettRekrutteringstreffKnapp;
