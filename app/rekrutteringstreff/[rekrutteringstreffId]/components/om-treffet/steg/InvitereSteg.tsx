import { CheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
  harInvitert: boolean;
  antallInviterte: number;
  onInviteClick: () => void;
  erDatoPassert: boolean;
}

const InvitereSteg: React.FC<Props> = ({
  harInvitert,
  antallInviterte,
  onInviteClick,
  erDatoPassert,
}) => {
  const kanInvitere = !harInvitert;

  return (
    <div className='flex-1'>
      <Box.New padding='6' borderRadius='large' className='mb-4'>
        <div className='space-y-0'>
          <div
            onClick={() => kanInvitere && onInviteClick()}
            onKeyDown={(e) => {
              if (kanInvitere && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onInviteClick();
              }
            }}
            className={`flex items-center justify-between my-4 ${
              kanInvitere
                ? 'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)] rounded'
                : ''
            }`}
            role={kanInvitere ? 'button' : undefined}
            tabIndex={kanInvitere ? 0 : undefined}
            aria-label={
              kanInvitere
                ? 'Inviter jobbsøkere'
                : 'Minst en invitasjon - Oppfylt'
            }
          >
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
                {harInvitert && <CheckmarkIcon fontSize='1rem' />}
              </div>
              <BodyShort>Minst en invitasjon</BodyShort>
            </div>
            {kanInvitere && (
              <BodyShort className='text-blue-400 px-1'>Inviter</BodyShort>
            )}
          </div>

          <div className='flex items-center justify-between my-4'>
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
                {erDatoPassert && <CheckmarkIcon fontSize='1rem' />}
              </div>
              <BodyShort>Arrangementets fradato har passert</BodyShort>
            </div>
          </div>

          <div className='border-b border-border-subtle my-4'></div>

          <div className='my-4'>
            <BodyShort>
              Antall inviterte: <b>{antallInviterte}</b>
            </BodyShort>
          </div>
        </div>
      </Box.New>
    </div>
  );
};

export default InvitereSteg;
