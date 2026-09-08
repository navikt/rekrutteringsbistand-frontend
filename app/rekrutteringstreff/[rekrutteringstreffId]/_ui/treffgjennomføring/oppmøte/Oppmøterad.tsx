import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import {
  harRegistreringer,
  type Treffgjennomføringsregistreringer,
} from '@/app/api/rekrutteringstreff/[...slug]/treffgjennomføring/registreringer';
import { beskrivRegistreringer } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/beskrivRegistreringer';
import { AvkortetTekst } from '@/components/AvkortetTekst';
import { BodyShort, Box, Checkbox, HStack, Tooltip } from '@navikt/ds-react';
import { useId } from 'react';

interface Props {
  jobbsøker: JobbsøkerDTO;
  navn: string;
  erMøtt: boolean;
  registreringer: Treffgjennomføringsregistreringer;
  venter: boolean;
  deaktivert: boolean;
  feil: string | null;
  onToggleOppmøte: (skalMøte: boolean) => void;
}

export default function Oppmøterad({
  jobbsøker,
  navn,
  erMøtt,
  registreringer,
  venter,
  deaktivert,
  feil,
  onToggleOppmøte,
}: Props) {
  const feilId = useId();
  const erLåst = erMøtt && harRegistreringer(registreringer);
  const forklaring = erLåst
    ? `Kan ikke fjerne oppmøte fordi jobbsøkeren har ${beskrivRegistreringer(registreringer).join(' og ')}. Nullstill disse først.`
    : null;
  const avkrysning = (
    <Checkbox
      hideLabel
      checked={erMøtt}
      disabled={erLåst || deaktivert}
      onChange={(event) => onToggleOppmøte(event.target.checked)}
      aria-label={
        forklaring
          ? `${navn} har oppmøte registrert. ${forklaring}`
          : venter
            ? `Lagrer oppmøte for ${navn}`
            : `Registrer oppmøte for ${navn}`
      }
      aria-invalid={Boolean(feil)}
      aria-describedby={feil ? feilId : undefined}
    >
      {forklaring ?? `Registrer oppmøte for ${navn}`}
    </Checkbox>
  );

  return (
    <Box as='li' background='neutral-softA' padding='space-6' borderRadius='8'>
      <HStack align='center' justify='space-between' gap='space-8' wrap={false}>
        <div className='min-w-0'>
          <BodyShort weight='semibold'>
            <AvkortetTekst>{navn}</AvkortetTekst>
          </BodyShort>
          <BodyShort size='small' className='text-text-subtle'>
            f.nr. {jobbsøker.fødselsnummer}
          </BodyShort>
          {feil && (
            <BodyShort
              id={feilId}
              size='small'
              className='text-(--ax-text-danger)'
            >
              {feil}
            </BodyShort>
          )}
        </div>
        <Box paddingInline='space-0 space-8' className='shrink-0'>
          {forklaring ? (
            <Tooltip content={forklaring}>
              <span tabIndex={0} className='inline-flex'>
                {avkrysning}
              </span>
            </Tooltip>
          ) : (
            avkrysning
          )}
        </Box>
      </HStack>
    </Box>
  );
}
