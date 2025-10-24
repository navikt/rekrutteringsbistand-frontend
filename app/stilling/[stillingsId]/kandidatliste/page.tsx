import { redirect } from 'next/navigation';

export default function Page({ params }: { params: { stillingsId: string } }) {
  redirect(`/stilling/${params.stillingsId}?stillingFane=kandidater`);
}
