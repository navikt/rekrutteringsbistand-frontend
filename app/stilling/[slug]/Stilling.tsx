'use client';
import { Buildings2Icon, PersonIcon } from '@navikt/aksel-icons';
import { Tabs } from '@navikt/ds-react';
import * as React from 'react';
import SideLayout from '../../../components/layout/SideLayout';
import SideTopBanner from '../../../components/layout/SideTopBanner';
import capitalizeEmployerName, { navnEierAvAstilling } from '../stilling-util';
import KopierStillingLenke from './components/KopierStillingLenke';
import StillingsIkon from './icons/se-mine-stillinger.svg';
import OmStillingen from './omStillingen/OmStillingen';
import { useStillingsContext } from './StillingsContext';

const Stilling: React.FC = () => {
  const { stillingsData, erEier, kandidatlisteId } = useStillingsContext();
  // const { kandidatlisteId } = useKandidatlisteId(stillingsData.stilling.uuid);

  const eierNavn = navnEierAvAstilling(stillingsData);

  return (
    <SideLayout
      banner={
        <SideTopBanner
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
          nederst={<div>Stillingen er opprettet av kake</div>}
        />
      }
    >
      <Tabs defaultValue='stilling'>
        <Tabs.List>
          <Tabs.Tab
            value='stilling'
            label='Om stillingen'
            // icon={<ClockDashedIcon aria-hidden />}
          />
          {kandidatlisteId && erEier && (
            <Tabs.Tab
              value='kandidater'
              label='Kandidater'
              // icon={<InboxDownIcon aria-hidden />}
            />
          )}
        </Tabs.List>
        <Tabs.Panel value='stilling'>
          <OmStillingen />
        </Tabs.Panel>
        {kandidatlisteId && erEier && (
          <Tabs.Panel value='kandidater'>
            <div className='mt-4'>Kandidater</div>
          </Tabs.Panel>
        )}
      </Tabs>
    </SideLayout>
  );
};

export default Stilling;
