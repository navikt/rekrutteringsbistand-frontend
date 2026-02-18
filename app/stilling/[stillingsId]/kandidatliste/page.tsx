import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { stillingsId: string };
}) {
  const stillingsId = (await params).stillingsId;
  redirect(`/stilling/${stillingsId}?stillingFane=kandidater`);
}
