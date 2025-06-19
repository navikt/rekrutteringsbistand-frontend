// tidspunkt.tsx
'use client';

import RekrutteringstreffDetalj from '../../../RekrutteringstreffDetalj';
import TidspunktModal from './TidspunktModal';
import { formaterKlokkeslett } from './utils';
import type { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { formaterNorskDato } from '@/app/components/util';
import { CalendarIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { Button, BodyShort } from '@navikt/ds-react';
import { isSameDay, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import React from 'react';

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

// tidspunkt.tsx

type Props = {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
};

export default function Tidspunkt({
  rekrutteringstreff,
  onUpdated,
  className,
}: Props) {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const initialFra = rekrutteringstreff.fraTid
    ? toZonedTime(parseISO(rekrutteringstreff.fraTid), 'Europe/Oslo')
    : null;
  const initialTil = rekrutteringstreff.tilTid
    ? toZonedTime(parseISO(rekrutteringstreff.tilTid), 'Europe/Oslo')
    : null;

  return (
    <>
      <RekrutteringstreffDetalj
        className={className}
        tittelIkon={<CalendarIcon fontSize='1.5rem' />}
        tittel='Tidspunkt'
        knapp={
          <Button
            variant='tertiary'
            size='small'
            icon={initialFra ? <PencilIcon /> : <PlusIcon />}
            onClick={() => modalRef.current?.showModal()}
          >
            {initialFra ? 'Endre' : 'Legg til'}
          </Button>
        }
      >
        {initialFra && initialTil ? (
          isSameDay(initialFra, initialTil) ? (
            <BodyShort size='small'>
              {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
              <BodyShort as='span' size='small' textColor='subtle'>
                kl {formaterKlokkeslett(initialFra)}-
                {formaterKlokkeslett(initialTil)}
              </BodyShort>
            </BodyShort>
          ) : (
            <>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialFra, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialFra)}
                </BodyShort>{' '}
                til
              </BodyShort>
              <BodyShort size='small'>
                {formaterNorskDato({ dato: initialTil, visning: 'tall' })}{' '}
                <BodyShort as='span' size='small' textColor='subtle'>
                  kl {formaterKlokkeslett(initialTil)}
                </BodyShort>
              </BodyShort>
            </>
          )
        ) : (
          <BodyShort size='small' textColor='subtle'>
            &nbsp;
          </BodyShort>
        )}
      </RekrutteringstreffDetalj>

      <TidspunktModal
        rekrutteringstreff={rekrutteringstreff}
        modalRef={modalRef}
        onUpdated={onUpdated}
      />
    </>
  );
}
