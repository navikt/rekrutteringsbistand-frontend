'use client';
import { Button } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { FinnArbeidsgiverDTO } from '../../api/stilling/finn-arbeidsgiver/useFinnArbeidsgiver';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import { OpprettStillingKnapp } from '../../stilling/ny-stilling/components/OpprettStilling';
import VelgArbeidsgiver from '../../stilling/ny-stilling/components/VelgArbeidsgiver';
import { Stillingskategori } from '../../stilling/stilling-typer';

const NyFormidling: React.FC = () => {
  const router = useRouter();

  const [arbeidsgiver, setArbeidsgiver] =
    React.useState<FinnArbeidsgiverDTO | null>(null);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SideLayout banner={<SideTopBanner tittel='Etterregistrer formidling' />}>
      <div>
        <div className='grid'>
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
            stillingskategori={Stillingskategori.Formidling}
            arbeidsgiver={arbeidsgiver}
          />
        </div>
      </div>
    </SideLayout>
  );
};

export default NyFormidling;
