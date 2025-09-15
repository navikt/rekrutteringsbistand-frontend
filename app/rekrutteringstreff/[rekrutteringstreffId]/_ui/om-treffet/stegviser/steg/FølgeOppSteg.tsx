'use client';

import {
  SjekklisteContainer,
  SjekklisteInfoRad,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
import { useJobbsøkere } from '@/app/api/rekrutteringstreff/[...slug]/useJobbsøkere';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import IkkeOppmøteModal, {
  IkkeOppmøteInternalDto,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøkere/_ui/IkkeOppmøteModal';
import { useStegviser } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/om-treffet/stegviser/StegviserContext';
import { BodyShort, Button, Detail } from '@navikt/ds-react';
import { useRef, useState } from 'react';

export default function FølgeOppSteg() {
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

  const ikkeOppmøteModalRef = useRef<HTMLDialogElement>(null);
  const [ikkeOppmøteListe, setIkkeOppmøteListe] = useState<
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
          label='Arrangementets tiltidspunkt har passert'
        />

        <SjekklisteSeparator />

        <SjekklisteRad
          erOppfylt={antallUbestemt === 0}
          label='Alle jobbsøkere er registrert med møtt opp eller ikke møtt opp'
        />

        <SjekklisteInfoRad>
          <BodyShort size='small'>
            Møtt opp: <b>{antallMøttOpp}</b>
          </BodyShort>
        </SjekklisteInfoRad>
        <SjekklisteInfoRad>
          <BodyShort size='small'>
            Ikke møtt opp: <b>{antallIkkeMøttOpp}</b>
          </BodyShort>
        </SjekklisteInfoRad>
        <SjekklisteInfoRad>
          <BodyShort size='small'>
            Ikke bestemt ennå: <b>{antallUbestemt}</b>
          </BodyShort>
        </SjekklisteInfoRad>
        <SjekklisteInfoRad>
          <BodyShort size='small'>
            Ikke invitert: <b>{antallIkkeInvitert}</b>
          </BodyShort>
        </SjekklisteInfoRad>

        {antallUbestemt > 0 && (
          <div className='mt-2'>
            <Button
              size='small'
              onClick={åpneIkkeOppmøteForUregistrerte}
              disabled={uregistrerte.length === 0}
              className='w-full'
            >
              Registrer ikke oppmøte
            </Button>
          </div>
        )}
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
}
