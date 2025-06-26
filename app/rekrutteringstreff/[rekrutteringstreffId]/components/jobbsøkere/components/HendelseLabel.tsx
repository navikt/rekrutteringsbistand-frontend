import { BodyShort } from '@navikt/ds-react';
import * as React from 'react';

interface HendelseLabelProps {
  icon: React.ReactNode;
  hendelseType: string;
  antall?: number;
}

export const labelTekst = (hendelsetype: string) => {
  switch (hendelsetype) {
    case 'INVITER':
      return 'invitert';
    case 'DELTA':
      return 'deltar';
    case 'UBESVART':
      return 'ubesvart';
    case 'IKKE_INTERESSERT':
      return 'ikke interessert';
    case 'OPPRETT':
      return 'lagt til';
    case 'OPPDATER':
      return 'oppdatert';
    case 'SLETT':
      return 'slettet';
    case 'PUBLISER':
      return 'publisert';
    case 'AVSLUTT_INVITASJON':
      return 'invitasjon avsluttet';
    case 'AVSLUTT_ARRANGEMENT':
      return 'arrangement avsluttet';
    case 'AVSLUTT_OPPFOLGING':
      return 'oppfølging avsluttet';
    case 'AVSLUTT':
      return 'avsluttet';
    default:
      return '';
  }
};

const capitalizeFirstLetter = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

const HendelseLabel: React.FC<HendelseLabelProps> = ({
  icon,
  hendelseType,
  antall,
}) => {
  const text =
    antall === undefined
      ? capitalizeFirstLetter(labelTekst(hendelseType))
      : `${antall} ${labelTekst(hendelseType)}`;

  return (
    <div className='flex flex-nowrap items-center space-x-2'>
      {icon}
      <BodyShort>{text}</BodyShort>
    </div>
  );
};

export default HendelseLabel;
