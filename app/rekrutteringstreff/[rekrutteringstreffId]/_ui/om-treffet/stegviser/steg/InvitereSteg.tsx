'use client';

import { SjekklisteContainer, SjekklisteRad } from './Sjekkliste';
import { useStegviser } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/StegviserContext';
import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

const InvitereSteg = () => {
  const { harInvitert, arrangementtidspunktHarPassert, antallInviterte } =
    useStegviser();

  return (
    <SjekklisteContainer>
      <SjekklisteRad erOppfylt={harInvitert} label='Minst en invitasjon' />
      <SjekklisteRad
        erOppfylt={arrangementtidspunktHarPassert}
        label='Arrangementets fradato har passert'
      />
      <BodyShort size='small'>
        Antall inviterte: <b>{antallInviterte}</b>
      </BodyShort>
    </SjekklisteContainer>
  );
};

export default InvitereSteg;
