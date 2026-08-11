'use client';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { settOppMøteplan } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/mutations';
import type { TreffgjennomforingDTO } from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomforing/useTreffgjennomforing';
import MøteoppsettFelter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/MøteoppsettFelter';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/Stegnavigasjon';
import {
  MøteoppsettFormSchema,
  tilFormValues,
  type MøteoppsettFormValues,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/møteoppsettSkjema';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useRapporterLagringsstatus';
import type { TreffgjennomforingOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomforing/useTreffgjennomforingFane';
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

interface Props {
  rekrutteringstreffId: string;
  treffgjennomforing: TreffgjennomforingDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  onTreffgjennomforingOppdatert: TreffgjennomforingOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  onTilbake: () => void;
}

const Møteoppsett: FC<Props> = ({
  rekrutteringstreffId,
  treffgjennomforing,
  arbeidsgivere,
  onTreffgjennomforingOppdatert,
  onLagringsstatusEndret,
  onTilbake,
}) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<MøteoppsettFormValues>({
    resolver: zodResolver(MøteoppsettFormSchema),
    defaultValues: tilFormValues(treffgjennomforing),
  });
  const [feil, setFeil] = useState<string | null>(null);
  const antallMøtt = treffgjennomforing.oppmøte.length;

  useRapporterLagringsstatus(isSubmitting, onLagringsstatusEndret);

  const opprettMøteplan = async (verdier: MøteoppsettFormValues) => {
    setFeil(null);
    try {
      const oppdatertTreffgjennomforing = await settOppMøteplan(
        rekrutteringstreffId,
        verdier,
      );
      await onTreffgjennomforingOppdatert(oppdatertTreffgjennomforing);
    } catch {
      setFeil('Kunne ikke opprette møteplanen. Prøv igjen.');
    }
  };

  return (
    <section aria-labelledby='treffgjennomforing-møteoppsett-heading'>
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
              disabled={antallMøtt === 0 || arbeidsgivere.length === 0}
            >
              Opprett møteplan
            </Button>
          </Stegnavigasjon>

          <Heading
            id='treffgjennomforing-møteoppsett-heading'
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

          <MøteoppsettFelter register={register} errors={errors} />

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
