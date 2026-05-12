'use client';

import OpprettEtterregistreringOppsummering from './OpprettEtterregistreringOppsummering';
import OpprettEtterregistreringSteg3, {
  OpprettEtterregistreringSteg3Handle,
} from './OpprettEtterregistreringSteg3';
import {
  ArbeidsgiverDTO as TreffArbeidsgiverDTO,
  useRekrutteringstreffArbeidsgivere,
} from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { opprettNyStilling } from '@/app/api/stilling/ny-stilling/opprettNyStilling';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { JobbsøkerStatus } from '@/app/rekrutteringstreff/_types/constants';
import ArbeidsgiverRadioGruppe from '@/app/rekrutteringstreff/_ui/etterregistrering/ArbeidsgiverRadioGruppe';
import JobbsøkerVelger from '@/app/rekrutteringstreff/_ui/etterregistrering/JobbsøkerVelger';
import { lagrePrefyll } from '@/app/rekrutteringstreff/_utils/etterregistreringPrefyll';
import { finnArbeidsgiverViaOrgnr } from '@/app/rekrutteringstreff/_utils/finnArbeidsgiverViaOrgnr';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import { Stillingskategori } from '@/app/stilling/_ui/stilling-typer';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import {
  Alert,
  BodyLong,
  Button,
  Heading,
  Modal,
  VStack,
} from '@navikt/ds-react';
import { FC, useMemo, useRef, useState } from 'react';

interface Props {
  åpen: boolean;
  onLukk: () => void;
}

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
  const [steg2Gyldig, setSteg2Gyldig] = useState(false);
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
      header={{ heading: 'Opprett etterregistrering' }}
      width={steg === 2 || steg === 4 ? '900px' : 'medium'}
    >
      <Modal.Body>
        <VStack gap='space-16'>
          <Heading level='2' size='small'>
            {stegTittel}
          </Heading>

          {steg === 1 && (
            <ArbeidsgiverRadioGruppe
              arbeidsgivere={arbeidsgivere}
              laster={arbeidsgivereHook.isLoading}
              valgtOrgnr={valgtOrgnr}
              onValgtOrgnr={setValgtOrgnr}
            />
          )}

          <div hidden={steg !== 2}>
            <VStack gap='space-16'>
              <BodyLong>
                Fyll inn informasjonen som mangler om formidlingen til{' '}
                <strong>{valgtArbeidsgiver?.navn}</strong>.
              </BodyLong>
              <OpprettEtterregistreringSteg3
                ref={steg3Ref}
                onGyldigEndret={setSteg2Gyldig}
              />
            </VStack>
          </div>

          {steg === 3 && (
            <JobbsøkerVelger
              jobbsøkere={jobbsøkere}
              laster={jobbsøkereHook.isLoading}
              valgteFnr={valgteFnr}
              onToggle={toggleJobbsøker}
              søk={jobbsøkerSøk}
              onSøk={setJobbsøkerSøk}
              hjelpetekst={`Velg jobbsøkerne du vil etterregistrere som formidlet til ${valgtArbeidsgiver?.navn ?? ''}.`}
            />
          )}

          {steg === 4 && (
            <OpprettEtterregistreringOppsummering
              arbeidsgiver={valgtArbeidsgiver}
              jobbsøkere={valgteJobbsøkere}
              formVerdier={lagretFormVerdier}
              onFjernJobbsøker={(fnr) => {
                setValgteFnr((eks) => {
                  const nye = eks.filter((f) => f !== fnr);
                  if (nye.length === 0) setSteg(3);
                  return nye;
                });
              }}
            />
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

export default OpprettEtterregistreringFraTreffModal;
