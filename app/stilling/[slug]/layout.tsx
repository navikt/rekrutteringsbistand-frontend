'use client';
import { Buildings2Icon, PersonIcon } from '@navikt/aksel-icons';
import * as React from 'react';
import TekstMedIkon from '../../../components/TekstMedIkon';
import SideLayout from '../../../components/layout/SideLayout';
import SideTopBanner from '../../../components/layout/SideTopBanner';
import StillingsTag from '../../stillings-sok/components/StillingsTag';
import capitalizeEmployerName, { navnEierAvAstilling } from '../stilling-util';
import {
  StillingsContextProvider,
  useStillingsContext,
} from './StillingsContext';
import KopierStillingLenke from './components/KopierStillingLenke';
import StillingsIkon from './icons/se-mine-stillinger.svg';

interface StillingSideRootLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}
export default function RootLayout({
  children,
  params,
}: StillingSideRootLayoutProps) {
  return (
    <StillingsContextProvider stillingsId={params.slug}>
      <StillingSideLayout>{children}</StillingSideLayout>
    </StillingsContextProvider>
  );
}

interface StillingSideLayoutProps {
  children?: React.ReactNode;
}

const StillingSideLayout: React.FC<StillingSideLayoutProps> = ({
  children,
}) => {
  const { stillingsData, erEier, kandidatlisteId } = useStillingsContext();
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
              <KopierStillingLenke
                stillingsId={stillingsData.stilling.uuid ?? ''}
              />
            </>
          }
          tilbakeKnapp
          ikon={<StillingsIkon />}
          tittel={stillingsData.stilling.title ?? ''}
        />
      }
    >
      {children}
    </SideLayout>
  );
};
