import KandidatSøk from './KandidatSøk';
import { KandidatSøkProvider } from './KandidatsøkContext';

export default function KandidatSøkIndex() {
  return (
    <KandidatSøkProvider>
      <KandidatSøk />
    </KandidatSøkProvider>
  );
}
