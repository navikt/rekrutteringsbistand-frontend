'use client';

import OpprettFormidlingOppsummering from './OpprettFormidlingOppsummering';
import OpprettFormidlingSteg3, {
  OpprettFormidlingSteg3Handle,
} from './OpprettFormidlingSteg3';
import { getApiWithSchemaEs } from '@/app/api/fetcher';
import {
  ArbeidsgiverDTO as PamArbeidsgiverDTO,
  ArbeidsgiverSchema as PamArbeidsgiverSchema,
  ArbeidsgiverSchemaDTO,
  useFinnArbeidsgiver,
} from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import {
  ArbeidsgiverDTO as TreffArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import {
  JobbsøkerFormidlingTreffDTO,
  useJobbsøkereForFormidling,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForFormidling';
import { opprettNyStilling } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { useRekrutteringstreffData } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/useRekrutteringstreffData';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { lagrePrefyll } from '@/app/rekrutteringstreff/_utils/formidlingPrefyll';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { hentNavkontorNavn } from '@/util/navkontorMapping';
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
import { z } from 'zod';

const PamArbeidsgivereArraySchema = z.array(PamArbeidsgiverSchema);

interface Props {
  åpen: boolean;
  onLukk: () => void;
}

const finnArbeidsgiverViaOrgnr = async (
  orgnr: string,
): Promise<PamArbeidsgiverDTO> => {
  const data = await getApiWithSchemaEs(ArbeidsgiverSchemaDTO)({
    url: `/api/pam-search/underenhet?q=${orgnr}`,
  });
  const parsed = PamArbeidsgivereArraySchema.parse(data);
  const arbeidsgiver = parsed.find((a) => a.organisasjonsnummer === orgnr);
  if (!arbeidsgiver) {
    throw new RekbisError({
      message: `Fant ikke arbeidsgiver med orgnr ${orgnr} i pam-search`,
    });
  }
  return arbeidsgiver;
};

const OpprettFormidlingFraTreffModal: FC<Props> = ({ åpen, onLukk }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { treff } = useRekrutteringstreffData();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const { trackAndNavigate } = useUmami();

  const tellingKontorEnhetId = treff?.opprettetAvNavkontorEnhetId ?? null;
  const tellingKontorNavn = tellingKontorEnhetId
    ? hentNavkontorNavn(tellingKontorEnhetId)
    : null;

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

      const pamArbeidsgiver = await finnArbeidsgiverViaOrgnr(
        valgtArbeidsgiver.organisasjonsnummer,
      );

      const respons = await opprettNyStilling({
        kategori: Stillingskategori.Rekrutteringstreff,
        eierNavKontorEnhetId: valgtNavKontor?.navKontor,
        navident: brukerData.ident,
        brukerNavn: `${brukerData.fornavn} ${brukerData.etternavn}`,
        rekrutteringstreffId,
      });
      const uuid = respons?.stilling?.uuid;
      if (!uuid) {
        throw new RekbisError({
          message: 'Manglende uuid ved opprettelse av Formidling',
          error: respons,
        });
      }

      lagrePrefyll({
        stillingsId: uuid,
        arbeidsgiver: pamArbeidsgiver,
        kandidater: valgteJobbsøkere.map((j) => ({
          fnr: j.fødselsnummer,
          fornavn: j.fornavn,
          etternavn: j.etternavn,
        })),
        formVerdier,
      });

      trackAndNavigate(
        UmamiEvent.Sidebar.opprettet_rekrutteringstreffformidling,
        `/Formidling/${uuid}/rediger`,
      );
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
                  onChange={(verdi: string) => setValgtOrgnr(verdi)}
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
                      >
                        <div>
                          <BodyShort weight='semibold'>
                            {j.etternavn ?? ''}
                            {j.etternavn && j.fornavn ? ', ' : ''}
                            {j.fornavn ?? ''}
                          </BodyShort>
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
                  Formidlingsresultatet tilfaller kontoret som opprettet
                  rekrutteringstreffet ({tellingKontorNavn}
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
