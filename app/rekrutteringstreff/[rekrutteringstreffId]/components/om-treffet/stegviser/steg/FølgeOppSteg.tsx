'use client';

import IkkeOppmøteModal, {
  IkkeOppmøteInternalDto,
} from '../../../jobbsøkere/components/IkkeOppmøteModal';
import { useStegviser } from '../StegviserContext';
import {
  SjekklisteContainer,
  SjekklisteInfoRad,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { BodyShort, Detail } from '@navikt/ds-react';
import * as React from 'react';

const FølgeOppSteg: React.FC = () => {
  const {
    tiltidspunktHarPassert,
    antallMøttOpp,
    antallIkkeMøttOpp,
    antallUbestemt,
    uregistrerte,
    antallIkkeInvitert,
  } = useStegviser();

  const { rekrutteringstreffId } = useRekrutteringstreffContext();
  const jobbsøkerHook = useJobbsøkere(rekrutteringstreffId);

  const ikkeOppmøteModalRef = React.useRef<HTMLDialogElement>(null);
  const [ikkeOppmøteListe, setIkkeOppmøteListe] = React.useState<
    IkkeOppmøteInternalDto[]
  >([]);

  const åpneIkkeOppmøteForUregistrerte = () => {
    if (uregistrerte.length === 0) return;
    const liste: IkkeOppmøteInternalDto[] = uregistrerte.map((j) => ({
      personTreffId: j.personTreffId,
      fornavn: j.fornavn,
      etternavn: j.etternavn,
      fødselsnummer: j.fødselsnummer,
      veilederNavIdent: j.veilederNavIdent,
    }));
    setIkkeOppmøteListe(liste);
    ikkeOppmøteModalRef.current?.showModal();
  };

  const onIkkeOppmøteSendt = () => {
    ikkeOppmøteModalRef.current?.close();
    setIkkeOppmøteListe([]);
    jobbsøkerHook.mutate();
  };

  return (
    <div className='flex-1'>
      <Detail spacing>
        Her kan du følge opp påmeldte og gjennomføre treffet.
      </Detail>

      <SjekklisteContainer>
        <SjekklisteSeparator />

        <SjekklisteRad
          erOppfylt={tiltidspunktHarPassert}
          kanKlikkes={false}
          onClick={() => {}}
          label='Arrangementets tiltidspunkt har passert'
          ariaLabel='Arrangementets tiltidspunkt har passert'
        />

        <SjekklisteSeparator />

        <SjekklisteInfoRad>
          <BodyShort>
            Møtt opp: <b>{antallMøttOpp}</b>
          </BodyShort>
        </SjekklisteInfoRad>
        <SjekklisteInfoRad>
          <BodyShort>
            Ikke møtt opp: <b>{antallIkkeMøttOpp}</b>
          </BodyShort>
        </SjekklisteInfoRad>
        <SjekklisteInfoRad>
          <BodyShort>
            Ikke bestemt ennå: <b>{antallUbestemt}</b>
          </BodyShort>
        </SjekklisteInfoRad>
        <SjekklisteInfoRad>
          <BodyShort>
            Ikke invitert: <b>{antallIkkeInvitert}</b>
          </BodyShort>
        </SjekklisteInfoRad>

        <SjekklisteSeparator />

        <SjekklisteRad
          erOppfylt={antallUbestemt === 0}
          kanKlikkes={antallUbestemt > 0}
          onClick={åpneIkkeOppmøteForUregistrerte}
          label='Alle jobbsøkere er registrert med møtt opp eller ikke møtt opp'
          handlingstekst={
            antallUbestemt > 0 ? 'Registrer ikke oppmøte' : undefined
          }
          ariaLabel='Alle jobbsøkere er registrert med møtt opp eller ikke møtt opp'
        />
      </SjekklisteContainer>

      <IkkeOppmøteModal
        modalref={ikkeOppmøteModalRef}
        ikkeOppmøteInternalDtoer={ikkeOppmøteListe}
        onFjernJobbsøker={(fnr) =>
          setIkkeOppmøteListe((prev) =>
            prev.filter((p) => p.fødselsnummer !== fnr),
          )
        }
        onIkkeOppmøteSendt={onIkkeOppmøteSendt}
      />
    </div>
  );
};

export default FølgeOppSteg;
