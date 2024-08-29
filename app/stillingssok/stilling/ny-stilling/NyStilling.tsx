'use client';
import { PlusCircleIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import SideLayout from '../../../../components/layout/SideLayout';
import { Stillingskategori } from '../../../../types/stilling/kategorier';
import VelgArbeidsgiver from './components/VelgArbeidsgiver';
import VelgStillingskategori from './components/VelgStillingskategori';

const NyStilling: React.FC = () => {
  const router = useRouter();

  const [stillingskategori, setStillingskategori] =
    React.useState<Stillingskategori | null>(null);

  const [arbeidsgiver, setArbeidsgiver] = React.useState<string | null>(null);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SideLayout tittel='Opprett ny stilling'>
      <div>
        <Alert className='mb-2' variant='warning'>
          <BodyLong spacing>
            Det arbeides fremdeles med å avklare hva som er lov å registrere i
            Rekrutteringsbistand. Derfor kan du ikke registrere NAV-kurs,
            webinar, arbeidstrening og lignende. Det er kun kategoriene nedenfor
            som skal brukes.
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
          <Button icon={<PlusCircleIcon aria-hidden />} variant='primary'>
            Opprett stilling
          </Button>
        </div>
      </div>
    </SideLayout>
  );
};

export default NyStilling;