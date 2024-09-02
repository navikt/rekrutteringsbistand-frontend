import Stilling from './Stilling';

export default function StillingSide({ params }: { params: { slug: string } }) {
  return <Stilling stillingId={params.slug} />;
}
