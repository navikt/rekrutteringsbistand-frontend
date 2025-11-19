'use client';

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
import {
  Alert,
  BodyLong,
  Button,
  Checkbox,
  Heading,
  Modal,
} from '@navikt/ds-react';
import { addWeeks, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type SkjemaVerdier = {
  visningsdato: string | undefined;
  oppstart: string | undefined;
  oppstartEtterAvtale: boolean;
  soknadsfrist: string | undefined;
  soknadsfristSnarest: boolean;
};

export default function ForlengeOppdrag() {
  const router = useRouter();
  const { stillingsData, refetch } = useStillingsContext();
  const { brukerData, valgtNavKontor } = useApplikasjonContext();
  const [open, setOpen] = useState(false);
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
  const oppstartVerdi = watch('oppstart');
  const soknadsfristVerdi = watch('soknadsfrist');

  const [forrigeOppstart, setForrigeOppstart] = useState<string | undefined>();
  const [forrigeSoknadsfrist, setForrigeSoknadsfrist] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (oppstartVerdi) {
      setForrigeOppstart(oppstartVerdi);
    }
  }, [oppstartVerdi]);

  useEffect(() => {
    if (soknadsfristVerdi) {
      setForrigeSoknadsfrist(soknadsfristVerdi);
    }
  }, [soknadsfristVerdi]);

  if (!stillingsData) {
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

      refetch?.();
      router.push(`/stilling/${respons.stilling.uuid}`);
      setOpen(false);
    } catch (error: any) {
      setGenerellFeil(error?.message ?? 'Klarte ikke å lagre endringene');
    } finally {
      setLagrer(false);
    }
  };

  return (
    <div className='mt-4'>
      <Heading size='xsmall' level='3'>
        Forlengelse
      </Heading>
      <BodyLong size='small' className='mt-1'>
        Trenger du litt mer tid? Du kan endre datoene for siste visning,
        søknadsfrist, og oppstart.
      </BodyLong>
      <Button
        size='small'
        className='mt-4 w-full'
        onClick={() => setOpen(true)}
      >
        Forlenge oppdraget
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: 'Forleng oppdraget', size: 'small' }}
        width='small'
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
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
              <div className='flex flex-nowrap items-start gap-6'>
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
                            setForrigeOppstart(gjeldendeOppstart);
                          }
                          setValue('oppstart', undefined, {
                            shouldValidate: true,
                          });
                        } else if (!gjeldendeOppstart && forrigeOppstart) {
                          setValue('oppstart', forrigeOppstart, {
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
              <div className='flex flex-nowrap items-start gap-6'>
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
                        const gjeldendeSoknadsfrist = getValues('soknadsfrist');
                        if (checked) {
                          if (gjeldendeSoknadsfrist) {
                            setForrigeSoknadsfrist(gjeldendeSoknadsfrist);
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
                          forrigeSoknadsfrist
                        ) {
                          setValue('soknadsfrist', forrigeSoknadsfrist, {
                            shouldValidate: true,
                          });
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
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit' loading={lagrer} disabled={lagrer}>
              Publiser
            </Button>
            <Button
              type='button'
              variant='secondary'
              onClick={() => setOpen(false)}
              disabled={lagrer}
            >
              Avbryt
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
