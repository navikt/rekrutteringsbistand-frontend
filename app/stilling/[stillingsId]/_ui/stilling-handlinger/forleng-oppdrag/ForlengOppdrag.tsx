'use client';
import { Kandidatlistestatus } from '@/app/api/kandidat/schema.zod';
import { setKandidatlisteStatus } from '@/app/api/kandidat/setKandidatlisteStatus';
import { oppdaterStilling } from '@/app/api/stilling/oppdater-stilling/oppdaterStilling';
import { StillingsDataDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { DatoVelger } from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/DatoVelger';
import {
  AdminStatus,
  StillingsStatus,
} from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import {
  NORSK_DATO_FORMAT,
  datoErIFortiden,
  formaterFraISOdato,
  norskDatoTilBackendMidnatt,
  tilDato,
} from '@/util/dato';
import { CalendarIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, Checkbox, Dialog } from '@navikt/ds-react';
import { addWeeks, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface SkjemaVerdier {
  visningsdato: string | undefined;
  oppstart: string | undefined;
  oppstartEtterAvtale: boolean;
  soknadsfrist: string | undefined;
  soknadsfristSnarest: boolean;
}

export default function ForlengOppdrag() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { stillingsData, refetch, erEier, kandidatlisteInfo } =
    useStillingsContext();
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const [lagrer, setLagrer] = useState(false);
  const [generellFeil, setGenerellFeil] = useState<string | undefined>();

  const defaultSnarestVisningsdato = useMemo(
    () => format(addWeeks(new Date(), 3), NORSK_DATO_FORMAT),
    [],
  );

  const beregnInitialverdier = useCallback((): SkjemaVerdier => {
    const eksisterende = stillingsData?.stilling;
    const properties = stillingsData?.stilling?.properties ?? {};

    const oppstartEtterAvtale = properties?.starttime === 'Etter avtale';
    const soknadsfristSnarest = properties?.applicationdue === 'Snarest';

    return {
      visningsdato:
        typeof eksisterende?.expires === 'string'
          ? formaterFraISOdato(eksisterende.expires)
          : undefined,
      oppstart:
        !oppstartEtterAvtale && typeof properties?.starttime === 'string'
          ? formaterFraISOdato(properties.starttime)
          : undefined,
      oppstartEtterAvtale,
      soknadsfrist:
        !soknadsfristSnarest && typeof properties?.applicationdue === 'string'
          ? formaterFraISOdato(properties.applicationdue)
          : undefined,
      soknadsfristSnarest,
    };
  }, [stillingsData]);

  const { control, handleSubmit, setValue, getValues, watch, reset, trigger } =
    useForm<SkjemaVerdier>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: beregnInitialverdier(),
    });

  useEffect(() => {
    if (open) {
      reset(beregnInitialverdier());
      setGenerellFeil(undefined);
    }
  }, [open, beregnInitialverdier, reset]);

  const oppstartEtterAvtale = watch('oppstartEtterAvtale');
  const soknadsfristSnarest = watch('soknadsfristSnarest');

  const forrigeOppstartRef = useRef<string | undefined>(undefined);
  const forrigeSoknadsfristRef = useRef<string | undefined>(undefined);

  if (!stillingsData || !erEier) {
    return null;
  }

  const onSubmit = async (verdier: SkjemaVerdier) => {
    const expiresIso = norskDatoTilBackendMidnatt(verdier.visningsdato);
    const oppstartVerdi = verdier.oppstartEtterAvtale
      ? 'Etter avtale'
      : norskDatoTilBackendMidnatt(verdier.oppstart);
    const soknadsfristVerdi = verdier.soknadsfristSnarest
      ? 'Snarest'
      : norskDatoTilBackendMidnatt(verdier.soknadsfrist);

    const eksisterendeProps = stillingsData.stilling.properties ?? {};

    if (
      (!verdier.oppstartEtterAvtale && oppstartVerdi == null) ||
      (!verdier.soknadsfristSnarest && soknadsfristVerdi == null)
    ) {
      setGenerellFeil(
        'Ugyldig datoformat. Vennligst kontroller at alle datoer er gyldige.',
      );
      return;
    }

    const oppdatert: StillingsDataDTO = {
      ...stillingsData,
      stilling: {
        ...stillingsData.stilling,
        status: StillingsStatus.Aktiv,
        expires: expiresIso!,
        properties: {
          ...eksisterendeProps,
          starttime: oppstartVerdi,
          applicationdue: soknadsfristVerdi,
        },
        administration: {
          ...(stillingsData.stilling.administration ?? {}),
          status: AdminStatus.Done,
        },
      },
    };

    setLagrer(true);
    setGenerellFeil(undefined);
    try {
      const respons = await oppdaterStilling(oppdatert, {
        eierNavident: brukerData.ident,
        eierNavn: brukerData.navn,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
      });

      if (
        kandidatlisteInfo &&
        kandidatlisteInfo.kandidatlisteStatus === Kandidatlistestatus.Lukket
      ) {
        await setKandidatlisteStatus(
          kandidatlisteInfo?.kandidatlisteId,
          Kandidatlistestatus.Åpen,
        );
      }

      refetch?.();
      router.push(`/stilling/${respons.stilling.uuid}`);
      setOpen(false);
    } catch (error) {
      const melding =
        error instanceof Error
          ? error.message
          : 'Klarte ikke å lagre endringene';
      setGenerellFeil(melding);
    } finally {
      setLagrer(false);
    }
  };
  return (
    <>
      <Button
        size='small'
        variant={'tertiary'}
        icon={<CalendarIcon />}
        onClick={() => setOpen(true)}
        aria-haspopup='dialog'
        aria-controls={open ? 'dialog-popup-example' : undefined}
      >
        Forleng
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup id='dialog-popup-example'>
          <Dialog.Header>
            <Dialog.Title>Forlenge oppdraget</Dialog.Title>
            <Dialog.Description>
              Trenger du litt mer tid? Du kan endre datoene for siste visning,
              søknadsfrist, og oppstart.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <BodyLong className='mb-6'>
                Endre datoene for oppdraget hvis du vil ha litt mer tid.
              </BodyLong>
              <div className='flex flex-col gap-6'>
                <Controller
                  name='visningsdato'
                  control={control}
                  rules={{
                    required: 'Velg siste visningsdato',
                    validate: (val) => {
                      if (!val) return 'Velg siste visningsdato';
                      const parsed = tilDato(val);
                      if (!parsed) return 'Ugyldig datoformat';
                      return datoErIFortiden(val)
                        ? 'Dato kan ikke være i fortiden'
                        : true;
                    },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <DatoVelger
                      label='Siste visningsdato'
                      disablePastDates
                      valgtDato={value}
                      setDato={(dato) => {
                        onChange(dato);
                      }}
                      error={error?.message}
                    />
                  )}
                />
                <div className='grid grid-cols-[3fr_2fr] items-start gap-6'>
                  <Controller
                    name='oppstart'
                    control={control}
                    rules={{
                      validate: (val) => {
                        const { oppstartEtterAvtale } = getValues();
                        if (oppstartEtterAvtale) return true;
                        if (!val) {
                          return 'Velg oppstartsdato eller marker Etter avtale';
                        }
                        return datoErIFortiden(val)
                          ? 'Dato kan ikke være i fortiden'
                          : true;
                      },
                    }}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <div className='flex-shrink-0'>
                        <DatoVelger
                          label='Oppstart'
                          disablePastDates
                          valgtDato={value}
                          setDato={(dato) => {
                            onChange(dato);
                          }}
                          disabled={oppstartEtterAvtale}
                          error={error?.message}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name='oppstartEtterAvtale'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        className='min-w-max pt-9'
                        checked={value}
                        onChange={(event) => {
                          const checked = event.target.checked;
                          onChange(checked);
                          const gjeldendeOppstart = getValues('oppstart');
                          if (checked) {
                            if (gjeldendeOppstart) {
                              forrigeOppstartRef.current = gjeldendeOppstart;
                            }
                            setValue('oppstart', undefined, {
                              shouldValidate: true,
                            });
                          } else if (
                            !gjeldendeOppstart &&
                            forrigeOppstartRef.current
                          ) {
                            setValue('oppstart', forrigeOppstartRef.current, {
                              shouldValidate: true,
                            });
                          }
                          trigger('oppstart');
                        }}
                      >
                        Etter avtale
                      </Checkbox>
                    )}
                  />
                </div>
                <div className='grid grid-cols-[3fr_2fr] items-start gap-6'>
                  <Controller
                    name='soknadsfrist'
                    control={control}
                    rules={{
                      validate: (val) => {
                        const { soknadsfristSnarest } = getValues();
                        if (soknadsfristSnarest) return true;
                        if (!val) {
                          return 'Velg søknadsfrist eller marker Snarest';
                        }
                        return datoErIFortiden(val)
                          ? 'Dato kan ikke være i fortiden'
                          : true;
                      },
                    }}
                    render={({
                      field: { value, onChange },
                      fieldState: { error },
                    }) => (
                      <div className='flex-shrink-0'>
                        <DatoVelger
                          label='Søknadsfrist'
                          disablePastDates
                          valgtDato={value}
                          setDato={(dato) => {
                            onChange(dato);
                          }}
                          disabled={soknadsfristSnarest}
                          error={error?.message}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name='soknadsfristSnarest'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        className='min-w-max pt-9'
                        checked={value}
                        onChange={(event) => {
                          const checked = event.target.checked;
                          onChange(checked);
                          const gjeldendeSoknadsfrist =
                            getValues('soknadsfrist');
                          if (checked) {
                            if (gjeldendeSoknadsfrist) {
                              forrigeSoknadsfristRef.current =
                                gjeldendeSoknadsfrist;
                            }
                            setValue('soknadsfrist', undefined, {
                              shouldValidate: true,
                            });
                            const forrige = getValues('visningsdato');
                            const forrigeDato = tilDato(forrige);
                            const defaultDato = tilDato(
                              defaultSnarestVisningsdato,
                            );
                            if (
                              !forrigeDato ||
                              (defaultDato && forrigeDato < defaultDato)
                            ) {
                              setValue(
                                'visningsdato',
                                defaultSnarestVisningsdato,
                                {
                                  shouldValidate: true,
                                },
                              );
                            }
                          } else if (
                            !gjeldendeSoknadsfrist &&
                            forrigeSoknadsfristRef.current
                          ) {
                            setValue(
                              'soknadsfrist',
                              forrigeSoknadsfristRef.current,
                              {
                                shouldValidate: true,
                              },
                            );
                          }
                          trigger(['soknadsfrist', 'visningsdato']);
                        }}
                      >
                        Snarest
                      </Checkbox>
                    )}
                  />
                </div>
                {generellFeil && <Alert variant='error'>{generellFeil}</Alert>}
              </div>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button variant='secondary'>Avbryt</Button>
            </Dialog.CloseTrigger>
            <Button loading={lagrer} onClick={handleSubmit(onSubmit)}>
              Publiser
            </Button>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </>
  );
}
