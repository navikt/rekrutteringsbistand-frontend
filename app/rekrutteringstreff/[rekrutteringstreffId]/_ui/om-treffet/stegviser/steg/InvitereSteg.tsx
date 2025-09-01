'use client';

import {
  SjekklisteContainer,
  SjekklisteInfoRad,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { useStegviser } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/StegviserContext';
import { BodyShort } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const InvitereSteg = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { harInvitert, arrangementtidspunktHarPassert, antallInviterte } =
    useStegviser();
  const router = useRouter();

  const onInviteClick = () => {
    router.push(
      `/rekrutteringstreff/${rekrutteringstreffId}?visFane=jobbsøkere`,
    );
  };

  return (
    <SjekklisteContainer>
      <SjekklisteRad erOppfylt={harInvitert} label='Minst en invitasjon' />
      <SjekklisteSeparator />
      <SjekklisteRad
        erOppfylt={arrangementtidspunktHarPassert}
        label='Arrangementets fradato har passert'
      />
      <SjekklisteSeparator />
      <SjekklisteInfoRad>
        <BodyShort>
          Antall inviterte: <b>{antallInviterte}</b>
        </BodyShort>
      </SjekklisteInfoRad>
    </SjekklisteContainer>
  );
};

export default InvitereSteg;
