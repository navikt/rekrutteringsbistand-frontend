'use client';

import BehovForm, {
  ArbeidsgiverBehovFormData,
  BEHOV_FELT_ID,
  BehovFormFelt,
  behovResolver,
  tilArbeidsgiverBehovDTO,
  tilBehovFormData,
} from './BehovForm';
import {
  ArbeidsgiverBehovDTO,
  oppdaterBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import {
  Box,
  Button,
  Dialog,
  ErrorSummary,
  HStack,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { FC, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  open: boolean;
  rekrutteringstreffId: string;
  arbeidsgiverTreffId: string;
  arbeidsgiverNavn: string;
  initielleVerdier: ArbeidsgiverBehovDTO | null;
  dialogId: string;
  onLagret: () => void;
  onLukk: () => void;
}

const RedigerBehovDialog: FC<Props> = ({
  open,
  rekrutteringstreffId,
  arbeidsgiverTreffId,
  arbeidsgiverNavn,
  initielleVerdier,
  dialogId,
  onLagret,
  onLukk,
}) => {
  const [saving, setSaving] = useState(false);
  const [serverFeil, setServerFeil] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const errorSummaryFokusertVedSubmit = useRef(0);
  const formId = useId();

  const methods = useForm<ArbeidsgiverBehovFormData>({
    resolver: behovResolver,
    defaultValues: tilBehovFormData(initielleVerdier),
    reValidateMode: 'onBlur',
    shouldFocusError: false,
  });
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isDirty, submitCount },
  } = methods;

  useEffect(() => {
    if (open) {
      errorSummaryFokusertVedSubmit.current = 0;
    }
  }, [arbeidsgiverTreffId, open]);

  useEffect(() => {
    if (isDirty) return;
    reset(tilBehovFormData(initielleVerdier));
    setServerFeil(null);
  }, [initielleVerdier, arbeidsgiverTreffId, isDirty, reset]);

  const errorSummaryItems = useMemo(
    () =>
      (
        Object.entries(errors) as Array<
          [BehovFormFelt, { message?: string } | undefined]
        >
      )
        .filter(([, feltFeil]) => Boolean(feltFeil?.message))
        .map(([felt, feltFeil]) => ({
          href: `#${BEHOV_FELT_ID[felt]}`,
          melding: feltFeil!.message as string,
        })),
    [errors],
  );

  useEffect(() => {
    if (
      submitCount > errorSummaryFokusertVedSubmit.current &&
      errorSummaryItems.length > 0
    ) {
      errorSummaryRef.current?.focus();
      errorSummaryFokusertVedSubmit.current = submitCount;
    }
  }, [errorSummaryItems.length, submitCount]);

  const lagre = handleSubmit(async (verdier) => {
    setServerFeil(null);
    const behovDto = tilArbeidsgiverBehovDTO(verdier);
    if (!behovDto) return;

    setSaving(true);
    try {
      await oppdaterBehov(rekrutteringstreffId, arbeidsgiverTreffId, behovDto);
      onLagret();
      onLukk();
    } catch {
      setServerFeil('Klarte ikke å oppdatere behov. Prøv igjen.');
    } finally {
      setSaving(false);
    }
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    lagre();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nesteÅpen) => {
        if (!nesteÅpen) {
          onLukk();
        }
      }}
    >
      <Dialog.Popup
        id={dialogId}
        width='large'
        className='overflow-visible'
        closeOnOutsideClick={false}
      >
        <Dialog.Header>
          <Dialog.Title>{`Rediger behov – ${arbeidsgiverNavn}`}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className='min-w-0 overflow-y-auto sm:min-w-[500px]'>
          <form id={formId} onSubmit={onSubmit} noValidate>
            <VStack gap='space-16'>
              <Box
                background='neutral-soft'
                borderRadius='8'
                padding='space-16'
              >
                <BehovForm
                  control={control}
                  trigger={trigger}
                  revaliderVedEndring={submitCount > 0}
                />
              </Box>
              {submitCount > 0 && errorSummaryItems.length > 0 && (
                <ErrorSummary ref={errorSummaryRef} headingTag='h3'>
                  {errorSummaryItems.map((item) => (
                    <ErrorSummary.Item key={item.href} href={item.href}>
                      {item.melding}
                    </ErrorSummary.Item>
                  ))}
                </ErrorSummary>
              )}
              {serverFeil && (
                <LocalAlert status='error'>
                  <LocalAlert.Header>
                    <LocalAlert.Title as='h3'>
                      Kunne ikke lagre behov
                    </LocalAlert.Title>
                  </LocalAlert.Header>
                  <LocalAlert.Content>{serverFeil}</LocalAlert.Content>
                </LocalAlert>
              )}
            </VStack>
          </form>
        </Dialog.Body>
        <Dialog.Footer>
          <HStack gap='space-8' justify='end'>
            <Dialog.CloseTrigger>
              <Button type='button' variant='secondary'>
                Avbryt
              </Button>
            </Dialog.CloseTrigger>
            <Button type='submit' form={formId} loading={saving}>
              Lagre
            </Button>
          </HStack>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
};

export default RedigerBehovDialog;
