import LeggTilJobbsøkerKnapp from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/jobbsøker/LeggTilJobbsøkerKnapp';
import FigurMedForstørrelsesglass from '@/public/illustrasjoner/figur_med_forstørrelsesglass.svg';
import { BodyShort } from '@navikt/ds-react';
import Image from 'next/image';

export default function IngenJobbsøkereMelding() {
  return (
    <section className='flex flex-col items-center gap-4'>
      <Image
        src={FigurMedForstørrelsesglass}
        alt={'En figur med forstørrelsesglass i hånden'}
      />
      <BodyShort className='text-md'>
        Finn og legg til en jobbsøkere så dukker de opp her.
      </BodyShort>
      <LeggTilJobbsøkerKnapp />
    </section>
  );
}
