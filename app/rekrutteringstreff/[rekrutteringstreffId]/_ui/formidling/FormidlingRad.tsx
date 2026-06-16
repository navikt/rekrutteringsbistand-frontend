'use client';

import FormidlingDetaljer from './FormidlingDetaljer';
import FormidlingKort from './FormidlingKort';
import { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import {
  formaterDatoUtskrevetMåned,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Tooltip } from '@navikt/ds-react';
import { FC, KeyboardEvent, useId, useState } from 'react';

export const formidlingKolonner = {
  navn: 'min-w-[180px] flex-[1.5]',
  arbeidsgiver: 'min-w-[150px] flex-1',
  formidlet: 'w-48 shrink-0',
  handlinger: 'flex w-48 shrink-0 items-center justify-end gap-2',
};

interface Props {
  formidling: Formidling;
}

const formaterNavn = (etternavn: string | null, fornavn: string | null) => {
  if (etternavn && fornavn) return `${etternavn}, ${fornavn}`;
  return etternavn || fornavn || '';
};

const formaterFormidletTidspunkt = (tidspunkt: string) => {
  const dato = formaterDatoUtskrevetMåned(tidspunkt);
  const tid = formaterTidspunkt(tidspunkt);
  if (!dato) return '-';
  return tid ? `${dato} kl. ${tid}` : dato;
};

const FormidlingRad: FC<Props> = ({ formidling }) => {
  const [open, setOpen] = useState(false);
  const detaljerId = useId();

  const visningsnavn = formaterNavn(formidling.etternavn, formidling.fornavn);

  const veksleÅpen = () => setOpen((forrige) => !forrige);

  const håndterTastetrykk = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      veksleÅpen();
    }
  };

  return (
    <FormidlingKort
      className='mb-3 p-4 hover:bg-[var(--ax-bg-neutral-moderate-hover)]'
      role='button'
      aria-expanded={open}
      aria-controls={detaljerId}
      onClick={veksleÅpen}
      onKeyDown={håndterTastetrykk}
    >
      <div className='flex w-full items-center gap-3 sm:flex-row sm:flex-wrap'>
        {open ? (
          <ChevronUpIcon aria-hidden fontSize='1.5rem' className='shrink-0' />
        ) : (
          <ChevronDownIcon aria-hidden fontSize='1.5rem' className='shrink-0' />
        )}

        <div className={formidlingKolonner.navn}>
          <BodyShort weight='semibold'>{visningsnavn}</BodyShort>
          {formidling.fødselsnummer && (
            <BodyShort size='small' textColor='subtle'>
              f.nr. {formidling.fødselsnummer}
            </BodyShort>
          )}
        </div>

        <div className={formidlingKolonner.arbeidsgiver}>
          <BodyShort size='small'>{formidling.orgnavn ?? '-'}</BodyShort>
          {formidling.orgnr && (
            <BodyShort size='small' textColor='subtle'>
              org.nr. {formidling.orgnr}
            </BodyShort>
          )}
        </div>

        <div className={formidlingKolonner.formidlet}>
          <BodyShort size='small' textColor='subtle'>
            {formaterFormidletTidspunkt(formidling.opprettetTidspunkt)}
          </BodyShort>
        </div>

        <div className={formidlingKolonner.handlinger}>
          <Tooltip content='Sletting er ikke tilgjengelig ennå'>
            <span>
              <Button
                variant='tertiary-neutral'
                size='small'
                icon={<TrashIcon aria-hidden />}
                disabled
                aria-label={`Slett formidling for ${visningsnavn}`}
                onClick={(event) => event.stopPropagation()}
              />
            </span>
          </Tooltip>
        </div>
      </div>

      {open && (
        <div id={detaljerId} className='mt-4 border-t pt-4'>
          <FormidlingDetaljer stillingId={formidling.stillingId} />
        </div>
      )}
    </FormidlingKort>
  );
};

export default FormidlingRad;
