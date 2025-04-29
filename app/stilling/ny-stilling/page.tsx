'use client';

import { ArbeidsgiverDTO } from '../../api/pam-search/underenhet/useArbeidsgiver';
import HovedInnholdKort from '../../components/layout/HovedInnholdKort';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { Stillingskategori } from '../stilling-typer';
import { OpprettStillingKnapp } from './components/OpprettStilling';
import VelgArbeidsgiver from './components/VelgArbeidsgiver';
import VelgStillingskategori from './components/VelgStillingskategori';
import { Alert, BodyLong, Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

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
    <HovedInnholdKort>
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
            <VelgArbeidsgiver arbeidsgiverCallback={setArbeidsgiver} />
          </div>
          <div className='mt-4 flex justify-end'>
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
    </HovedInnholdKort>
  );
};

export default NyStilling;
