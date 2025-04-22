import KandidatSideLayout from '../../../kandidat/[kandidatId]/KandidatsideLayout';
import StillingsSøk from '../../StillingsSøk';

export default async function StillingForKandidat({
  params,
}: {
  params: { kandidatId: string };
}) {
  const kandidatId = params.kandidatId;
  return (
    <KandidatSideLayout tilbakeKnapp>
      <StillingsSøk skjulBanner kandidatId={kandidatId} />
    </KandidatSideLayout>
  );
}
