import type { Treffgjennomføringsoppsummering } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppsummering/lagOppsummering';
import { BodyShort, Box, HGrid, Heading, VStack } from '@navikt/ds-react';

interface NøkkeltallKortProps {
  etikett: string;
  verdi: number;
  forklaring?: string;
}

const NøkkeltallKort = ({
  etikett,
  verdi,
  forklaring,
}: NøkkeltallKortProps) => (
  <Box
    role='group'
    aria-label={`${etikett}: ${verdi}`}
    background='neutral-soft'
    borderRadius='8'
    padding='space-16'
    className='h-full'
  >
    <VStack gap='space-2'>
      <BodyShort as='span' className='text-3xl font-semibold'>
        {verdi}
      </BodyShort>
      <BodyShort weight='semibold'>{etikett}</BodyShort>
      {forklaring && <BodyShort size='small'>{forklaring}</BodyShort>}
    </VStack>
  </Box>
);

export default function OppsummeringNøkkeltall({
  oppsummering,
}: {
  oppsummering: Treffgjennomføringsoppsummering;
}) {
  return (
    <section aria-labelledby='workop-oppsummering-nokkeltall-heading'>
      <Heading
        id='workop-oppsummering-nokkeltall-heading'
        level='4'
        size='xsmall'
        spacing
      >
        Nøkkeltall
      </Heading>
      <HGrid columns={{ xs: 1, sm: 2, lg: 4 }} gap='space-16'>
        <NøkkeltallKort
          etikett='Aktuelle kandidater'
          verdi={oppsummering.aktuelle}
          forklaring='Aktuell hos minst én arbeidsgiver'
        />
        <NøkkeltallKort
          etikett='Til andre intervju'
          verdi={oppsummering.avtaltIntervju}
        />
        <NøkkeltallKort etikett='Kanskje' verdi={oppsummering.kanskje} />
        <NøkkeltallKort
          etikett='Ikke aktuelle'
          verdi={oppsummering.ikkeAktuelle}
        />
        <NøkkeltallKort
          etikett='Ikke vurdert'
          verdi={oppsummering.ikkeVurdert}
          forklaring='Registrert, men uten vurdering'
        />
        <NøkkeltallKort etikett='Formidlet' verdi={oppsummering.formidlet} />
        <NøkkeltallKort
          etikett='Møtt'
          verdi={oppsummering.antallMøtt}
          forklaring={`Av ${oppsummering.antallPåmeldte} påmeldte`}
        />
        <NøkkeltallKort
          etikett='Intervjuer'
          verdi={oppsummering.antallIntervjuer}
          forklaring={`Fordelt på ${oppsummering.antallArbeidsgivere} arbeidsgivere`}
        />
      </HGrid>
    </section>
  );
}
