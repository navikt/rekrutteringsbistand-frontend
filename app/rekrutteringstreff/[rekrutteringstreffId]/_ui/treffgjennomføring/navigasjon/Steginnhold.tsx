import type { JobbsøkereResponseDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import Interesse from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/Interesse';
import Intervjufordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/Intervjufordeling';
import Oppmøte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/Oppmøte';
import Oppsummering from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppsummering/Oppsummering';
import Møteoppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Møteoppsett';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/RomOgRotasjon';
import VurderingOgOppfølging from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/VurderingOgOppfølging';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    aktivtSteg: number;
    erWorkOp: boolean;
    jobbsøkereData: JobbsøkereResponseDTO;
    nesteknappTekst: string;
  };

export default function Steginnhold({
  aktivtSteg,
  erWorkOp,
  jobbsøkereData,
  nesteknappTekst,
  onTilbake,
  onNeste,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  ...grunnlag
}: Props) {
  const lagring = { onTreffgjennomføringOppdatert, onLagringsstatusEndret };
  const navigasjon = { onTilbake, onNeste };
  const fremmøtteJobbsøkere = jobbsøkereData.jobbsøkere.filter((jobbsøker) =>
    grunnlag.treffgjennomføring.oppmøte.includes(jobbsøker.personTreffId),
  );

  switch (aktivtSteg) {
    case 1:
      return (
        <Oppmøte
          {...grunnlag}
          {...lagring}
          jobbsøkereData={jobbsøkereData}
          onNeste={onNeste}
          nesteknappTekst={nesteknappTekst}
        />
      );
    case 2:
      return grunnlag.treffgjennomføring.rom.length === 0 ? (
        <Møteoppsett {...grunnlag} {...lagring} onTilbake={onTilbake} />
      ) : (
        <RomOgRotasjon
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          jobbsøkereData={jobbsøkereData}
        />
      );
    case 3:
      return (
        <Interesse
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          erWorkOp={erWorkOp}
          jobbsøkere={fremmøtteJobbsøkere}
        />
      );
    case 4:
      return (
        <Intervjufordeling
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          jobbsøkere={fremmøtteJobbsøkere}
        />
      );
    case 5:
      return (
        <VurderingOgOppfølging
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          jobbsøkere={fremmøtteJobbsøkere}
        />
      );
    default:
      return (
        <Oppsummering
          {...grunnlag}
          jobbsøkere={fremmøtteJobbsøkere}
          antallPåmeldte={jobbsøkereData.totalt}
          onTilbake={onTilbake}
        />
      );
  }
}
