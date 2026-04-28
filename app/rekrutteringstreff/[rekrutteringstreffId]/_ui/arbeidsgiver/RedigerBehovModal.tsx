'use client';

import BehovForm, {
  ArbeidsgiverBehovFormData,
  BehovFormEndringsMeta,
  behovFeilTilErrorSummaryItems,
  tilArbeidsgiverBehovDTO,
  tilBehovFormData,
  validerBehov,
} from './BehovForm';
import {
  ArbeidsgiverBehovDTO,
  oppdaterBehov,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivereMedBehov';
import {
  Button,
  Dialog,
  ErrorSummary,
  HStack,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { FC, FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

interface Props {
  open: boolean;
  rekrutteringstreffId: string;
  arbeidsgiverTreffId: string;
  arbeidsgiverNavn: string;
  initielleVerdier: ArbeidsgiverBehovDTO | null;
  onLagret: () => void;
  onLukk: () => void;
}

const RedigerBehovModal: FC<Props> = ({
  open,
  rekrutteringstreffId,
  arbeidsgiverTreffId,
  arbeidsgiverNavn,
  initielleVerdier,
  onLagret,
  onLukk,
}) => {
  const [behov, setBehov] = useState<ArbeidsgiverBehovFormData>(
    tilBehovFormData(initielleVerdier),
  );
  const [feil, setFeil] = useState<ReturnType<typeof validerBehov>>({});
  const [harForsoktLagre, setHarForsoktLagre] = useState(false);
  const [lagreForsøk, setLagreForsøk] = useState(0);
  const [saving, setSaving] = useState(false);
  const [serverFeil, setServerFeil] = useState<string | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  useEffect(() => {
    setBehov(tilBehovFormData(initielleVerdier));
    setFeil({});
    setHarForsoktLagre(false);
    setServerFeil(null);
  }, [initielleVerdier, arbeidsgiverTreffId]);

  const errorSummaryItems = useMemo(
    () => behovFeilTilErrorSummaryItems(feil),
    [feil],
  );

  useEffect(() => {
    if (lagreForsøk > 0 && errorSummaryItems.length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errorSummaryItems.length, lagreForsøk]);

  const håndterBehovEndring = (
    neste: ArbeidsgiverBehovFormData,
    meta?: BehovFormEndringsMeta,
  ) => {
    setBehov(neste);
    if (!harForsoktLagre) return;
    if (meta?.type === 'toggle' || meta?.type === 'blur') {
      setFeil(validerBehov(neste));
    }
  };

  const lagre = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHarForsoktLagre(true);
    const v = validerBehov(behov);
    setFeil(v);
    setServerFeil(null);
    if (Object.keys(v).length > 0) {
      setLagreForsøk((antall) => antall + 1);
      return;
    }

    const behovDto = tilArbeidsgiverBehovDTO(behov);
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
      <Dialog.Popup width='large' className='overflow-visible'>
        <Dialog.Header>
          <Dialog.Title>{`Rediger behov – ${arbeidsgiverNavn}`}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className='min-w-[500px] overflow-y-auto'>
          <form id={formId} onSubmit={lagre} noValidate>
            <VStack gap='space-16'>
              <BehovForm
                verdi={behov}
                onChange={håndterBehovEndring}
                feilmeldinger={feil}
              />
              {harForsoktLagre && errorSummaryItems.length > 0 && (
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
                    <LocalAlert.Title as='h3'>Kunne ikke lagre behov</LocalAlert.Title>
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

export default RedigerBehovModal;
