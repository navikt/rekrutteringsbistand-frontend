'use client';
import { Alert, BodyLong, Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { ArbeidsgiverDTO } from '../../api/pam-search/underenhet/useArbeidsgiver';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { Stillingskategori } from '../stilling-typer';
import { OpprettStillingKnapp } from './components/OpprettStilling';
import VelgArbeidsgiver from './components/VelgArbeidsgiver';
import VelgStillingskategori from './components/VelgStillingskategori';

const NyStilling: React.FC = () => {
  const router = useRouter();

  const [stillingskategori, setStillingskategori] =
    React.useState<Stillingskategori | null>(null);

  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<ArbeidsgiverDTO | null>(null);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SideLayout banner={<SideTopBanner tittel='Opprett ny stilling' />}>
      <div>
        <Alert className='mb-2' variant='warning'>
          <BodyLong spacing>
            Du kan ikke registrere Nav-kurs, webinar, arbeidstrening og
            lignende. Det er kun kategoriene nedenfor som skal brukes.
          </BodyLong>
          <BodyLong>
            Du kan ikke endre stillingskategori eller arbeidsgiver etter
            stillingen er opprettet.
          </BodyLong>
        </Alert>
        <div className='grid'>
          <VelgStillingskategori
            setStillingskategori={setStillingskategori}
            stillingskategori={stillingskategori}
          />
          <VelgArbeidsgiver setArbeidsgiver={setArbeidsgiver} />
        </div>
        <div className='flex justify-end mt-4'>
          <Button
            className={'mr-4'}
            variant={'secondary'}
            onClick={handleGoBack}
          >
            Avbryt
          </Button>
          <OpprettStillingKnapp
            stillingskategori={stillingskategori}
            arbeidsgiver={arbeidsgiver}
          />
        </div>
      </div>
    </SideLayout>
  );
};

export default NyStilling;
