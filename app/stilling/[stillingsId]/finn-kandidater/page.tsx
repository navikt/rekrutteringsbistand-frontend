import { KandidatSøkProvider } from '@/app/kandidat/KandidaSokFilterContext';
import { KandidatSøkMarkerteContextProvider } from '@/app/kandidat/KandidatSøkMarkerteContext';
import FinnKandidaterForStilling from '@/app/stilling/[stillingsId]/finn-kandidater/FinnKandidaterForStilling';

export default function FinnKandidaterPage() {
  return (
    <KandidatSøkProvider>
      <KandidatSøkMarkerteContextProvider>
        <FinnKandidaterForStilling />
      </KandidatSøkMarkerteContextProvider>
    </KandidatSøkProvider>
  );
}
