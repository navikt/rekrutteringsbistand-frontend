import RekrutteringstreffPilotTilgang from '@/app/rekrutteringstreff/RekrutteringstreffPilotTilgang';

export interface RekrutteringstreffLayoutProps {
  children: React.ReactNode;
}

export default function RekrutteringstreffLayout({ children }: RekrutteringstreffLayoutProps) {
  return (
    <RekrutteringstreffPilotTilgang>{children}</RekrutteringstreffPilotTilgang>
  );
}
