import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import {
  formaterDatoUkedag,
  formaterKlokkeslett,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { formaterNorskDato } from '@/util/dato';
import { ClockIcon, LocationPinIcon, TimerIcon } from '@navikt/aksel-icons';
import { BodyShort, Box } from '@navikt/ds-react';
import { isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { FC } from 'react';

interface KortProps {
  rekrutteringstreff: RekrutteringstreffDTO['rekrutteringstreff'];
}

export const TidspunktKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  const fraTid = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const tilTid = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  return (
    <Box.New className={'flex flex-1 flex-row gap-2'}>
      <ClockIcon
        aria-hidden
        fontSize='1.5rem'
        className='text-[var(--ax-text-neutral-subtle)]'
      />
      <div>
        <BodyShort size='small' textColor='subtle'>
          Tid
        </BodyShort>
        {fraTid && tilTid ? (
          isSameDay(fraTid, tilTid) ? (
            <BodyShort size='small'>
              {formaterNorskDato({ dato: fraTid, visning: 'tall' })}
              {', '}
              <BodyShort as='span' size='small'>
                kl. {formaterKlokkeslett(fraTid)}–{formaterKlokkeslett(tilTid)}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: fraTid, visning: 'tall' })}
                {', '}
                <BodyShort as='span' size='small'>
                  kl. {formaterKlokkeslett(fraTid)}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: tilTid, visning: 'tall' })}
                {', '}
                <BodyShort as='span' size='small'>
                  kl. {formaterKlokkeslett(tilTid)}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </div>
    </Box.New>
  );
};

export const StedKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  return (
    <Box.New className='flex flex-1 flex-row gap-2'>
      <LocationPinIcon
        aria-hidden
        fontSize='1.5rem'
        className='text-[var(--ax-text-neutral-subtle)]'
      />
      <div>
        <BodyShort size='small' textColor='subtle'>
          Sted
        </BodyShort>
        {rekrutteringstreff.gateadresse ||
        rekrutteringstreff.postnummer ||
        rekrutteringstreff.poststed ? (
          <div className='space-y-1'>
            {rekrutteringstreff.gateadresse && (
              <BodyShort size='small'>
                {rekrutteringstreff.gateadresse}
              </BodyShort>
            )}
            {(rekrutteringstreff.postnummer || rekrutteringstreff.poststed) && (
              <BodyShort size='small'>
                {rekrutteringstreff.postnummer} {rekrutteringstreff.poststed}
              </BodyShort>
            )}
          </div>
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </div>
    </Box.New>
  );
};

export const SvarfristKort: FC<KortProps> = ({ rekrutteringstreff }) => {
  const svarfristFormatert = rekrutteringstreff.svarfrist
    ? formaterDatoUkedag(rekrutteringstreff.svarfrist) +
      ', kl. ' +
      formaterTidspunkt(rekrutteringstreff.svarfrist)
    : null;

  return (
    <Box.New className='flex flex-1 flex-row gap-2'>
      <TimerIcon
        aria-hidden
        fontSize='1.5rem'
        className='text-[var(--ax-text-neutral-subtle)]'
      />
      <div>
        <BodyShort size='small' textColor='subtle'>
          Svarfrist
        </BodyShort>
        {svarfristFormatert ? (
          <BodyShort size='small'>{svarfristFormatert}</BodyShort>
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </div>
    </Box.New>
  );
};
