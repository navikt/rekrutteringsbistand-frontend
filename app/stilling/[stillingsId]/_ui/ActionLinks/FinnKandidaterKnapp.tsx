import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { UmamiEvent } from '@/util/umamiEvents';

export interface FinnKandidaterKnappProps {
  stillingId: string;
}

export default function FinnKandidaterKnapp({
  stillingId,
}: FinnKandidaterKnappProps) {
  const href = `/stilling/${stillingId}/finn-kandidater`;

  return (
    <LenkeKortMedIkon
      tittel='Finn og foreslå jobbsøkere'
      beskrivelse='Se alle som leter etter jobb nå, og finn riktig person til jobben'
      ikon={'👉'}
      href={href}
      data-umami-event={UmamiEvent.Stilling.finn_kandidater_knapp}
    />
  );
}
