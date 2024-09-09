import { StillingsContextProvider } from './StillingsContext';

export default function StillingSide({ params }: { params: { slug: string } }) {
  return <StillingsContextProvider stillingsId={params.slug} />;
}
