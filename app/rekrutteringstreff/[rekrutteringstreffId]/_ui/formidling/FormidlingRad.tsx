'use client';

import FormidlingDetaljer from './FormidlingDetaljer';
import { FormidlingMedPersonOgArbeidsgiver } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import {
  formaterDatoUtskrevetMåned,
  formaterTidspunkt,
} from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import ListeKort from '@/components/layout/ListeKort';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Tooltip } from '@navikt/ds-react';
import { FC, useId, useState } from 'react';

export const formidlingKolonner = {
  navn: 'min-w-[35%] flex-1',
  arbeidsgiver: 'min-w-[25%] flex-1',
  formidlet: 'min-w-[15%] flex-1',
  handlinger: 'flex w-48 shrink-0 items-center justify-end gap-2',
};

interface Props {
  formidling: FormidlingMedPersonOgArbeidsgiver;
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

  return (
    <ListeKort className='mb-3 p-4'>
      <div className='flex w-full items-center gap-3 sm:flex-row sm:flex-wrap'>
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
          <Tooltip content='Sletting er ikke tilgjengelig ennå'>
            <Button
              variant='tertiary-neutral'
              size='small'
              icon={<TrashIcon aria-hidden />}
              disabled
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
