'use client';
import { Buildings2Icon, PersonIcon } from '@navikt/aksel-icons';
import { Tabs } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import * as React from 'react';
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
import StillingsKandidater from './kandidater/StillingsKandidater';

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

  const [fane, setFane] = useQueryState('visFane', {
    defaultValue: 'stilling',
    clearOnDefault: true,
  });

  return (
    <SideLayout
      banner={
        <SideTopBanner
          chip={<StillingsTag stillingsData={stillingsData} />}
          headerInnhold={
            <>
              <div className='flex my-2'>
                <div className='flex'>
                  <Buildings2Icon className='mr-2' />
                  {capitalizeEmployerName(stillingsData.stilling.businessName)}
                </div>
                {eierNavn && (
                  <div className='flex ml-4'>
                    <PersonIcon className='mr-2' />
                    Registrert av {eierNavn}
                  </div>
                )}
              </div>
              <KopierStillingLenke stillingsId={stillingsData.stilling.uuid} />
            </>
          }
          tilbakeKnapp
          ikon={<StillingsIkon />}
          tittel={stillingsData.stilling.title}
        />
      }
    >
      <Tabs defaultValue={fane} onChange={(val) => setFane(val)}>
        <Tabs.List>
          <Tabs.Tab value='stilling' label='Om stillingen' />
          {kandidatlisteId && erEier && (
            <Tabs.Tab value='kandidater' label='Kandidater' />
          )}
        </Tabs.List>
        <Tabs.Panel value='stilling'>{children}</Tabs.Panel>
        {kandidatlisteId && erEier && (
          <Tabs.Panel value='kandidater'>
            <StillingsKandidater />
          </Tabs.Panel>
        )}
      </Tabs>
    </SideLayout>
  );
};
