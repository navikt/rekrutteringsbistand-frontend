import PersonTreffProvider from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/PersonTreffContext';
import VisPerson from '@/app/rekrutteringstreff/[rekrutteringstreffId]/person/[personTreffId]/VisPerson';

export interface VisPersonWindowProps {
  personTreffId: string;
}

export default function VisPersonWindow({
  personTreffId,
}: VisPersonWindowProps) {
  return (
    <PersonTreffProvider personTreffId={personTreffId}>
      <VisPerson />
    </PersonTreffProvider>
  );
}
