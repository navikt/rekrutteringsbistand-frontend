import { KandidatContextProvider } from '../../../../kandidat/[kandidatId]/KandidatContext';
import KandidatForStilling from './KandidatForStilling';

export default async function KandidatIKontekstAvStilling(
  params: Promise<{ kandidatId: string }>,
) {
  const kandidatId = (await params).kandidatId;
  return (
    <KandidatContextProvider kandidatId={kandidatId}>
      <KandidatForStilling kandidatId={kandidatId} />
    </KandidatContextProvider>
  );
}
