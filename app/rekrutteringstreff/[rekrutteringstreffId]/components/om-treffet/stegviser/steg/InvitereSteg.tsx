'use client';

import {
  StegContainer,
  StegInfoRad,
  StegRad,
  StegSeparator,
} from './SjekklisteItem';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { BodyShort, Loader } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

interface Props {
  erDatoPassert: boolean;
  onHarInvitertChange: (harInvitert: boolean) => void;
}

const InvitereSteg: React.FC<Props> = ({
  erDatoPassert,
  onHarInvitertChange,
}) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
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
    onHarInvitertChange(harInvitert);
  }, [harInvitert, onHarInvitertChange]);

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
    <StegContainer>
      <StegRad
        erOppfylt={harInvitert}
        kanKlikkes={kanInvitere}
        onClick={onInviteClick}
        label='Minst en invitasjon'
        handlingstekst='Inviter'
        ariaLabel={
          kanInvitere ? 'Inviter jobbsøkere' : 'Minst en invitasjon - Oppfylt'
        }
      />
      <StegSeparator />
      <StegRad
        erOppfylt={erDatoPassert}
        kanKlikkes={false}
        onClick={() => {}}
        label='Arrangementets fradato har passert'
        ariaLabel='Arrangementets fradato har passert'
      />
      <StegSeparator />
      <StegInfoRad>
        <BodyShort>
          Antall inviterte: <b>{antallInviterte}</b>
        </BodyShort>
      </StegInfoRad>
    </StegContainer>
  );
};

export default InvitereSteg;
