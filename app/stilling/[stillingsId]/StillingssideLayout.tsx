'use client';
import { Buildings2Icon, PersonIcon } from '@navikt/aksel-icons';
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
  const { stillingsData, erEier, erFormidling } = useStillingsContext();
  const eierNavn = navnEierAvAstilling(stillingsData);

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
              {!erFormidling && (
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
      {children}
    </SideLayout>
  );
};

export default StillingSideLayout;
