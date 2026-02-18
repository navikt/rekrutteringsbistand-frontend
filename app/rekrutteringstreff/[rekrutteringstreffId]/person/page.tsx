import { redirect } from 'next/navigation';

export default async function PersonRedirectPage({
  params,
}: {
  params: { rekrutteringstreffId: string };
}) {
  const rekrutteringstreffId = (await params).rekrutteringstreffId;
  redirect(`/rekrutteringstreff/${rekrutteringstreffId}?visFane=jobbsøkere`);
}
