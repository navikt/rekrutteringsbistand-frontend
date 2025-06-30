'use client';

import { useStegviser } from '../StegviserContext';
import {
  SjekklisteContainer,
  SjekklisteInfoRad,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { BodyShort, Loader } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface Props {
  erDatoPassert: boolean;
}

const InvitereSteg: React.FC<Props> = ({ erDatoPassert }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { setHarInvitert } = useStegviser();
  const router = useRouter();
  const { data: jobbsøkere, isLoading: jobbsøkereLoading } =
    useJobbsøkere(rekrutteringstreffId);

  const antallInviterte = React.useMemo(
    () =>
      jobbsøkere?.filter((j) =>
        j.hendelser?.some((h) => h.hendelsestype === 'INVITER'),
      ).length ?? 0,
    [jobbsøkere],
  );

  const harInvitert = antallInviterte > 0;

  React.useEffect(() => {
    setHarInvitert(harInvitert);
  }, [harInvitert, setHarInvitert]);

  const onInviteClick = () => {
    router.push(
      `/rekrutteringstreff/${rekrutteringstreffId}?visFane=jobbsøkere`,
    );
  };

  const kanInvitere = !harInvitert;

  if (jobbsøkereLoading) {
    return <Loader size='medium' title='Laster invitasjonsstatus...' />;
  }

  return (
    <SjekklisteContainer>
      <SjekklisteRad
        erOppfylt={harInvitert}
        kanKlikkes={kanInvitere}
        onClick={onInviteClick}
        label='Minst en invitasjon'
        handlingstekst='Inviter'
        ariaLabel={
          kanInvitere ? 'Inviter jobbsøkere' : 'Minst en invitasjon - Oppfylt'
        }
      />
      <SjekklisteSeparator />
      <SjekklisteRad
        erOppfylt={erDatoPassert}
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
