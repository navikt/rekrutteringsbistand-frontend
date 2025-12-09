'use client';

import { useHentRekrutteringstreffMeldingsmaler } from '@/app/api/kandidatvarsel/hentMeldingsmaler';
import {
  EndringerDto,
  EndringsfeltDisplayTekst,
} from '@/app/api/rekrutteringstreff/[...slug]/endringer/mutations';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { RekrutteringstreffUtenHendelserDTO } from '@/app/api/rekrutteringstreff/[...slug]/useRekrutteringstreff';
import { MeldingsmalVisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/MeldingsmalVisning';
import {
  formatIso,
  toIso,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/rediger/tidspunkt/utils';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerHendelsestype } from '@/app/rekrutteringstreff/_types/constants';
import { BellIcon } from '@navikt/aksel-icons';
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  HStack,
  Label,
  Modal,
  Switch,
  VStack,
} from '@navikt/ds-react';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type EndringMedVarsling = {
  felt: keyof EndringerDto;
  label: string;
  gammelVerdi: string;
  nyVerdi: string;
  skalVarsle: boolean;
};

/**
 * Beregner listen over endringer mellom original og nye verdier.
 * Returnerer sammenslåtte felter (navn, sted, tidspunkt, svarfrist, introduksjon)
 */
const beregnEndringer = (
  verdier: any,
  treff: any,
  innleggHtmlFraBackend: string,
): EndringMedVarsling[] => {
  const endringer: EndringMedVarsling[] = [];

  const fraTid =
    toIso(verdier.fraDato, verdier.fraTid?.trim() || '00:00') ?? treff?.fraTid;
  const tilTid =
    toIso(
      verdier.tilDato ?? verdier.fraDato,
      verdier.tilTid?.trim() || '00:00',
    ) ?? treff?.tilTid;
  const svarfrist =
    toIso(verdier.svarfristDato, verdier.svarfristTid?.trim() || '00:00') ??
    treff?.svarfrist;

  const tittel = verdier.tittel?.trim() || treff?.tittel || '';

  // Navn (tittel)
  if (treff?.tittel !== tittel) {
    endringer.push({
      felt: 'navn',
      label: 'Nytt navn',
      gammelVerdi: treff?.tittel || '',
      nyVerdi: tittel,
      skalVarsle: false,
    });
  }

  // Sted (gateadresse + postnummer + poststed sammenslått)
  const gammelSted = [treff?.gateadresse, treff?.postnummer, treff?.poststed]
    .filter(Boolean)
    .join(', ');
  const nySted = [
    verdier.gateadresse ?? treff?.gateadresse,
    verdier.postnummer ?? treff?.postnummer,
    verdier.poststed ?? treff?.poststed,
  ]
    .filter(Boolean)
    .join(', ');

  if (gammelSted !== nySted) {
    endringer.push({
      felt: 'sted',
      label: 'Nytt sted',
      gammelVerdi: gammelSted,
      nyVerdi: nySted,
      skalVarsle: false,
    });
  }

  // Tidspunkt (fraTid + tilTid sammenslått)
  const gammelTidspunkt = [formatIso(treff?.fraTid), formatIso(treff?.tilTid)]
    .filter(Boolean)
    .join(' - ');
  const nyTidspunkt = [formatIso(fraTid), formatIso(tilTid)]
    .filter(Boolean)
    .join(' - ');

  if (gammelTidspunkt !== nyTidspunkt) {
    endringer.push({
      felt: 'tidspunkt',
      label: 'Nytt tidspunkt',
      gammelVerdi: gammelTidspunkt,
      nyVerdi: nyTidspunkt,
      skalVarsle: false,
    });
  }

  // Svarfrist
  const gammelSvarfrist = formatIso(treff?.svarfrist);
  const nySvarfrist = formatIso(svarfrist);

  if (gammelSvarfrist !== nySvarfrist) {
    endringer.push({
      felt: 'svarfrist',
      label: 'Ny svarfrist',
      gammelVerdi: gammelSvarfrist,
      nyVerdi: nySvarfrist,
      skalVarsle: false,
    });
  }

  // Introduksjon (innlegg)
  if ((innleggHtmlFraBackend || '') !== (verdier.htmlContent || '')) {
    endringer.push({
      felt: 'introduksjon',
      label: 'Ny introduksjon',
      gammelVerdi: innleggHtmlFraBackend ? 'Innhold endret' : '',
      nyVerdi: verdier.htmlContent ? 'Innhold endret' : '',
      skalVarsle: false,
    });
  }

  return endringer;
};

interface RepubliserRekrutteringstreffButtonProps {
  treff: RekrutteringstreffUtenHendelserDTO | null;
  innleggHtmlFraBackend?: string | null;
}

const formaterMeldingsmal = (
  tekst: string,
  endringer: EndringMedVarsling[],
  isHtml: boolean = false,
): string => {
  const varsleEndringer = endringer.filter((e) => e.skalVarsle);

  if (varsleEndringer.length === 0) {
    return tekst;
  }

  const displayTekster = varsleEndringer.map(
    (e) => EndringsfeltDisplayTekst[e.felt],
  );

  let formatertTekst: string;

  if (isHtml) {
    // For HTML: lag <p> tags for hvert felt
    formatertTekst = displayTekster.map((t) => `<p>${t}</p>`).join('');
  } else {
    // For SMS: linjeskift mellom hvert felt
    formatertTekst = displayTekster.join('\n');
  }

  return tekst.replace('{{ENDRINGER}}', formatertTekst);
};

/**
 * Komponent for å republisere et rekrutteringstreff.
 * Viser en knapp som åpner en modal for bekreftelse av endringer før republisering.
 */
const RepubliserRekrutteringstreffButton: FC<
  RepubliserRekrutteringstreffButtonProps
> = ({ treff, innleggHtmlFraBackend }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { getValues, watch, formState, setValue } = useFormContext();
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { data: meldingsmaler } = useHentRekrutteringstreffMeldingsmaler();
  const { data: jobbsøkere } = useJobbsøkere(rekrutteringstreffId);
  const [endringer, setEndringer] = useState<EndringMedVarsling[]>([]);
  const [endringerVistIModal, setEndringerVistIModal] = useState<
    EndringMedVarsling[]
  >([]);
  const [wasSubmitting, setWasSubmitting] = useState(false);

  const harInviterteKandidater = useMemo(() => {
    return jobbsøkere?.some((js) =>
      js.hendelser.some(
        (h) => h.hendelsestype === JobbsøkerHendelsestype.INVITERT,
      ),
    );
  }, [jobbsøkere]);

  const lukkModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  useEffect(() => {
    const beregnOgOppdater = () => {
      const verdier = getValues();
      const nyeEndringer = beregnEndringer(
        verdier,
        treff,
        innleggHtmlFraBackend || '',
      );
      setEndringer(nyeEndringer);
    };

    beregnOgOppdater();

    // Subscribe til ALLE form changes
    const subscription = watch(() => {
      beregnOgOppdater();
    });

    return () => subscription.unsubscribe();
  }, [treff, watch, getValues, innleggHtmlFraBackend]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (wasSubmitting && !formState.isSubmitting) {
      if (!formState.errors || Object.keys(formState.errors).length === 0) {
        lukkModal();
      }
      timer = setTimeout(() => {
        setWasSubmitting(false);
      }, 0);
    } else if (formState.isSubmitting && !wasSubmitting) {
      timer = setTimeout(() => {
        setWasSubmitting(true);
      }, 0);
    }
    return () => {
      if (timer !== null) {
        clearTimeout(timer);
      }
    };
  }, [formState.isSubmitting, formState.errors, wasSubmitting, lukkModal]);

  const tittelKiSjekket = watch('tittelKiSjekket') ?? false;
  const innleggKiSjekket = watch('htmlContentKiSjekket') ?? false;
  const tittelKiFeil = watch('tittelKiFeil') ?? false;
  const innleggKiFeil = watch('htmlContentKiFeil') ?? false;

  const harKiFeil = tittelKiFeil || innleggKiFeil;
  const harAndreSkjemafeil = Boolean(
    formState.errors &&
      Object.keys(formState.errors).some((key) => key !== 'root'),
  );
  const harFeil = harKiFeil || harAndreSkjemafeil;

  const manglerNavn = treff?.tittel?.trim() === 'Treff uten navn';
  const kreverTittelSjekk = endringer.some((e) => e.felt === 'navn');
  const kreverInnleggSjekk = endringer.some((e) => e.felt === 'introduksjon');

  const isDisabled = useMemo(() => {
    const manglerEndring = endringer.length === 0;
    const kiSjekkOk =
      (!kreverTittelSjekk || tittelKiSjekket) &&
      (!kreverInnleggSjekk || innleggKiSjekket);
    return manglerEndring || harFeil || !kiSjekkOk || manglerNavn;
  }, [
    endringer.length,
    harFeil,
    kreverTittelSjekk,
    kreverInnleggSjekk,
    tittelKiSjekket,
    innleggKiSjekket,
    manglerNavn,
  ]);

  const toggleSkalVarsle = useCallback(
    (felt: keyof EndringerDto) => {
      setEndringerVistIModal((prev) => {
        const updated = prev.map((e) =>
          e.felt === felt ? { ...e, skalVarsle: !e.skalVarsle } : e,
        );
        // Oppdater form state med nye skalVarsle-verdier
        const skalVarsleMap = Object.fromEntries(
          updated.map((e) => [e.felt, e.skalVarsle]),
        );
        setValue('endringerSkalVarsle', skalVarsleMap);
        return updated;
      });
    },
    [setValue],
  );

  const harNoenVarsling = useMemo(
    () => endringerVistIModal.some((e) => e.skalVarsle),
    [endringerVistIModal],
  );

  const åpneModal = useCallback(() => {
    if (!isDisabled) {
      // Lagre en kopi av gjeldende endringer som skal vises i modalen
      setEndringerVistIModal([...endringer]);
      // Initialiser skalVarsle-verdier i form state (alle false som default)
      const skalVarsleMap = Object.fromEntries(
        endringer.map((e) => [e.felt, false]),
      );
      setValue('endringerSkalVarsle', skalVarsleMap);
      modalRef.current?.showModal();
    }
  }, [endringer, isDisabled, setValue]);

  return (
    <>
      {/* Knapp for å åpne bekreftelsesmodal */}
      <Button
        type='button'
        variant='primary'
        size='small'
        disabled={isDisabled}
        onClick={åpneModal}
      >
        Publiser på nytt
      </Button>

      {/* Modal for bekreftelse av endringer før republisering */}
      <Modal ref={modalRef} width={720} header={{ heading: 'Lagre endringer' }}>
        <Modal.Body>
          <VStack gap='6'>
            {harInviterteKandidater && (
              <HStack gap='2' align='center'>
                <BellIcon aria-hidden fontSize='1.25rem' />
                <BodyShort>Du har gjort endringer du kan varsle om:</BodyShort>
              </HStack>
            )}

            {endringerVistIModal.length === 0 ? (
              <BodyLong>Ingen endringer oppdaget.</BodyLong>
            ) : (
              <>
                {harInviterteKandidater && (
                  <div>
                    <Label size='small'>Velg hva du vil ha med i varslet</Label>
                    <BodyShort
                      size='small'
                      className='text-text-subtle mt-1 mb-2'
                    >
                      Inviterte jobbsøkere som ikke har takket nei får melding
                      på SMS, eller epost om.
                    </BodyShort>
                  </div>
                )}

                <VStack gap='3'>
                  {endringerVistIModal.map((endring) => (
                    <Box.New
                      key={endring.felt}
                      background={
                        endring.skalVarsle ? 'info-soft' : 'neutral-softA'
                      }
                      padding='3'
                      borderRadius='large'
                    >
                      <div className='flex items-start justify-between gap-4'>
                        <VStack gap='1'>
                          <Label size='small'>{endring.label}</Label>
                          <BodyShort size='small' className='text-text-subtle'>
                            Før: {endring.gammelVerdi || '—'}
                          </BodyShort>
                          <BodyShort size='small' className='text-text-subtle'>
                            Nå: {endring.nyVerdi || '—'}
                          </BodyShort>
                        </VStack>
                        {harInviterteKandidater && (
                          <Switch
                            size='small'
                            hideLabel
                            checked={endring.skalVarsle}
                            onChange={() => toggleSkalVarsle(endring.felt)}
                          >
                            Varsle om {endring.label.toLowerCase()}
                          </Switch>
                        )}
                      </div>
                    </Box.New>
                  ))}
                </VStack>
              </>
            )}

            {meldingsmaler && harInviterteKandidater && (
              <Box.New
                background='neutral-softA'
                padding='4'
                borderRadius='xlarge'
              >
                <VStack gap='2'>
                  <Label size='small'>Meldingen</Label>
                  {harNoenVarsling ? (
                    <MeldingsmalVisning
                      tittel=''
                      smsTekst={formaterMeldingsmal(
                        meldingsmaler.kandidatInvitertTreffEndret.smsTekst,
                        endringerVistIModal,
                        false,
                      )}
                      epostTittel={
                        meldingsmaler.kandidatInvitertTreffEndret.epostTittel
                      }
                      epostHtmlBody={formaterMeldingsmal(
                        meldingsmaler.kandidatInvitertTreffEndret.epostHtmlBody,
                        endringerVistIModal,
                        true,
                      )}
                    />
                  ) : (
                    <BodyShort size='small' className='text-text-subtle'>
                      Ingen varsel sendes ut. Hvis du vil sende melding til
                      jobbsøkerne, velg endringene du vil varsle om over.
                    </BodyShort>
                  )}
                </VStack>
              </Box.New>
            )}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type='button'
            variant='secondary'
            size='small'
            onClick={lukkModal}
            disabled={formState.isSubmitting}
          >
            Avbryt
          </Button>
          <Button
            type='submit'
            form='rekrutteringstreff-form'
            variant='primary'
            size='small'
            disabled={isDisabled}
            loading={formState.isSubmitting}
          >
            {harNoenVarsling ? 'Lagre og varsle' : 'Lagre uten å varsle'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RepubliserRekrutteringstreffButton;
