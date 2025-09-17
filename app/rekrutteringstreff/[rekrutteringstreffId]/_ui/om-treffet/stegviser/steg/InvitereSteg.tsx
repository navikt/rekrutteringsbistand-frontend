'use client';

import {
  SjekklisteContainer,
  SjekklisteRad,
  SjekklisteInfo,
} from './Sjekkliste';
import { useStegviser } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/StegviserContext';
import {
  ClockDashedIcon,
  EyeSlashIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import { BodyShort, Detail, HStack, Heading, VStack } from '@navikt/ds-react';
import * as React from 'react';

const InvitereSteg = () => {
  const {
    harInvitert,
    tiltidspunktHarPassert,
    antallInviterte,
    antallSvarJa,
    antallVenterSvar,
  } = useStegviser();

  return (
    <SjekklisteContainer>
      <Detail spacing>
        Noen detaljer være på plass før treffet kan fullføres.
      </Detail>

      {/* Tellelinjer */}
      <div className='flex items-center justify-between my-2 text-sm'>
        <span>Inviterte som har svart ja</span>
        <span className='tabular-nums'>{antallSvarJa}</span>
      </div>
      <div className='flex items-center justify-between my-2 text-sm'>
        <span>Du venter fortsatt på svar fra</span>
        <span className='tabular-nums'>{antallVenterSvar}</span>
      </div>

      {/* Sjekkpunkter */}
      <SjekklisteRad
        erOppfylt={harInvitert}
        label='Minst 1 invitert jobbsøker'
      />
      <SjekklisteRad
        erOppfylt={tiltidspunktHarPassert}
        label='Tidspunktet for treffet er passert'
      />
      <BodyShort size='small'>
        Totalt inviterte: <b>{antallInviterte}</b>
      </BodyShort>

      <SjekklisteInfo>
        <VStack gap='2'>
          <Heading level='3' size='small'>
            Hva skjer når du fullfører?
          </Heading>
          <VStack gap='2'>
            <HStack gap='2' align='start'>
              <div className='flex-none w-6 mt-[2px]'>
                <ClockDashedIcon fontSize='1.5rem' aria-hidden />
              </div>
              <BodyShort className='flex-1'>
                Du kan gjenåpne treffet for å rette feil i ettertid.
              </BodyShort>
            </HStack>
            <HStack gap='2' align='start'>
              <div className='flex-none w-6 mt-[2px]'>
                <TasklistIcon fontSize='1.5rem' aria-hidden />
              </div>
              <BodyShort className='flex-1'>
                Aktivitetskortet til alle som svarte ja blir flyttet til
                &quot;Fullført&quot;-kolonnen i aktivitetsplanen.
              </BodyShort>
            </HStack>
            <HStack gap='2' align='start'>
              <div className='flex-none w-6 mt-[2px]'>
                <EyeSlashIcon fontSize='1.5rem' aria-hidden />
              </div>
              <BodyShort className='flex-1'>
                Treffet vises ikke lenger som aktivt.
              </BodyShort>
            </HStack>
          </VStack>
        </VStack>
      </SjekklisteInfo>
    </SjekklisteContainer>
  );
};

export default InvitereSteg;
