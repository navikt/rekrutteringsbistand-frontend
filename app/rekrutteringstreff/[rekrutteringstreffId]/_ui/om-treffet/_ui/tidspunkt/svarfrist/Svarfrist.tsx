import SvarfristModal from './SvarfristModal';
import type { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import RekrutteringstreffDetalj from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/RekrutteringstreffDetalj';
import { formaterKlokkeslett } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/_ui/tidspunkt/utils';
import { formaterNorskDato } from '@/util/util';
import { BodyShort, Button } from '@navikt/ds-react';
import { parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { PlusIcon, TimerIcon } from 'lucide-react';
import React from 'react';

export type SvarfristFormFields = {
  svarfristDato: Date | null;
  svarfristTid: string;
};

type Props = {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
};

export default function Svarfrist({
  rekrutteringstreff,
  onUpdated,
  className,
}: Props) {
  const modalRef = React.useRef<HTMLDialogElement>(null);

  const svarfristDato = rekrutteringstreff.svarfrist
    ? toZonedTime(parseISO(rekrutteringstreff.svarfrist), 'Europe/Oslo')
    : null;

  return (
    <RekrutteringstreffDetalj
      tittelIkon={<TimerIcon fontSize='1.5rem' />}
      tittel='Svarfrist'
      knapp={
        <Button
          icon={<PlusIcon />}
          variant='tertiary'
          size='small'
          onClick={() => modalRef.current?.showModal()}
        >
          {rekrutteringstreff.svarfrist ? 'Endre' : 'Legg til'}
        </Button>
      }
      className={className}
    >
      <div>
        {svarfristDato && (
          <>
            <BodyShort size='small'>
              {formaterNorskDato({ dato: svarfristDato, visning: 'tall' })}
              <BodyShort as='span' size='small' textColor='subtle'>
                {' kl '}
                {formaterKlokkeslett(svarfristDato)}
              </BodyShort>
            </BodyShort>
          </>
        )}
      </div>

      <SvarfristModal
        rekrutteringstreff={rekrutteringstreff}
        onUpdated={onUpdated}
        modalRef={modalRef}
      />
    </RekrutteringstreffDetalj>
  );
}
