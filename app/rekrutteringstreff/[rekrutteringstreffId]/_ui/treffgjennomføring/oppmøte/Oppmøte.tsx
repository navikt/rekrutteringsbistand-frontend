'use client';
import { useJobbsøkereForOppmøte } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForOppmøte';
import DatagrunnlagFeil from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/DatagrunnlagFeil';
import { lagNavnvisning } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/deltakernavn';
import type {
  StegBasisProps,
  StegLagringProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import DeltakendeArbeidsgivere from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/DeltakendeArbeidsgivere';
import Oppmøteliste from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/Oppmøteliste';
import { useOppmøteAutolagring } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/useOppmøteAutolagring';
import SWRLaster from '@/components/SWRLaster';
import { Button, HGrid, LocalAlert, VStack } from '@navikt/ds-react';
import { FC, useState } from 'react';

type Props = StegBasisProps &
  StegLagringProps & {
    onNeste: () => void;
    nesteknappTekst: string;
  };

const Oppmøte: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  onNeste,
  nesteknappTekst,
}) => {
  const [side, setSide] = useState(1);
  const jobbsøkereHook = useJobbsøkereForOppmøte(rekrutteringstreffId, side);
  const {
    treffgjennomføringForVisning,
    erOppmøteVentende,
    feilForOppmøte,
    harLagringsfeil,
    harVentendeLagring,
    statusmelding,
    lagreOppmøte,
    ventTilLagringerErFerdige,
  } = useOppmøteAutolagring({
    rekrutteringstreffId,
    treffgjennomføring,
    onTreffgjennomføringOppdatert,
  });

  const [gårVidere, setGårVidere] = useState(false);
  const visNavn = lagNavnvisning(treffgjennomføringForVisning);

  const antallMøtt = treffgjennomføringForVisning.oppmøte.length;

  useRapporterLagringsstatus(
    harVentendeLagring || gårVidere,
    onLagringsstatusEndret,
  );

  const gåVidere = async () => {
    setGårVidere(true);
    const alleLagret = await ventTilLagringerErFerdige();
    if (!alleLagret) {
      setGårVidere(false);
      return;
    }
    setGårVidere(false);
    onNeste();
  };

  return (
    <VStack gap='space-32'>
      <Stegnavigasjon>
        <Button
          type='button'
          onClick={() => void gåVidere()}
          disabled={
            antallMøtt === 0 ||
            arbeidsgivere.length === 0 ||
            harVentendeLagring ||
            gårVidere
          }
          loading={gårVidere}
        >
          {nesteknappTekst}
        </Button>
      </Stegnavigasjon>

      <HGrid columns={{ xs: 1, lg: 2 }} gap='space-24'>
        <SWRLaster
          hooks={[jobbsøkereHook]}
          egenFeilmelding={() => (
            <DatagrunnlagFeil
              henter={jobbsøkereHook.isValidating}
              onHentPåNytt={() => void jobbsøkereHook.mutate()}
            />
          )}
        >
          {(data) => (
            <Oppmøteliste
              jobbsøkere={data.jobbsøkere}
              side={data.side}
              onSidebytte={setSide}
              treffgjennomføring={treffgjennomføringForVisning}
              antallMøtt={antallMøtt}
              antallPåmeldte={data.totalt}
              visNavn={visNavn}
              lagrer={harVentendeLagring || gårVidere}
              feil={harLagringsfeil}
              statusmelding={statusmelding}
              deaktivert={gårVidere}
              erOppmøteVentende={erOppmøteVentende}
              feilForOppmøte={feilForOppmøte}
              onToggleOppmøte={(personTreffId, navn, skalMøte) =>
                lagreOppmøte(personTreffId, skalMøte, navn)
              }
            />
          )}
        </SWRLaster>
        <DeltakendeArbeidsgivere arbeidsgivere={arbeidsgivere} />
      </HGrid>

      {harLagringsfeil && (
        <LocalAlert as='div' status='error'>
          <LocalAlert.Content>
            Én eller flere oppmøteendringer kunne ikke bekreftes. Se meldingene
            ved de berørte jobbsøkerne og kontroller oppmøtet.
          </LocalAlert.Content>
        </LocalAlert>
      )}
    </VStack>
  );
};

export default Oppmøte;
