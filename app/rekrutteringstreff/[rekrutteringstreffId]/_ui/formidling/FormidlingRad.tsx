'use client';

import FormidlingDetaljer from './FormidlingDetaljer';
import FormidlingKort from './FormidlingKort';
import SlettFormidlingModal from './SlettFormidlingModal';
import { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { formaterDato } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { FC, KeyboardEvent, useId, useState } from 'react';

export const formidlingKolonner = {
  formidlet: 'w-28 shrink-0',
  navn: 'min-w-[180px] flex-[1.5]',
  arbeidsgiver: 'min-w-[150px] flex-1',
  yrkestittel: 'min-w-[140px] flex-1',
  handlinger: 'flex w-48 shrink-0 items-center justify-end gap-2',
};

interface Props {
  formidling: Formidling;
  rekrutteringstreffId: string;
  eierNavKontorEnhetId?: string;
  onDelete?: () => void;
}

const formaterNavn = (etternavn: string | null, fornavn: string | null) => {
  if (etternavn && fornavn) return `${etternavn}, ${fornavn}`;
  return etternavn || fornavn || '';
};

const formaterFormidletDato = (tidspunkt: string) =>
  formaterDato(tidspunkt) ?? '-';

const FormidlingRad: FC<Props> = ({
  formidling,
  rekrutteringstreffId,
  eierNavKontorEnhetId,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const detaljerId = useId();

  const visningsnavn = formaterNavn(formidling.etternavn, formidling.fornavn);

  const veksleÅpen = () => setOpen((forrige) => !forrige);

  const håndterTastetrykk = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      veksleÅpen();
    }
  };

  const håndterSlett = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleSlettSuccess = () => {
    onDelete?.();
  };

  return (
    <>
      <FormidlingKort
        className='mb-3 p-4 hover:bg-[var(--ax-bg-neutral-moderate-hover)]'
        role='button'
        aria-expanded={open}
        aria-controls={detaljerId}
        onClick={veksleÅpen}
        onKeyDown={håndterTastetrykk}
      >
        <div className='flex w-full items-start gap-3 sm:items-center'>
          {open ? (
            <ChevronUpIcon aria-hidden fontSize='1.5rem' className='shrink-0' />
          ) : (
            <ChevronDownIcon
              aria-hidden
              fontSize='1.5rem'
              className='shrink-0'
            />
          )}

          <div className='flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center'>
            <div className={formidlingKolonner.formidlet}>
              <BodyShort size='small' textColor='subtle'>
                {formaterFormidletDato(formidling.opprettetTidspunkt)}
              </BodyShort>
            </div>

            <div className={formidlingKolonner.navn}>
              <BodyShort weight='semibold'>{visningsnavn}</BodyShort>
              {formidling.fødselsnummer ? (
                <BodyShort size='small' textColor='subtle'>
                  f.nr. {formidling.fødselsnummer}
                </BodyShort>
              ) : (
                <BodyShort size='small' textColor='subtle'>
                  Inaktiv kandidat
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

            <div className={formidlingKolonner.yrkestittel}>
              <BodyShort size='small'>
                {formidling.yrkestittel ?? '-'}
              </BodyShort>
            </div>

            <div className={formidlingKolonner.handlinger}>
              <Button
                variant='tertiary-neutral'
                size='small'
                icon={<TrashIcon aria-hidden />}
                onClick={håndterSlett}
                aria-label={`Slett formidling for ${visningsnavn}`}
              />
            </div>
          </div>
        </div>

        {open && (
          <div id={detaljerId} className='mt-4 border-t pt-4'>
            <FormidlingDetaljer stillingId={formidling.stillingId} />
          </div>
        )}
      </FormidlingKort>

      {showDeleteModal && (
        <SlettFormidlingModal
          formidling={formidling}
          rekrutteringstreffId={rekrutteringstreffId}
          eierNavKontorEnhetId={eierNavKontorEnhetId}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={handleSlettSuccess}
        />
      )}
    </>
  );
};

export default FormidlingRad;
