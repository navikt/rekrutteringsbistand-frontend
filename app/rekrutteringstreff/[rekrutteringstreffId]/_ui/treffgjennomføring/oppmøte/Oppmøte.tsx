'use client';
import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import { oppdaterOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import {
  tellRegistreringer,
  harRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';
import { RekrutteringstreffTabs } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/Rekrutteringstreff';
import {
  lagNavnvisning,
  sorterPåDeltakernummer,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import type {
  StegBasisProps,
  StegLagringProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import DeltakendeArbeidsgivere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/DeltakendeArbeidsgivere';
import FremmøtteJobbsøkere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/FremmøtteJobbsøkere';
import { OppmøteBlokkert } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/OppmøteBlokkert';
import { Button, HGrid, LocalAlert, VStack } from '@navikt/ds-react';
import { useQueryState } from 'nuqs';
import { FC, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps & {
    jobbsøkereData: JobbsøkereResponseDTO;
    onNeste: () => void;
    nesteknappTekst: string;
  };

const Oppmøte: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  jobbsøkereData,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  onNeste,
  nesteknappTekst,
}) => {
  const [, setFane] = useQueryState('visFane', {
    defaultValue: RekrutteringstreffTabs.OM_TREFFET,
    clearOnDefault: true,
  });

  const oppmøtteJobbsøkere = sorterPåDeltakernummer(
    jobbsøkereData.jobbsøkere.filter((jobbsøker) =>
      treffgjennomføring.oppmøte.includes(jobbsøker.personTreffId),
    ),
    treffgjennomføring,
  );
  const visNavn = lagNavnvisning(treffgjennomføring);
  const antallMøtt = treffgjennomføring.oppmøte.length;
  const antallPåmeldte = jobbsøkereData.totalt;

  const [feil, setFeil] = useState<string | null>(null);
  const [personTreffIdSomFjernes, setPersonTreffIdSomFjernes] = useState<
    string | null
  >(null);
  const [blokkert, setBlokkert] = useState<{
    navn: string;
    registreringer: Treffgjennomføringsregistreringer;
  } | null>(null);

  useRapporterLagringsstatus(
    personTreffIdSomFjernes !== null,
    onLagringsstatusEndret,
  );

  const fjernOppmøte = async (personTreffId: string) => {
    setFeil(null);
    setPersonTreffIdSomFjernes(personTreffId);
    try {
      const oppdatertTreffgjennomføring = await oppdaterOppmøte(
        rekrutteringstreffId,
        personTreffId,
        false,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
    } catch {
      setFeil('Kunne ikke fjerne oppmøtet. Prøv igjen.');
    } finally {
      setPersonTreffIdSomFjernes(null);
    }
  };

  const startFjernOppmøte = (personTreffId: string, navn: string) => {
    const registreringer = tellRegistreringer(
      treffgjennomføring,
      personTreffId,
    );
    if (harRegistreringer(registreringer)) {
      setBlokkert({ navn, registreringer });
      return;
    }
    void fjernOppmøte(personTreffId);
  };

  return (
    <VStack gap='space-32'>
      <Stegnavigasjon>
        <Button
          type='button'
          onClick={onNeste}
          disabled={antallMøtt === 0 || arbeidsgivere.length === 0}
        >
          {nesteknappTekst}
        </Button>
      </Stegnavigasjon>

      <HGrid columns={{ xs: 1, lg: 2 }} gap='space-24'>
        <FremmøtteJobbsøkere
          jobbsøkere={oppmøtteJobbsøkere}
          antallMøtt={antallMøtt}
          antallPåmeldte={antallPåmeldte}
          visNavn={visNavn}
          personTreffIdSomFjernes={personTreffIdSomFjernes}
          onFjernOppmøte={startFjernOppmøte}
          onGåTilJobbsøkere={() => setFane(RekrutteringstreffTabs.JOBBSØKERE)}
        />
        <DeltakendeArbeidsgivere arbeidsgivere={arbeidsgivere} />
      </HGrid>

      {feil && (
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>{feil}</LocalAlert.Content>
        </LocalAlert>
      )}

      <OppmøteBlokkert
        åpen={blokkert !== null}
        omtale={blokkert?.navn ?? ''}
        registreringer={
          blokkert?.registreringer ?? { interesser: 0, vurderinger: 0 }
        }
        onLukk={() => setBlokkert(null)}
      />
    </VStack>
  );
};

export default Oppmøte;
