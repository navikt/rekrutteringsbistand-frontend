'use client';
import { settOppMøteplan } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/mutations';
import type {
  StegBasisProps,
  StegLagringProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/useRapporterLagringsstatus';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/Stegnavigasjon';
import MøteoppsettFelter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/MøteoppsettFelter';
import {
  MøteoppsettFormSchema,
  tilMøteoppsettSkjemaverdier,
  type MøteoppsettSkjemaverdier,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/møteoppsettSkjema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BodyShort,
  Button,
  Heading,
  LocalAlert,
  VStack,
} from '@navikt/ds-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = StegBasisProps &
  StegLagringProps & {
    onTilbake: () => void;
  };

const Møteoppsett: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomføring,
  arbeidsgivere,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  onTilbake,
}) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<MøteoppsettSkjemaverdier>({
    resolver: zodResolver(MøteoppsettFormSchema),
    defaultValues: tilMøteoppsettSkjemaverdier(treffgjennomføring),
  });
  const [feil, setFeil] = useState<string | null>(null);
  const antallMøtt = treffgjennomføring.oppmøte.length;

  useRapporterLagringsstatus(isSubmitting, onLagringsstatusEndret);

  const opprettMøteplan = async (verdier: MøteoppsettSkjemaverdier) => {
    setFeil(null);
    try {
      const oppdatertTreffgjennomføring = await settOppMøteplan(
        rekrutteringstreffId,
        verdier,
      );
      await onTreffgjennomføringOppdatert(oppdatertTreffgjennomføring);
    } catch {
      setFeil('Kunne ikke opprette møteplanen. Prøv igjen.');
    }
  };

  return (
    <section aria-labelledby='treffgjennomføring-møteoppsett-heading'>
      <form onSubmit={handleSubmit(opprettMøteplan)} noValidate>
        <VStack gap='space-16'>
          <Stegnavigasjon>
            <Button
              type='button'
              variant='secondary'
              disabled={isSubmitting}
              onClick={onTilbake}
            >
              Tilbake
            </Button>
            <Button
              type='submit'
              loading={isSubmitting}
              disabled={
                isSubmitting || antallMøtt === 0 || arbeidsgivere.length === 0
              }
            >
              Opprett møteplan
            </Button>
          </Stegnavigasjon>

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

          {feil && (
            <LocalAlert as='div' status='error'>
              <LocalAlert.Content>{feil}</LocalAlert.Content>
            </LocalAlert>
          )}
        </VStack>
      </form>
    </section>
  );
};

export default Møteoppsett;
