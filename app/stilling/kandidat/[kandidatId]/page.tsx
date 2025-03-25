import KandidatSideLayout from '../../../kandidat/[kandidatId]/KandidatsideLayout';
import StillingsSøk from '../../StillingsSøk';

export default async function StillingForKandidat({
  params,
}: {
  params: { kandidatId: string };
}) {
  const kandidatId = params.kandidatId;
  return (
    <KandidatSideLayout tilbakeKnapp={{ href: `/kandidat/${kandidatId}` }}>
      <StillingsSøk skjulBanner kandidatId={kandidatId} />
    </KandidatSideLayout>
  );
}
