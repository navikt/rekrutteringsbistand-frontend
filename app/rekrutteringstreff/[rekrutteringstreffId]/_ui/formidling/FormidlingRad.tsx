'use client';

import FormidlingDetaljer from './FormidlingDetaljer';
import { FormidlingLinjeDTO } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { formaterDatoUtskrevetMåned } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import ListeKort from '@/components/layout/ListeKort';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Tooltip } from '@navikt/ds-react';
import { FC, useId, useState } from 'react';

interface Props {
  formidling: FormidlingLinjeDTO;
}

const formaterNavn = (etternavn: string | null, fornavn: string | null) => {
  if (etternavn && fornavn) return `${etternavn}, ${fornavn}`;
  return etternavn || fornavn || '';
};

const FormidlingRad: FC<Props> = ({ formidling }) => {
  const [open, setOpen] = useState(false);
  const detaljerId = useId();

  const visningsnavn = formaterNavn(formidling.etternavn, formidling.fornavn);

  const slettFormidling = () => {
    // Sletting implementeres som egen oppgave.
  };

  return (
    <ListeKort className='mb-3 p-4'>
      <div className='flex w-full items-center gap-3 sm:flex-row sm:flex-wrap'>
        <div className='min-w-[35%] flex-1'>
          <BodyShort weight='semibold'>{visningsnavn}</BodyShort>
          {formidling.fødselsnummer && (
            <BodyShort size='small' className='text-text-subtle'>
              f.nr. {formidling.fødselsnummer}
            </BodyShort>
          )}
        </div>

        <div className='min-w-[25%] flex-1'>
          <BodyShort size='small'>{formidling.orgnavn ?? '-'}</BodyShort>
          {formidling.orgnr && (
            <BodyShort size='small' className='text-text-subtle'>
              org.nr. {formidling.orgnr}
            </BodyShort>
          )}
        </div>

        <div className='min-w-[15%] flex-1'>
          <BodyShort size='small' className='text-text-subtle'>
            Formidlet
          </BodyShort>
          <BodyShort size='small' className='text-text-subtle'>
            {formaterDatoUtskrevetMåned(formidling.opprettetTidspunkt) ?? '-'}
          </BodyShort>
        </div>

        <div className='flex items-center justify-end gap-2'>
          <Button
            variant='tertiary'
            size='small'
            icon={
              open ? (
                <ChevronUpIcon aria-hidden />
              ) : (
                <ChevronDownIcon aria-hidden />
              )
            }
            iconPosition='right'
            onClick={() => setOpen((forrige) => !forrige)}
            aria-expanded={open}
            aria-controls={detaljerId}
          >
            {open ? 'Skjul detaljer' : 'Vis detaljer'}
          </Button>
          <Tooltip content='Slett formidling'>
            <Button
              variant='tertiary-neutral'
              size='small'
              icon={<TrashIcon aria-hidden />}
              onClick={slettFormidling}
              aria-label={`Slett formidling for ${visningsnavn}`}
            />
          </Tooltip>
        </div>
      </div>

      {open && (
        <div id={detaljerId} className='mt-4 border-t pt-4'>
          <FormidlingDetaljer stillingId={formidling.stillingId} />
        </div>
      )}
    </ListeKort>
  );
};

export default FormidlingRad;
