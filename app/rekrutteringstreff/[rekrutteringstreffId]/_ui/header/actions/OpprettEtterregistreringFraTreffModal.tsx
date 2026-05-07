'use client';

import OpprettEtterregistreringOppsummering from './OpprettEtterregistreringOppsummering';
import OpprettEtterregistreringSteg3, {
  OpprettEtterregistreringSteg3Handle,
} from './OpprettEtterregistreringSteg3';
import { getAPI } from '@/app/api/fetcher';
import {
  ArbeidsgiverDTO as PamArbeidsgiverDTO,
  ArbeidsgiverSchema as PamArbeidsgiverSchema,
} from '@/app/api/pam-search/underenhet/useArbeidsgiver';
import {
  ArbeidsgiverDTO as TreffArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { opprettNyStilling } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import { lagrePrefyll } from '@/app/rekrutteringstreff/_utils/etterregistreringPrefyll';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
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
  Radio,
  RadioGroup,
  Search,
  VStack,
} from '@navikt/ds-react';
import { FC, useMemo, useRef, useState } from 'react';
import { z } from 'zod';

const PamArbeidsgivereArraySchema = z.array(PamArbeidsgiverSchema);

interface Props {
  åpen: boolean;
  onLukk: () => void;
}

const finnArbeidsgiverViaOrgnr = async (
  orgnr: string,
): Promise<PamArbeidsgiverDTO> => {
  const data = await getAPI(`/api/pam-search/underenhet?q=${orgnr}`);
  const parsed = PamArbeidsgivereArraySchema.parse(data);
  const treff = parsed.find((a) => a.organisasjonsnummer === orgnr);
  if (!treff) {
    throw new RekbisError({
      message: `Fant ikke arbeidsgiver med orgnr ${orgnr} i pam-search`,
    });
  }
  return treff;
};

const OpprettEtterregistreringFraTreffModal: FC<Props> = ({ åpen, onLukk }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const { trackAndNavigate } = useUmami();

  const arbeidsgivereHook =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const jobbsøkereHook = useJobbsøkere(rekrutteringstreffId);

  const [steg, setSteg] = useState<1 | 2 | 3 | 4>(1);
  const [valgtOrgnr, setValgtOrgnr] = useState<string | null>(null);
  const [valgteFnr, setValgteFnr] = useState<string[]>([]);
  const [jobbsøkerSøk, setJobbsøkerSøk] = useState('');
  const [oppretter, setOppretter] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);
  const [lagretFormVerdier, setLagretFormVerdier] = useState<
    Partial<StillingAdminDTO> | undefined
  >(undefined);
  const steg3Ref = useRef<OpprettEtterregistreringSteg3Handle>(null);

  const arbeidsgivere = arbeidsgivereHook.data ?? [];
  const jobbsøkere = useMemo(
    () =>
      (jobbsøkereHook.data?.jobbsøkere ?? []).filter(
        (j) => j.status !== JobbsøkerStatus.SLETTET,
      ),
    [jobbsøkereHook.data],
  );

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

  const valgteJobbsøkere = jobbsøkere.filter((j) =>
    valgteFnr.includes(j.fødselsnummer),
  );

  const filtrerteJobbsøkere = useMemo(() => {
    const søk = jobbsøkerSøk.trim().toLowerCase();
    if (!søk) return jobbsøkere;
    return jobbsøkere.filter((j) => {
      const fulltNavn = `${j.fornavn ?? ''} ${j.etternavn ?? ''}`
        .toLowerCase()
        .trim();
      const omvendt = `${j.etternavn ?? ''} ${j.fornavn ?? ''}`
        .toLowerCase()
        .trim();
      return (
        fulltNavn.includes(søk) ||
        omvendt.includes(søk) ||
        j.fødselsnummer.includes(søk)
      );
    });
  }, [jobbsøkere, jobbsøkerSøk]);

  const lukk = () => {
    if (oppretter) return;
    setSteg(1);
    setValgtOrgnr(null);
    setValgteFnr([]);
    setJobbsøkerSøk('');
    setFeil(null);
    setLagretFormVerdier(undefined);
    onLukk();
  };

  const gåTilOppsummering = () => {
    setLagretFormVerdier(steg3Ref.current?.hentVerdier());
    setSteg(4);
  };

  const toggleJobbsøker = (fnr: string) => {
    setValgteFnr((eks) =>
      eks.includes(fnr) ? eks.filter((f) => f !== fnr) : [...eks, fnr],
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
          message: 'Manglende uuid ved opprettelse av etterregistrering',
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
        UmamiEvent.Sidebar.opprettet_etterregistrering,
        `/etterregistrering/${uuid}/rediger`,
      );
    } catch (error) {
      const melding =
        error instanceof Error
          ? error.message
          : 'Ukjent feil ved opprettelse av etterregistrering';
      setFeil(melding);
      visVarsel({ type: 'error', tekst: melding });
      setOppretter(false);
    }
  };

  const stegTittel =
    steg === 1
      ? 'Velg arbeidsgiver (1 av 4)'
      : steg === 2
        ? 'Velg jobbsøkere (2 av 4)'
        : steg === 3
          ? 'Fyll inn informasjon (3 av 4)'
          : 'Oppsummering (4 av 4)';

  const kanGåVidereFraSteg1 = !!valgtOrgnr;
  const kanGåVidereFraSteg2 = valgteFnr.length > 0;

  return (
    <Modal
      open={åpen}
      onClose={lukk}
      header={{ heading: 'Opprett etterregistrering' }}
      width={steg === 3 || steg === 4 ? '900px' : 'medium'}
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
                  treffet før du oppretter etterregistrering.
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

          {steg === 2 && (
            <>
              {jobbsøkereHook.isLoading ? (
                <Loader />
              ) : jobbsøkere.length === 0 ? (
                <Alert variant='info'>
                  Treffet har ingen jobbsøkere å legge til.
                </Alert>
              ) : (
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
                  />
                  <BodyShort size='small' textColor='subtle'>
                    {valgteFnr.length} valgt av {jobbsøkere.length}
                  </BodyShort>
                  <div className='border-border-subtle border-t pt-2'>
                    {filtrerteJobbsøkere.length === 0 ? (
                      <BodyShort textColor='subtle'>
                        Ingen jobbsøkere matcher søket.
                      </BodyShort>
                    ) : (
                      filtrerteJobbsøkere.map((j) => (
                        <Checkbox
                          key={j.personTreffId}
                          checked={valgteFnr.includes(j.fødselsnummer)}
                          onChange={() => toggleJobbsøker(j.fødselsnummer)}
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
                </VStack>
              )}
            </>
          )}

          <div hidden={steg !== 3}>
            <VStack gap='space-16'>
              <BodyLong>
                Etterregistrerer <strong>{valgteJobbsøkere.length}</strong>{' '}
                jobbsøker
                {valgteJobbsøkere.length === 1 ? '' : 'e'} til{' '}
                <strong>{valgtArbeidsgiver?.navn}</strong>. Fyll inn
                informasjonen som mangler om formidlingen.
              </BodyLong>
              <OpprettEtterregistreringSteg3 ref={steg3Ref} />
            </VStack>
          </div>

          {steg === 4 && (
            <OpprettEtterregistreringOppsummering
              arbeidsgiver={valgtArbeidsgiver}
              jobbsøkere={valgteJobbsøkere}
              formVerdier={lagretFormVerdier}
            />
          )}

          {feil && (steg === 3 || steg === 4) && (
            <Alert variant='error'>{feil}</Alert>
          )}
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
              <Button
                disabled={!kanGåVidereFraSteg2}
                onClick={() => setSteg(3)}
              >
                Neste
              </Button>
            )}
            {steg === 3 && <Button onClick={gåTilOppsummering}>Neste</Button>}
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

export default OpprettEtterregistreringFraTreffModal;
