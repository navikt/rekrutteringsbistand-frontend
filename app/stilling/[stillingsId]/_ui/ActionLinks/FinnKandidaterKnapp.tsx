import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { useUmami } from '@/providers/UmamiContext';
import { UmamiEvent } from '@/util/umamiEvents';

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
