// Flyttet fra _old/_ui/LeggTilKontaktperson.tsx
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { validerEpost } from '@/util/validerEpost';
import { validerTelefonnummer } from '@/util/validerTelefonnummer';
import { PlusIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyLong, Box, Button, TextField } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function LeggTilKontaktperson() {
  const {
    control,
    register,
    getValues,
    formState: { errors },
  } = useFormContext<StillingsDataDTO>();
  const stillingsContext = useNullableStillingsContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stilling.contactList',
  });
  const initializedRef = useRef(false);
  const [epostError, setEpostError] = useState<string>('');
  const [tlfError, setTlfError] = useState<string>('');

  useEffect(() => {
    if (initializedRef.current) return;
    if (fields.length === 0) {
      const existing =
        stillingsContext?.stillingsData?.stilling?.contactList ?? [];
      if (existing.length > 0) {
        existing.forEach((c) =>
          append({
            name: c.name ?? '',
            title: c.title ?? '',
            email: c.email ?? '',
            phone: c.phone ?? '',
          }),
        );
      } else {
        append({ name: '', title: '', email: '', phone: '' });
      }
    }
    initializedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      {fields.map((field, index) => {
        const basePath = `stilling.contactList.${index}` as const;
        const contactErrors: any =
          (errors as any)?.stilling?.contactList?.[index] ?? {};
        return (
          <Box.New
            background='neutral-moderate'
            padding='3'
            borderRadius='large'
            key={field.id}
            className='flex flex-col gap-3'
          >
            <div className='py-1 flex justify-between items-start'>
              <BodyLong className='font-semibold'>Kontakt {index + 1}</BodyLong>
              <Button
                size='small'
                type='button'
                variant='tertiary'
                icon={<XMarkIcon />}
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                title={'fjern'}
              >
                Fjern
              </Button>
            </div>

            <TextField
              label='Navn'
              {...register(`${basePath}.name`)}
              error={contactErrors?.name?.message as string | undefined}
            />

            <TextField
              label='Tittel'
              {...register(`${basePath}.title`)}
              error={contactErrors?.title?.message as string | undefined}
            />

            <BodyLong>Velg hvordan de kan nås (minst en)</BodyLong>

            <TextField
              label='E-post'
              type='email'
              {...register(`${basePath}.email`, {
                validate: (value) => {
                  const phoneVal = getValues(`${basePath}.phone` as const);
                  if (!value && !phoneVal) {
                    return 'Fyll inn e-post eller telefon';
                  }
                  return true;
                },
              })}
              onBlur={() => {
                const epost = getValues(`${basePath}.email` as const);
                if (epost) {
                  const epostValidering = validerEpost(epost);
                  if (!epostValidering.erGodkjent) {
                    setEpostError(epostValidering.feilmelding);
                  }
                }
              }}
              onInput={() => setEpostError('')}
              error={epostError}
              // error={contactErrors?.email?.message as string | undefined}
            />

            <TextField
              label='Telefonnummer'
              type='tel'
              maxLength={12}
              minLength={8}
              inputMode={'tel'}
              {...register(`${basePath}.phone`, {
                validate: (value) => {
                  const emailVal = getValues(`${basePath}.email` as const);
                  if (!value && !emailVal) {
                    return 'Fyll inn telefon eller e-post';
                  }
                  return true;
                },
              })}
              onBlur={() => {
                const tlf = getValues(`${basePath}.phone` as const);
                if (tlf) {
                  const tlfValidering = validerTelefonnummer(tlf);
                  if (!tlfValidering.erGodkjent) {
                    setTlfError(tlfValidering.feilmelding);
                  }
                }
              }}
              onInput={() => setTlfError('')}
              error={tlfError}
              // error={contactErrors?.phone?.message as string | undefined}
            />
          </Box.New>
        );
      })}

      <div>
        <Button
          type='button'
          variant='tertiary'
          icon={<PlusIcon />}
          size='small'
          onClick={() => append({ name: '', title: '', email: '', phone: '' })}
        >
          Legg til kontaktperson
        </Button>
      </div>
    </div>
  );
}