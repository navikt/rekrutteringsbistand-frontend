import RekrutteringstreffPilotTilgang from '@/app/rekrutteringstreff/RekrutteringstreffPilotTilgang';

export interface layoutProps {
  children: React.ReactNode;
}

export default function layout({ children }: layoutProps) {
  return (
    <RekrutteringstreffPilotTilgang>{children}</RekrutteringstreffPilotTilgang>
  );
}
