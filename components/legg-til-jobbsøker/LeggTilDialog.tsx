import { leggTilKandidater } from '@/app/api/kandidat-sok/leggTilKandidat';
import { formidleUsynligKandidat } from '@/app/api/kandidat/formidleKandidat';
import {
  opprettJobbsøkere,
  type OpprettJobbsøkereDTO,
} from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/mutations';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { useNullableRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { LeggTilJobbsøkerType } from '@/components/legg-til-jobbsøker/LeggTilJobbsøker';
import LeggTilKandidater, {
  ValgtKandidatProp,
} from '@/components/legg-til-jobbsøker/legg-til/LeggTilKandidater';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { useUmami } from '@/providers/UmamiContext';
import { RekbisError } from '@/util/rekbisError';
import { UmamiEvent } from '@/util/umamiEvents';
import { Button, Checkbox, Dialog } from '@navikt/ds-react';
import { Fragment, useState } from 'react';

export default function LeggTilDialog({
  type,
}: {
  type: LeggTilJobbsøkerType;
}) {
  const { track } = useUmami();
  const stilling = useNullableStillingsContext();
  const rekrutteringstreff = useNullableRekrutteringstreffContext();
  const { valgtNavKontor, brukerData, visVarsel } = useApplikasjonContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreff?.rekrutteringstreffId);

  const [valgteKandidater, setValgteKandidater] = useState<ValgtKandidatProp[]>(
    [],
  );
  const [laster, setLaster] = useState(false);
  const [bekreftet, setBekreftet] = useState(false);

  const erRekrutteringstreff = type === LeggTilJobbsøkerType.Rekrutteringstreff;

  const leggTilIStilling = async () => {
    const kandidatlisteId = stilling?.kandidatlisteInfo?.kandidatlisteId;
    const stillingsId = stilling?.stillingsId;
    if (!kandidatlisteId || !stillingsId) return;

    if (stilling?.omStilling.erFormidling) {
      for (const kandidat of valgteKandidater) {
        await formidleUsynligKandidat(kandidatlisteId, {
          fnr: kandidat.fødselsnummer,
          fåttJobb: true,
          navKontor: valgtNavKontor?.navKontor ?? '',
          stillingsId,
        });
      }
    } else {
      const usynligFåttJobben = valgteKandidater.filter(
        (k) => k.aktørId === null,
      );
      const synligeKandidater = valgteKandidater
        .map((kandidat) => kandidat.aktørId)
        .filter((aktørId) => aktørId !== undefined && aktørId !== null);

      await leggTilKandidater(synligeKandidater, stillingsId);

      for (const kandidat of usynligFåttJobben) {
        await formidleUsynligKandidat(kandidatlisteId, {
          fnr: kandidat.fødselsnummer,
          fåttJobb: true,
          navKontor: valgtNavKontor?.navKontor ?? '',
          stillingsId,
        });
      }
    }

    track(UmamiEvent.Stilling.legg_til_kandidat, {
      antall: valgteKandidater.length,
    });

    visVarsel({
      tekst: 'Jobbsøkere ble lagt til i stillingen',
      type: 'success',
    });
    stilling?.refetchKandidatlisteInfo?.();
  };

  const leggTilIRekrutteringstreff = async () => {
    const rekrutteringstreffId = rekrutteringstreff?.rekrutteringstreffId;
    if (!rekrutteringstreffId) return;

    const lagtTilAvNavn =
      [brukerData.fornavn, brukerData.etternavn]
        .filter(Boolean)
        .join(' ')
        .trim() || null;

    const dto: OpprettJobbsøkereDTO = valgteKandidater.map((kandidat) => ({
      fødselsnummer: kandidat.fødselsnummer,
      fornavn: kandidat.fornavn ?? null,
      etternavn: kandidat.etternavn ?? null,
      lagtTilAvNavn,
    }));

    await opprettJobbsøkere(rekrutteringstreffId, dto);
    await jobbsøkerHook.mutate();

    visVarsel({
      tekst: 'Jobbsøkere ble lagt til i rekrutteringstreffet',
      type: 'success',
    });
  };

  const onLeggTil = async () => {
    if (valgteKandidater.length === 0) return;
    setLaster(true);
    try {
      if (erRekrutteringstreff) {
        await leggTilIRekrutteringstreff();
      } else {
        await leggTilIStilling();
      }
      setValgteKandidater([]);
      setBekreftet(false);
    } catch (error) {
      visVarsel({
        tekst: 'Noe gikk galt ved lagring av jobbsøkere',
        type: 'error',
      });
      throw new RekbisError({
        message: 'Feil ved legg til jobbsøkere',
        error,
      });
    } finally {
      setLaster(false);
    }
  };

  const tittel = erRekrutteringstreff
    ? 'Legg til jobbsøkere'
    : `Legg til jobbsøkere til ${stilling?.stillingsTittel ?? ''}`;

  const kandidaterType = erRekrutteringstreff
    ? LeggTilJobbsøkerType.Rekrutteringstreff
    : stilling?.omStilling.erFormidling
      ? LeggTilJobbsøkerType.Etterregistrering
      : LeggTilJobbsøkerType.Stilling;

  return (
    <Fragment>
      <Dialog.Header>
        <Dialog.Title>{tittel}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <LeggTilKandidater
          type={kandidaterType}
          callBack={setValgteKandidater}
        />
        {valgteKandidater.length > 0 && (
          <Checkbox
            className='mt-6'
            checked={bekreftet}
            onChange={(e) => setBekreftet(e.target.checked)}
          >
            Jeg bekrefter at jeg har vært i dialog med jobbsøker eller
            jobbsøkers veileder i forbindelse med rekrutteringen.
          </Checkbox>
        )}
      </Dialog.Body>
      <Dialog.Footer>
        <Button
          disabled={valgteKandidater.length === 0 || !bekreftet}
          onClick={onLeggTil}
          loading={laster}
        >
          Legg til jobbsøker
        </Button>
        <Dialog.CloseTrigger>
          <Button variant='secondary'>Avbryt</Button>
        </Dialog.CloseTrigger>
      </Dialog.Footer>
    </Fragment>
  );
}
