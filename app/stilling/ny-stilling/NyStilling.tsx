'use client';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FinnArbeidsgiverDTO } from '../../api/stilling/finn-arbeidsgiver/useFinnArbeidsgiver';
import { Stillingskategori } from '../stilling-typer';
import { OpprettStillingKnapp } from './components/OpprettStilling';
import VelgArbeidsgiver from './components/VelgArbeidsgiver';
import VelgStillingskategori from './components/VelgStillingskategori';

const NyStilling: React.FC = () => {
  const router = useRouter();

  const [stillingskategori, setStillingskategori] =
    React.useState<Stillingskategori | null>(null);

  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<FinnArbeidsgiverDTO | null>(null);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <div className='grid'>
        <VelgStillingskategori
          setStillingskategori={setStillingskategori}
          stillingskategori={stillingskategori}
        />
        <VelgArbeidsgiver setArbeidsgiver={setArbeidsgiver} />
      </div>
      <div className='flex justify-end mt-4'>
        <Button className={'mr-4'} variant={'secondary'} onClick={handleGoBack}>
          Avbryt
        </Button>
        <OpprettStillingKnapp
          stillingskategori={stillingskategori}
          arbeidsgiver={arbeidsgiver}
        />
      </div>
    </div>
  );
};

export default NyStilling;
