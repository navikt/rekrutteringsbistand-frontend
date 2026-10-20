'use client';

import FormidlingDetaljer from './FormidlingDetaljer';
import FormidlingKort from './FormidlingKort';
import SlettFormidlingModal from './SlettFormidlingModal';
import { Formidling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import { formaterDato } from '@/app/rekrutteringstreff/_utils/DatoTidFormaterere';
import { Roller } from '@/components/tilgangskontroll/roller';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Tooltip } from '@navikt/ds-react';
import { FC, useId, useState } from 'react';
import type React from 'react';

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
  harRolle: (rolle: Roller[]) => boolean;
  innloggetIdent?: string;
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
  harRolle,
  innloggetIdent,
}) => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const detaljerId = useId();
  const datoId = useId();
  const navnId = useId();

  const visningsnavn = formidling.sperret
    ? 'Skjermet'
    : formaterNavn(formidling.etternavn, formidling.fornavn);

  const veksleÅpen = () => setOpen((forrige) => !forrige);

  const håndterSlett = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleSlettSuccess = () => {
    onDelete?.();
  };

  const eierFormidling = () => {
    return (
      harRolle([Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_UTVIKLER]) ||
      innloggetIdent === formidling.opprettetAvNavIdent
    );
  };

  return (
    <>
      <FormidlingKort
        className={`mb-3 p-4 hover:bg-[var(--ax-bg-neutral-moderate-hover)] ${
          formidling.sperret
            ? 'bg-[var(--ax-bg-warning-moderate)] hover:bg-[var(--ax-bg-warning-moderate-hover)]'
            : ''
        }`}
      >
        <div className='relative flex w-full items-start gap-3 sm:items-center'>
          <button
            type='button'
            className='absolute inset-0 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ax-border-focus)]'
            aria-expanded={open}
            aria-controls={detaljerId}
            aria-labelledby={`${datoId} ${navnId}`}
            onClick={veksleÅpen}
          />
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
            <div id={datoId} className={formidlingKolonner.formidlet}>
              <BodyShort size='small' textColor='subtle'>
                {formaterFormidletDato(formidling.opprettetTidspunkt)}
              </BodyShort>
            </div>

            <div id={navnId} className={formidlingKolonner.navn}>
              <BodyShort weight='semibold'>{visningsnavn}</BodyShort>
              {formidling.sperret ? (
                <BodyShort size='small' textColor='subtle'>
                  Adressebeskyttet
                </BodyShort>
              ) : formidling.fødselsnummer ? (
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

            <div className={`${formidlingKolonner.handlinger} relative z-10`}>
              {eierFormidling() ? (
                <Button
                  variant='tertiary-neutral'
                  size='small'
                  icon={<TrashIcon aria-hidden />}
                  onClick={håndterSlett}
                  aria-label={`Slett formidling for ${visningsnavn}`}
                />
              ) : (
                <Tooltip content='Formidlingen kan ikke slettes fordi du ikke har opprettet den.'>
                  <span>
                    <Button
                      variant='tertiary-neutral'
                      size='small'
                      disabled
                      icon={<TrashIcon aria-hidden />}
                      aria-label={`Slett formidling for ${visningsnavn}`}
                    />
                  </span>
                </Tooltip>
              )}
            </div>
          </div>
        </div>

        {open && (
          <div id={detaljerId} className='mt-4 border-t pt-4'>
            <FormidlingDetaljer
              stillingId={formidling.stillingId}
              opprettetAvNavn={formidling.opprettetAvNavn}
              opprettetAvNavIdent={formidling.opprettetAvNavIdent}
            />
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
