import LenkeKortMedIkon from '@/components/lenke-kort/LenkeKortMedIkon';
import { UmamiEvent } from '@/util/umamiEvents';

type FinnJobbsøkereKnappProps =
  | { stillingId: string; rekrutteringstreffId?: never }
  | { rekrutteringstreffId: string; stillingId?: never };

export default function FinnJobbsøkereKnapp(id: FinnJobbsøkereKnappProps) {
  let umamiEvent = null;
  let href = '';

  if ('stillingId' in id) {
    umamiEvent = UmamiEvent.Stilling.finn_kandidater_knapp;
    href = `/stilling/${id.stillingId}/finn-kandidater`;
  } else if ('rekrutteringstreffId' in id) {
    umamiEvent = UmamiEvent.Rekrutteringstreff.finn_jobbsøkere_knapp;
    href = `/rekrutteringstreff/${id.rekrutteringstreffId}/finn-kandidater`;
  }

  return (
    <LenkeKortMedIkon
      tittel='Finn og foreslå jobbsøkere'
      beskrivelse='Se alle som leter etter jobb nå, og finn riktig person til jobben'
      ikon={'👉'}
      href={href}
      data-umami-event={umamiEvent}
    />
  );
}
