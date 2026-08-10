'use client';
import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { settOppMøteplan } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/mutations';
import type { MøtedagDTO } from '@/app/api/rekrutteringstreff/[...slug]/møtedag/useMøtedag';
import MøteoppsettFelter from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/MøteoppsettFelter';
import Stegnavigasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/Stegnavigasjon';
import {
  MøteoppsettFormSchema,
  tilFormValues,
  type MøteoppsettFormValues,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/møteoppsettSkjema';
import type { MøtedagOppdatering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useMøtedagFane';
import { useRapporterLagringsstatus } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/møtedag/useRapporterLagringsstatus';
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
  møtedag: MøtedagDTO;
  arbeidsgivere: ArbeidsgiverDTO[];
  onMøtedagOppdatert: MøtedagOppdatering;
  onLagringsstatusEndret: (lagrer: boolean) => void;
  onTilbake: () => void;
}

const Møteoppsett: FC<Props> = ({
  rekrutteringstreffId,
  møtedag,
  arbeidsgivere,
  onMøtedagOppdatert,
  onLagringsstatusEndret,
  onTilbake,
}) => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<MøteoppsettFormValues>({
    resolver: zodResolver(MøteoppsettFormSchema),
    defaultValues: tilFormValues(møtedag),
  });
  const [feil, setFeil] = useState<string | null>(null);
  const antallMøtt = møtedag.oppmøte.length;

  useRapporterLagringsstatus(isSubmitting, onLagringsstatusEndret);

  const opprettMøteplan = async (verdier: MøteoppsettFormValues) => {
    setFeil(null);
    try {
      const oppdatertMøtedag = await settOppMøteplan(
        rekrutteringstreffId,
        verdier,
      );
      await onMøtedagOppdatert(oppdatertMøtedag);
    } catch {
      setFeil('Kunne ikke opprette møteplanen. Prøv igjen.');
    }
  };

  return (
    <section aria-labelledby='møtedag-møteoppsett-heading'>
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

          <Heading id='møtedag-møteoppsett-heading' level='3' size='small'>
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
