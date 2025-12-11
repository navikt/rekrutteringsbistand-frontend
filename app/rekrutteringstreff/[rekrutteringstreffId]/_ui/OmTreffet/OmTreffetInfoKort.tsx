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
  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
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
        {initialFra && initialTil ? (
          isSameDay(initialFra, initialTil) ? (
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialFra, visning: 'tall' })}
              {', '}
              <BodyShort as='span' size='small'>
                kl. {formaterKlokkeslett(initialFra)}–
                {formaterKlokkeslett(initialTil)}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialFra, visning: 'tall' })}
                {', '}
                <BodyShort as='span' size='small'>
                  kl. {formaterKlokkeslett(initialFra)}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialTil, visning: 'tall' })}
                {', '}
                <BodyShort as='span' size='small'>
                  kl. {formaterKlokkeslett(initialTil)}
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
