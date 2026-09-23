'use client';
import Feilvarsel from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/Feilvarsel';
import type {
  StegBasisProps,
  StegLagringProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import MøteoppsettFelter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/MøteoppsettFelter';
import { useMøteoppsettSkjema } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/useMøteoppsettSkjema';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { FC } from 'react';

type Props = StegBasisProps &
  StegLagringProps & {
    onTilbake: () => void;
  };

const Møteoppsett: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  oppdatering,
  onLagringsstatusEndret,
  onTilbake,
}) => {
  const { skjema, feil, lagre } = useMøteoppsettSkjema({
    rekrutteringstreffId,
    treffgjennomføring,
    oppdatering,
    onLagringsstatusEndret,
    feilmelding: 'Kunne ikke opprette møteplanen. Prøv igjen.',
  });
  const {
    formState: { errors, isSubmitting },
    register,
  } = skjema;
  const antallMøtt = treffgjennomføring.oppmøte.length;

  return (
    <section aria-labelledby='treffgjennomføring-møteoppsett-heading'>
      <form onSubmit={(hendelse) => void lagre(hendelse)} noValidate>
        <VStack gap='space-16'>
          <Stegnavigasjon
            tilbake={{ onClick: onTilbake, deaktivert: isSubmitting }}
            neste={{
              type: 'submit',
              tekst: 'Opprett møteplan',
              laster: isSubmitting,
              deaktivert:
                isSubmitting || antallMøtt === 0 || arbeidsgivere.length === 0,
            }}
          />

          <Heading
            id='treffgjennomføring-møteoppsett-heading'
            level='3'
            size='small'
          >
            Møteoppsett
          </Heading>

          <BodyShort>
            Møteplanen setter opp ett rom per arbeidsgiver, og fordeler de{' '}
            {antallMøtt} fremmøtte jobbsøkerne på{' '}
            {Math.max(arbeidsgivere.length, 1)} rom.
          </BodyShort>

          <MøteoppsettFelter
            register={register}
            errors={errors}
            deaktivert={isSubmitting}
          />

          {feil && <Feilvarsel>{feil}</Feilvarsel>}
        </VStack>
      </form>
    </section>
  );
};

export default Møteoppsett;
