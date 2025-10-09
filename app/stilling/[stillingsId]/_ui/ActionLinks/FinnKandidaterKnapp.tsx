import LenkeKortMedIkon from '@/components/felles/LenkeKortMedIkon';
import { UmamiEvent } from '@/components/umami/umamiEvents';
import { useUmami } from '@/providers/UmamiContext';

export interface FinnKandidaterKnappProps {
  stillingId: string;
}

export default function FinnKandidaterKnapp({
  stillingId,
}: FinnKandidaterKnappProps) {
  const { trackAndNavigate } = useUmami();
  const href = `/stilling/${stillingId}/finn-kandidater`;

  const navigate = () =>
    trackAndNavigate(UmamiEvent.Stilling.finn_kandidater_knapp, href);

  return (
    <LenkeKortMedIkon
      tittel='Finn og foreslå jobbsøkere'
      beskrivelse='Se alle som leter etter jobb nå, og finn riktig person til jobben'
      ikon={'👉'}
      onClick={navigate}
    />
  );
}
