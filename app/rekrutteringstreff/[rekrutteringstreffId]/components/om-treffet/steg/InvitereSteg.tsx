import { CheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import * as React from 'react';

interface Props {
  harInvitert: boolean;
  antallInviterte: number;
  onInviteClick: () => void;
}

const InvitereSteg: React.FC<Props> = ({
  harInvitert,
  antallInviterte,
  onInviteClick,
}) => {
  return (
    <div className='flex-1'>
      <Box.New padding='6' borderRadius='large' className='mb-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between gap-2 pb-4 border-b border-border-subtle'>
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 border-2 rounded-full flex items-center justify-center border-blue-400 text-blue-400'>
                {harInvitert && <CheckmarkIcon fontSize='1rem' />}
              </div>
              <BodyShort>Minst en invitasjon</BodyShort>
            </div>
            <button
              type='button'
              className='text-blue-400 hover:underline focus:underline'
              onClick={onInviteClick}
            >
              Inviter
            </button>
          </div>
          <div className='pt-2'>
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
