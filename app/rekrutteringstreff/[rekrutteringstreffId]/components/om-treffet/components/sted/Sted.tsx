import RekrutteringstreffDetalj from '../../../RekrutteringstreffDetalj';
import StedModal from './StedModal';
import { usePamPostdata } from '@/app/api/pam-geografi/postdata/[postnummer]/usePamPostdata';
import { RekrutteringstreffDTO } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocationPinIcon, PencilIcon, PlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormFields = {
  GATEADRESSE: 'gateadresse',
  POSTNUMMER: 'postnummer',
  POSTSTED: 'poststed',
} as const;

const stedSchema = z.object({
  [FormFields.GATEADRESSE]: z
    .string()
    .trim()
    .min(1, 'Gateadresse må fylles ut'),
  [FormFields.POSTNUMMER]: z
    .string()
    .trim()
    .min(1, 'Postnummer må fylles ut')
    .regex(/^\d{4}$/, 'Postnummer må bestå av 4 siffer'),
  [FormFields.POSTSTED]: z.string().trim().min(1, 'Poststed må fylles ut'),
});

type StedFormFields = z.infer<typeof stedSchema>;

interface StedProps {
  rekrutteringstreff: RekrutteringstreffDTO;
  onUpdated: () => void;
  className?: string;
}

const Sted: React.FC<StedProps> = ({
  rekrutteringstreff,
  onUpdated,
  className,
}) => {
  const {
    gateadresse = '',
    postnummer = '',
    poststed = '',
  } = rekrutteringstreff;

  const modalRef = useRef<HTMLDialogElement>(null);

  const { reset, setValue, clearErrors, setError, watch } =
    useForm<StedFormFields>({
      resolver: zodResolver(stedSchema),
      defaultValues: {
        gateadresse: gateadresse ?? '',
        postnummer: postnummer ?? '',
        poststed: poststed ?? '',
      },
      mode: 'onBlur',
    });

  const watchPostnummer = watch(FormFields.POSTNUMMER);
  const { data: postdata, isLoading } = usePamPostdata(watchPostnummer);

  useEffect(() => {
    if (watchPostnummer.length !== 4 || isLoading) return;

    if (postdata?.korrigertNavnBy) {
      setValue(FormFields.POSTSTED, postdata.korrigertNavnBy, {
        shouldDirty: true,
        shouldValidate: true,
      });
      clearErrors(FormFields.POSTSTED);
    } else {
      setValue(FormFields.POSTSTED, '', {
        shouldDirty: true,
        shouldValidate: true,
      });
      setError(FormFields.POSTSTED, {
        type: 'manual',
        message: 'Ukjent poststed',
      });
    }
  }, [watchPostnummer, isLoading, postdata, setValue, setError, clearErrors]);

  const harStedsinfo = useMemo(
    () => !!gateadresse || !!postnummer || !!poststed,
    [gateadresse, postnummer, poststed],
  );

  const open = () => {
    reset({
      gateadresse: gateadresse ?? '',
      postnummer: postnummer ?? '',
      poststed: poststed ?? '',
    });
    modalRef.current?.showModal();
  };

  return (
    <>
      <RekrutteringstreffDetalj
        tittelIkon={<LocationPinIcon fontSize='1.5rem' />}
        tittel='Sted'
        knapp={
          <Button
            icon={harStedsinfo ? <PencilIcon /> : <PlusIcon />}
            variant='tertiary'
            size='small'
            onClick={open}
          >
            {harStedsinfo ? 'Endre' : 'Legg til'}
          </Button>
        }
        className={className}
      >
        {harStedsinfo && (
          <>
            {gateadresse && <BodyShort size='small'>{gateadresse}</BodyShort>}
            {(postnummer || poststed) && (
              <BodyShort size='small' textColor='subtle'>
                {postnummer}
                {poststed ? ` ${poststed}` : ''}
              </BodyShort>
            )}
          </>
        )}
      </RekrutteringstreffDetalj>

      <StedModal
        rekrutteringstreff={rekrutteringstreff}
        onUpdated={onUpdated}
        modalRef={modalRef}
      />
    </>
  );
};

export default Sted;
