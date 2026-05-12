'use client';

import { KandidatKilde } from '@/app/api/kandidat-sok/useKandidatNavn';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  RekrutteringstreffSokTreff,
  useRekrutteringstreffSok,
  Visning,
} from '@/app/api/rekrutteringstreff/sok/useRekrutteringstreffSok';
import {
  JobbsøkerStatus,
  RekrutteringstreffStatusLabel,
} from '@/app/rekrutteringstreff/_types/constants';
import ArbeidsgiverRadioGruppe from '@/app/rekrutteringstreff/_ui/etterregistrering/ArbeidsgiverRadioGruppe';
import JobbsøkerVelger from '@/app/rekrutteringstreff/_ui/etterregistrering/JobbsøkerVelger';
import { finnArbeidsgiverViaOrgnr } from '@/app/rekrutteringstreff/_utils/finnArbeidsgiverViaOrgnr';
import { applyArbeidsgiverTilForm } from '@/app/stilling/_ui/stilling-admin/admin_moduler/_felles/applyArbeidsgiver';
import { StillingAdminDTO } from '@/app/stilling/_ui/stilling-admin/page';
import {
  Alert,
  BodyShort,
  Button,
  Heading,
  Modal,
  UNSAFE_Combobox,
  VStack,
} from '@navikt/ds-react';
import { FC, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  åpen: boolean;
  onLukk: () => void;
}

type Steg = 1 | 2 | 3;

const KnyttTilRekrutteringstreffModal: FC<Props> = ({ åpen, onLukk }) => {
  const { setValue, getValues } = useFormContext<StillingAdminDTO>();

  const [steg, setSteg] = useState<Steg>(1);
  const [valgtTreffId, setValgtTreffId] = useState<string | null>(null);
  const [treffSøk, setTreffSøk] = useState('');
  const [valgtOrgnr, setValgtOrgnr] = useState<string | null>(null);
  const [valgteFnr, setValgteFnr] = useState<string[]>([]);
  const [jobbsøkerSøk, setJobbsøkerSøk] = useState('');
  const [lagrer, setLagrer] = useState(false);
  const [feil, setFeil] = useState<string | null>(null);

  const { data: sokRespons, isLoading: lasterTreff } = useRekrutteringstreffSok(
    {
      visning: Visning.ALLE,
      antallPerSide: 100,
    },
  );
  const treffliste = useMemo(() => sokRespons?.treff ?? [], [sokRespons]);

  const valgtTreff: RekrutteringstreffSokTreff | undefined = useMemo(
    () => treffliste.find((t) => t.id === valgtTreffId),
    [treffliste, valgtTreffId],
  );

  const arbeidsgivereHook = useRekrutteringstreffArbeidsgivere(
    valgtTreffId ?? '',
  );
  const jobbsøkereHook = useJobbsøkere(valgtTreffId ?? undefined);

  const arbeidsgivere = useMemo(
    () => (valgtTreffId ? (arbeidsgivereHook.data ?? []) : []),
    [arbeidsgivereHook.data, valgtTreffId],
  );

  const jobbsøkere = useMemo(
    () =>
      (jobbsøkereHook.data?.jobbsøkere ?? []).filter(
        (j) => j.status !== JobbsøkerStatus.SLETTET,
      ),
    [jobbsøkereHook.data],
  );

  const valgtArbeidsgiver = arbeidsgivere.find(
    (a) => a.organisasjonsnummer === valgtOrgnr,
  );

  const treffOptions = useMemo(() => {
    const q = treffSøk.trim().toLowerCase();
    const liste = q
      ? treffliste.filter((t) => t.tittel.toLowerCase().includes(q))
      : treffliste;
    return liste.slice(0, 50).map((t) => ({
      label: `${t.tittel} – ${RekrutteringstreffStatusLabel[t.status]}`,
      value: t.id,
    }));
  }, [treffliste, treffSøk]);

  const tilbakestill = () => {
    setSteg(1);
    setValgtTreffId(null);
    setTreffSøk('');
    setValgtOrgnr(null);
    setValgteFnr([]);
    setJobbsøkerSøk('');
    setFeil(null);
  };

  const lukk = () => {
    if (lagrer) return;
    tilbakestill();
    onLukk();
  };

  const toggleJobbsøker = (fnr: string) => {
    setValgteFnr((eks) =>
      eks.includes(fnr) ? eks.filter((f) => f !== fnr) : [...eks, fnr],
    );
  };

  const håndterFullfør = async () => {
    if (!valgtTreffId || !valgtArbeidsgiver?.organisasjonsnummer) return;
    setLagrer(true);
    setFeil(null);
    try {
      const pamArbeidsgiver = await finnArbeidsgiverViaOrgnr(
        valgtArbeidsgiver.organisasjonsnummer,
      );

      setValue('stillingsinfo.rekrutteringstreffId', valgtTreffId, {
        shouldDirty: true,
      });
      applyArbeidsgiverTilForm(pamArbeidsgiver, getValues, setValue);

      const valgteJobbsøkere = jobbsøkere.filter((j) =>
        valgteFnr.includes(j.fødselsnummer),
      );
      setValue(
        'formidlingKandidater',
        valgteJobbsøkere.map((j) => ({
          fnr: j.fødselsnummer,
          fornavn: j.fornavn ?? '',
          etternavn: j.etternavn ?? '',
          kilde: KandidatKilde.PDL,
        })),
        { shouldDirty: true },
      );

      tilbakestill();
      onLukk();
    } catch (error) {
      setFeil(
        error instanceof Error
          ? error.message
          : 'Kunne ikke knytte til rekrutteringstreff.',
      );
    } finally {
      setLagrer(false);
    }
  };

  const stegTittel =
    steg === 1
      ? 'Velg rekrutteringstreff (1 av 3)'
      : steg === 2
        ? 'Velg arbeidsgiver (2 av 3)'
        : 'Velg jobbsøkere (3 av 3)';

  const kanGåVidereFra1 = !!valgtTreffId;
  const kanGåVidereFra2 = !!valgtOrgnr;

  return (
    <Modal
      open={åpen}
      onClose={lukk}
      header={{ heading: 'Knytt til rekrutteringstreff' }}
      width='medium'
    >
      <Modal.Body>
        <VStack gap='space-16'>
          <Heading level='2' size='small'>
            {stegTittel}
          </Heading>

          {steg === 1 && (
            <VStack gap='space-8'>
              <BodyShort textColor='subtle'>
                Søk etter rekrutteringstreff du vil knytte denne
                etterregistreringen til.
              </BodyShort>
              <UNSAFE_Combobox
                label='Søk etter rekrutteringstreff'
                isLoading={lasterTreff}
                options={treffOptions}
                value={treffSøk}
                onChange={(value) => setTreffSøk(value ?? '')}
                shouldAutocomplete
                selectedOptions={
                  valgtTreff
                    ? [
                        {
                          label: `${valgtTreff.tittel} – ${RekrutteringstreffStatusLabel[valgtTreff.status]}`,
                          value: valgtTreff.id,
                        },
                      ]
                    : []
                }
                onToggleSelected={(value, isSelected) => {
                  if (isSelected) {
                    setValgtTreffId(value);
                    setTreffSøk('');
                    setValgtOrgnr(null);
                    setValgteFnr([]);
                  } else {
                    setValgtTreffId(null);
                  }
                }}
              />
            </VStack>
          )}

          {steg === 2 && (
            <ArbeidsgiverRadioGruppe
              arbeidsgivere={arbeidsgivere}
              laster={arbeidsgivereHook.isLoading}
              valgtOrgnr={valgtOrgnr}
              onValgtOrgnr={setValgtOrgnr}
            />
          )}

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

          {feil && <Alert variant='error'>{feil}</Alert>}
        </VStack>
      </Modal.Body>

      <Modal.Footer>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <Button variant='tertiary' disabled={lagrer} onClick={lukk}>
              Avbryt
            </Button>
            {steg > 1 && (
              <Button
                variant='tertiary'
                disabled={lagrer}
                onClick={() => setSteg((s) => (s === 3 ? 2 : 1))}
              >
                Tilbake
              </Button>
            )}
          </div>
          <div className='flex items-center gap-2'>
            {steg === 1 && (
              <Button disabled={!kanGåVidereFra1} onClick={() => setSteg(2)}>
                Neste
              </Button>
            )}
            {steg === 2 && (
              <Button disabled={!kanGåVidereFra2} onClick={() => setSteg(3)}>
                Neste
              </Button>
            )}
            {steg === 3 && (
              <Button loading={lagrer} onClick={håndterFullfør}>
                Knytt til treff
              </Button>
            )}
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default KnyttTilRekrutteringstreffModal;
