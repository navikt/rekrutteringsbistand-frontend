import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { UmamiEvent } from '@/util/umamiEvents';

type FinnJobbsøkereKnappProps =
  | { stillingId: string }
  | { rekrutteringstreffId: string };

export default function FinnJobbsøkereKnapp(id: FinnJobbsøkereKnappProps) {
  const href = () => {
    if ('stillingId' in id) {
      return `/stilling/${id.stillingId}/finn-kandidater`;
    } else if ('rekrutteringstreffId' in id) {
      return `/rekrutteringstreff/${id.rekrutteringstreffId}/finn-kandidater`;
    } else {
      return '';
    }
  };

  return (
    <LenkeKortMedIkon
      tittel='Finn og foreslå jobbsøkere'
      beskrivelse='Se alle som leter etter jobb nå, og finn riktig person til jobben'
      ikon={'👉'}
      href={href()}
      data-umami-event={UmamiEvent.Stilling.finn_kandidater_knapp}
    />
  );
}
