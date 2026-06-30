'use client';

import OpprettFormidlingOppsummering from './OpprettFormidlingOppsummering';
import OpprettFormidlingSteg3, {
  OpprettFormidlingSteg3Handle,
} from './OpprettFormidlingSteg3';
import {
  ArbeidsgiverDTO as TreffArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { opprettFormidlingStilling } from '@/app/api/rekrutteringstreff/[...slug]/formidling/mutations';
import { formidlingListeEndepunkt } from '@/app/api/rekrutteringstreff/[...slug]/formidling/useFormidlinger';
import {
  JobbsøkerFormidlingTreffDTO,
  useJobbsøkereForFormidling,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForFormidling';
import { StillingSchemaDTO } from '@/app/api/stilling/rekrutteringsbistandstilling/[slug]/stilling.dto';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { Roller } from '@/components/tilgangskontroll/roller';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  Checkbox,
  Heading,
  Loader,
  Modal,
  Pagination,
  Radio,
  RadioGroup,
  Search,
  VStack,
} from '@navikt/ds-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useSWRConfig } from 'swr';

interface Props {
  åpen: boolean;
  onLukk: () => void;
}

const byggStillingSchemaDto = (props: {
  formVerdier: Partial<StillingAdminDTO>;
  valgtArbeidsgiver: TreffArbeidsgiverDTO;
}): StillingSchemaDTO => {
  const { formVerdier } = props;
  const stillingFraForm = formVerdier.stilling;
  const tittel =
    formVerdier.stilling?.categoryList?.find((c) => c.categoryType === 'JANZZ')
      ?.name || 'Formidling';

  if (!stillingFraForm) {
    throw new RekbisError({
      message: 'Mangler stillingsdata fra steg 2.',
    });
  }

  const now = new Date().toISOString();

  return {
    annonsenr: stillingFraForm.annonsenr ?? null,
    uuid: stillingFraForm.uuid ?? '',
    created: stillingFraForm.created ?? now,
    createdBy: formVerdier.brukerData?.ident || '',
    updated: stillingFraForm.updated ?? now,
    updatedBy: formVerdier.brukerData?.ident || '',
    title: tittel,
    status: stillingFraForm.status ?? null,
    administration: stillingFraForm.administration ?? null,
    mediaList: stillingFraForm.mediaList ?? [],
    contactList: stillingFraForm.contactList ?? [],
    privacy: stillingFraForm.privacy ?? null,
    source: stillingFraForm.source ?? null,
    medium: stillingFraForm.medium ?? null,
    reference: stillingFraForm.reference ?? null,
    published: stillingFraForm.published ?? null,
    expires: stillingFraForm.expires ?? null,
    employer: {
      name: props.valgtArbeidsgiver.navn,
      orgnr: props.valgtArbeidsgiver.organisasjonsnummer,
      id: null,
      uuid: null,
      created: null,
      createdBy: null,
      updated: null,
      updatedBy: null,
      mediaList: [],
      contactList: [],
      location: null,
      properties: {},
      status: null,
      parentOrgnr: null,
      publicName: props.valgtArbeidsgiver.navn,
      deactivated: null,
      orgform: null,
      employees: null,
    },
    location: stillingFraForm.location ?? null,
    locationList: stillingFraForm.locationList ?? [],
    categoryList: stillingFraForm.categoryList ?? [],
    properties: stillingFraForm.properties ?? null,
    publishedByAdmin: stillingFraForm.publishedByAdmin ?? null,
    businessName: stillingFraForm.businessName ?? null,
    firstPublished: stillingFraForm.firstPublished ?? null,
    deactivatedByExpiry: null,
    activationOnPublishingDate: null,
  };
};

const OpprettFormidlingFraTreffModal: FC<Props> = ({ åpen, onLukk }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { valgtNavKontor, visVarsel, harRolle } = useApplikasjonContext();
  const { track } = useUmami();
  const { mutate } = useSWRConfig();

  const tellingKontorEnhetId = valgtNavKontor?.navKontor ?? null;
  const tellingKontorNavn = valgtNavKontor?.navKontorNavn ?? null;

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);

  const ANTALL_PER_SIDE = 25;
  const [steg, setSteg] = useState<1 | 2 | 3 | 4>(1);
  const [valgtOrgnr, setValgtOrgnr] = useState<string | null>(null);
  const [valgteJobbsøkere, setValgteJobbsøkere] = useState<
    JobbsøkerFormidlingTreffDTO[]
  >([]);
  const [jobbsøkerSøk, setJobbsøkerSøk] = useState('');
  const [aktivtSøk, setAktivtSøk] = useState('');
  const [side, setSide] = useState(1);
  const [oppretter, setOppretter] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [steg2Gyldig, setSteg2Gyldig] = useState(false);
  const [lagretFormVerdier, setLagretFormVerdier] = useState<
    Partial<StillingAdminDTO> | undefined
  >(undefined);
  const steg3Ref = useRef<OpprettFormidlingSteg3Handle>(null);

  // Debounce fritekstsøket mot backend.
  useEffect(() => {
    const t = setTimeout(() => {
      setAktivtSøk(jobbsøkerSøk.trim());
      setSide(1);
    }, 300);
    return () => clearTimeout(t);
  }, [jobbsøkerSøk]);

  const jobbsøkereHook = useJobbsøkereForFormidling(rekrutteringstreffId, {
    side,
    antallPerSide: ANTALL_PER_SIDE,
    fritekst: aktivtSøk || undefined,
    orgnr: valgtOrgnr ?? undefined,
  });

  const arbeidsgivere = arbeidsgivereHook.data ?? [];
  const jobbsøkere = jobbsøkereHook.data?.jobbsøkere ?? [];
  const totaltAntall = jobbsøkereHook.data?.totalt ?? 0;
  const antallSider = Math.max(1, Math.ceil(totaltAntall / ANTALL_PER_SIDE));

  // Forhåndsvelg eneste arbeidsgiver
  if (
    valgtOrgnr === null &&
    arbeidsgivere.length === 1 &&
    arbeidsgivere[0]?.organisasjonsnummer
  ) {
    setValgtOrgnr(arbeidsgivere[0].organisasjonsnummer);
  }

  const valgtArbeidsgiver: TreffArbeidsgiverDTO | undefined =
    arbeidsgivere.find((a) => a.organisasjonsnummer === valgtOrgnr);

  const valgteFnr = valgteJobbsøkere.map((j) => j.fødselsnummer);

  const lukk = () => {
    if (oppretter) return;
    setSteg(1);
    setValgtOrgnr(null);
    setValgteJobbsøkere([]);
    setJobbsøkerSøk('');
    setAktivtSøk('');
    setSide(1);
    setFeil(null);
    setLagretFormVerdier(undefined);
    onLukk();
  };

  const gåTilOppsummering = () => {
    setLagretFormVerdier(steg3Ref.current?.hentVerdier());
    setSteg(4);
  };

  const toggleJobbsøker = (j: JobbsøkerFormidlingTreffDTO) => {
    setValgteJobbsøkere((eks) =>
      eks.some((v) => v.fødselsnummer === j.fødselsnummer)
        ? eks.filter((v) => v.fødselsnummer !== j.fødselsnummer)
        : [...eks, j],
    );
  };

  const velgArbeidsgiver = (orgnr: string) => {
    if (orgnr === valgtOrgnr) return;
    // Nullstill valgte jobbsøkere fordi «allerede formidlet» avhenger av arbeidsgiveren.
    setValgteJobbsøkere([]);
    setValgtOrgnr(orgnr);
  };

  const håndterOpprett = async () => {
    setFeil(null);
    if (!valgtArbeidsgiver?.organisasjonsnummer) {
      setFeil('Velg en arbeidsgiver først.');
      return;
    }
    if (valgteJobbsøkere.length === 0) {
      setFeil('Velg minst én jobbsøker.');
      return;
    }

    setOppretter(true);
    try {
      const formVerdier = lagretFormVerdier ?? steg3Ref.current?.hentVerdier();

      if (!formVerdier) {
        setFeil('Mangler utfylte stillingsdata. Gå tilbake og fyll ut steg 2.');
        setOppretter(false);
        return;
      }

      const janzzKategori = formVerdier.stilling?.categoryList?.find(
        (c) => c.categoryType === 'JANZZ',
      );

      const respons = await opprettFormidlingStilling({
        kontornummer: valgtNavKontor?.navKontor,
        kontornavn: valgtNavKontor?.navKontorNavn,
        rekrutteringstreffId,
        fødselsnumre: valgteJobbsøkere.map((j) => j.fødselsnummer),
        orgnr: valgtArbeidsgiver.organisasjonsnummer,
        stilling: byggStillingSchemaDto({ formVerdier, valgtArbeidsgiver }),
        yrkestittel: janzzKategori?.name ?? undefined,
        janzzKonseptId: janzzKategori?.code ?? undefined,
      });

      const variant = harRolle([
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ])
        ? 'alle'
        : 'egne';
      const listeBase = formidlingListeEndepunkt(variant, rekrutteringstreffId);
      mutate((key) => typeof key === 'string' && key.startsWith(listeBase));

      setOppretter(false);
      onLukk();

      track(UmamiEvent.Sidebar.opprettet_rekrutteringstreffformidling);
    } catch (error) {
      const melding =
        error instanceof Error
          ? error.message
          : 'Ukjent feil ved opprettelse av Formidling';
      setFeil(melding);
      visVarsel({ type: 'error', tekst: melding });
      setOppretter(false);
    }
  };

  const stegTittel =
    steg === 1
      ? 'Velg arbeidsgiver (1 av 4)'
      : steg === 2
        ? 'Fyll inn informasjon (2 av 4)'
        : steg === 3
          ? 'Velg jobbsøkere (3 av 4)'
          : 'Oppsummering (4 av 4)';

  const kanGåVidereFraSteg1 = !!valgtOrgnr;
  const kanGåVidereFraSteg3 = valgteFnr.length > 0;

  return (
    <Modal
      open={åpen}
      onClose={lukk}
      header={{ heading: 'Opprett Formidling' }}
      className='text-left'
      width={steg === 2 || steg === 4 ? '900px' : 'medium'}
    >
      <Modal.Body>
        <VStack gap='space-16'>
          <Heading level='2' size='small'>
            {stegTittel}
          </Heading>

          {steg === 1 && (
            <>
              {arbeidsgivereHook.isLoading ? (
                <Loader />
              ) : arbeidsgivere.length === 0 ? (
                <Alert variant='info'>
                  Treffet har ingen arbeidsgivere. Legg til en arbeidsgiver i
                  treffet før du oppretter formidling.
                </Alert>
              ) : (
                <RadioGroup
                  legend='Arbeidsgiver fra treffet'
                  value={valgtOrgnr ?? ''}
                  onChange={(verdi: string) => velgArbeidsgiver(verdi)}
                >
                  {arbeidsgivere.map((a) => (
                    <Radio
                      key={a.organisasjonsnummer}
                      value={a.organisasjonsnummer}
                    >
                      <div>
                        <BodyShort weight='semibold'>{a.navn}</BodyShort>
                        <BodyShort size='small' textColor='subtle'>
                          Org.nr {a.organisasjonsnummer}
                        </BodyShort>
                      </div>
                    </Radio>
                  ))}
                </RadioGroup>
              )}
            </>
          )}

          <div hidden={steg !== 2}>
            <VStack gap='space-16'>
              <BodyLong>
                Fyll inn informasjonen som mangler om formidlingen til{' '}
                <strong>{valgtArbeidsgiver?.navn}</strong>.
              </BodyLong>
              <OpprettFormidlingSteg3
                ref={steg3Ref}
                onGyldigEndret={setSteg2Gyldig}
              />
            </VStack>
          </div>

          {steg === 3 && (
            <>
              <VStack gap='space-8'>
                <BodyShort textColor='subtle'>
                  Velg jobbsøkerne du vil etterregistrere som formidlet til{' '}
                  {valgtArbeidsgiver?.navn}.
                </BodyShort>
                <Search
                  label='Søk etter navn eller fødselsnummer'
                  hideLabel
                  size='small'
                  variant='simple'
                  placeholder='Søk etter navn eller fødselsnummer'
                  value={jobbsøkerSøk}
                  onChange={(verdi) => setJobbsøkerSøk(verdi)}
                  maxLength={30}
                />
                <BodyShort size='small' textColor='subtle'>
                  {valgteFnr.length} valgt av{' '}
                  {jobbsøkereHook.data ? totaltAntall : '–'}
                </BodyShort>
                <div className='border-border-subtle border-t pt-2'>
                  {jobbsøkereHook.isLoading ? (
                    <Loader />
                  ) : jobbsøkere.length === 0 ? (
                    <BodyShort textColor='subtle'>
                      {aktivtSøk
                        ? 'Ingen jobbsøkere matcher søket.'
                        : 'Treffet har ingen jobbsøkere å legge til.'}
                    </BodyShort>
                  ) : (
                    jobbsøkere.map((j) => (
                      <Checkbox
                        key={j.personTreffId}
                        checked={valgteFnr.includes(j.fødselsnummer)}
                        onChange={() => toggleJobbsøker(j)}
                        disabled={j.alleredeFormidlet}
                        className={
                          j.alleredeFormidlet ? 'opacity-50' : undefined
                        }
                      >
                        <div>
                          <div className='flex items-center gap-2'>
                            <BodyShort weight='semibold'>
                              {j.etternavn ?? ''}
                              {j.etternavn && j.fornavn ? ', ' : ''}
                              {j.fornavn ?? ''}
                            </BodyShort>
                            {j.alleredeFormidlet && (
                              <BodyShort
                                size='small'
                                textColor='subtle'
                                className='italic'
                              >
                                (Allerede formidlet)
                              </BodyShort>
                            )}
                          </div>
                          <BodyShort size='small' textColor='subtle'>
                            f.nr {j.fødselsnummer}
                          </BodyShort>
                        </div>
                      </Checkbox>
                    ))
                  )}
                </div>
                {antallSider > 1 && (
                  <div className='flex justify-center pt-2'>
                    <Pagination
                      page={side}
                      onPageChange={setSide}
                      count={antallSider}
                      size='small'
                    />
                  </div>
                )}
              </VStack>
            </>
          )}

          {steg === 4 && (
            <>
              {tellingKontorNavn && (
                <Alert variant='info' size='small'>
                  Formidlingsresultatet tilfaller kontoret ditt (
                  {tellingKontorNavn}
                  {tellingKontorEnhetId ? ` – ${tellingKontorEnhetId}` : ''}).
                </Alert>
              )}
              <OpprettFormidlingOppsummering
                arbeidsgiver={valgtArbeidsgiver}
                jobbsøkere={valgteJobbsøkere}
                formVerdier={lagretFormVerdier}
                onFjernJobbsøker={(fnr) => {
                  setValgteJobbsøkere((eks) => {
                    const nye = eks.filter((j) => j.fødselsnummer !== fnr);
                    if (nye.length === 0) setSteg(3);
                    return nye;
                  });
                }}
              />
            </>
          )}

          {feil && steg === 4 && <Alert variant='error'>{feil}</Alert>}
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <Button variant='tertiary' disabled={oppretter} onClick={lukk}>
              Avbryt
            </Button>
            {steg > 1 && (
              <Button
                variant='tertiary'
                disabled={oppretter}
                onClick={() => setSteg((s) => (s === 4 ? 3 : s === 3 ? 2 : 1))}
              >
                Tilbake
              </Button>
            )}
          </div>
          <div className='flex items-center gap-2'>
            {steg === 1 && (
              <Button
                disabled={!kanGåVidereFraSteg1}
                onClick={() => setSteg(2)}
              >
                Neste
              </Button>
            )}
            {steg === 2 && (
              <Button disabled={!steg2Gyldig} onClick={() => setSteg(3)}>
                Neste
              </Button>
            )}
            {steg === 3 && (
              <Button
                disabled={!kanGåVidereFraSteg3}
                onClick={gåTilOppsummering}
              >
                Neste
              </Button>
            )}
            {steg === 4 && (
              <Button loading={oppretter} onClick={håndterOpprett}>
                Opprett
              </Button>
            )}
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OpprettFormidlingFraTreffModal;
