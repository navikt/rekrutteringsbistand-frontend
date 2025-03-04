//import { useApplikasjonContext } from '@/app/ApplikasjonContext';
import { OpprettNyttRekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/dto';
import { opprettNyttRekrutteringstreff } from '@/app/api/rekrutteringstreff/nytt-rekrutteringstreff/opprettNyttRekrutteringstreff';
import { PlusIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export interface OpprettRekrutteringstreffKnappProps {
  children?: React.ReactNode | undefined;
}

const OpprettRekrutteringstreffKnapp: React.FC<
  OpprettRekrutteringstreffKnappProps
> = (
  {
    /*children*/
  },
) => {
  //const { valgtNavKontor, brukerData } = useApplikasjonContext();
  const router = useRouter();

  const nyTreff: OpprettNyttRekrutteringstreffDTO = {
    tittel: 'Nytt rekrutteringstreff',
  };
  const handleButtonClick = () => {
    opprettNyttRekrutteringstreff(nyTreff)
      .then((response) => {
        const id = response.id;
        router.push(`/rekrutteringstreff/${id}`);
        //router.push(`/rekrutteringstreff`);
      })
      .catch((error) => {
        console.error('Error while creating rekrutteringstreff:', error);
      });
    //router.push(`/rekrutteringstreff`);
  };

  return (
    <React.Fragment>
      <Button variant='primary' icon={<PlusIcon />} onClick={handleButtonClick}>
        Opprett treff
      </Button>
    </React.Fragment>
  );
};

export default OpprettRekrutteringstreffKnapp;
