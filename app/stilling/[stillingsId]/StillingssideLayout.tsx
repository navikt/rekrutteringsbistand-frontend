'use client';
import { Buildings2Icon, PersonIcon } from '@navikt/aksel-icons';
import { Alert, Heading } from '@navikt/ds-react';
import Image from 'next/image';
import * as React from 'react';
import StillingsIkon from '../../../public/ikoner/se-mine-stillinger.svg';
import TekstMedIkon from '../../components/TekstMedIkon';
import SideLayout from '../../components/layout/SideLayout';
import SideTopBanner from '../../components/layout/SideTopBanner';
import StillingsTag from '../../stillings-sok/components/StillingsTag';
import capitalizeEmployerName, { navnEierAvAstilling } from '../stilling-util';
import { useStillingsContext } from './StillingsContext';
import KopierStillingLenke from './components/KopierStillingLenke';

interface StillingSideLayoutProps {
  children?: React.ReactNode;
}

const StillingSideLayout: React.FC<StillingSideLayoutProps> = ({
  children,
}) => {
  const { stillingsData, erFormidling, erSlettet } = useStillingsContext();
  const eierNavn = navnEierAvAstilling(stillingsData);

  const ugyldigStilling =
    stillingsData?.stilling?.medium === 'DIR' &&
    (stillingsData?.stilling?.employer?.orgnr ?? null) === null;

  return (
    <SideLayout
      banner={
        <SideTopBanner
          chip={<StillingsTag stillingsData={stillingsData} />}
          headerInnhold={
            <>
              <div className='flex my-2'>
                <TekstMedIkon
                  ikon={<Buildings2Icon />}
                  tekst={capitalizeEmployerName(
                    stillingsData.stilling.businessName ?? '',
                  )}
                />

                {eierNavn && (
                  <TekstMedIkon
                    className='ml-4'
                    ikon={<PersonIcon />}
                    tekst={`Registrert av ${eierNavn}`}
                  />
                )}
              </div>
              {(!erFormidling || erSlettet) && (
                <KopierStillingLenke
                  stillingsId={stillingsData.stilling.uuid ?? ''}
                />
              )}
            </>
          }
          tilbakeKnapp
          ikon={<Image src={StillingsIkon} alt='Se mine stillinger' />}
          tittel={stillingsData.stilling.title ?? ''}
        />
      }
    >
      {ugyldigStilling ? (
        <Alert variant='error'>
          <Heading spacing size='small' level='3'>
            Ugyldig stilling
          </Heading>
          <p>
            Denne stillingen er ikke gyldig da det er en intern stilling som
            mangler organisasjonsnummer.
          </p>
          <p> Stillingen er derfor ikke tilgjengelig for rekruttering.</p>
        </Alert>
      ) : (
        children
      )}
    </SideLayout>
  );
};

export default StillingSideLayout;
