'use client';

import { useRekrutteringstreffContext } from '../../../../RekrutteringstreffContext';
import { useStegviser } from '../StegviserContext';
import {
  SjekklisteContainer,
  SjekklisteInfoRad,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
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
      <SjekklisteRad
        erOppfylt={harInvitert}
        kanKlikkes={true}
        onClick={onInviteClick}
        label='Minst en invitasjon'
        handlingstekst='Inviter'
        ariaLabel={harInvitert ? 'Rediger invitasjoner' : 'Inviter jobbsøkere'}
      />
      <SjekklisteSeparator />
      <SjekklisteRad
        erOppfylt={arrangementtidspunktHarPassert}
        kanKlikkes={false}
        onClick={() => {}}
        label='Arrangementets fradato har passert'
        ariaLabel='Arrangementets fradato har passert'
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
