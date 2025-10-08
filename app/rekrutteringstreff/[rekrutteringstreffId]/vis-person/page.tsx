import VisPerson from './_ui/VisPerson';

export default function VisPersonPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const visPersonTreffIdParam = searchParams?.visPersonTreffId;
  const personTreffIdParam = searchParams?.personTreffId;

  const extractFirst = (
    val: string | string[] | undefined,
  ): string | undefined => (Array.isArray(val) ? val[0] : val);

  const personTreffId =
    extractFirst(visPersonTreffIdParam) ?? extractFirst(personTreffIdParam);

  return <VisPerson personTreffId={personTreffId} />;
}
