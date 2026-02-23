import { useJobbsøkerContext } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/JobbsøkerContext';
import { LeggTilKnappType } from '@/app/kandidat/[kandidatNr]/jobbsøker-visning/VisJobbsøker';
import LagreIKandidatlisteButton from '@/app/kandidat/_ui/lagreKandidatliste/LagreIKandidatlisteButton';
import LagreIRekrutteringstreffKnapp from '@/app/rekrutteringstreff/[rekrutteringstreffId]/finn-kandidater/_ui/lagre-i-rekrutteringstreff/LagreIRekrutteringstreffKnapp';
import { useNullableRekrutteringstreffContext } from '@/app/rekrutteringstreff/_providers/RekrutteringstreffContext';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';

export interface LeggTilKandidatKnappProps {
  leggTilKnapp?: LeggTilKnappType;
  kandidatId: string;
}

export default function LeggTilKandidatKnapp({
  leggTilKnapp,
  kandidatId,
}: LeggTilKandidatKnappProps) {
  const stillingData = useNullableStillingsContext();
  const rekrutteringstreffData = useNullableRekrutteringstreffContext();
  const kandidat = useJobbsøkerContext();

  console.log('🎺 "Hei', 'Hei');
  switch (leggTilKnapp) {
    case 'stilling':
      return (
        <LagreIKandidatlisteButton
          lenkeKort
          kandidatId={kandidatId}
          stillingsId={stillingData?.stillingsId}
        />
      );
    case 'rekrutteringstreff':
      return (
        <LagreIRekrutteringstreffKnapp
          lenkeKort
          rekrutteringstreffId={rekrutteringstreffData?.rekrutteringstreffId}
        />
      );
    default:
      return null;
  }
}
