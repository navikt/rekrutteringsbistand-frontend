import type { JobbsøkerDTO } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkere';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import Interesse from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/interesse/Interesse';
import Intervjufordeling from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/intervjufordeling/Intervjufordeling';
import Oppsummering from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppsummering/Oppsummering';
import Møteoppsett from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/Møteoppsett';
import RomOgRotasjon from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/romOgRotasjon/RomOgRotasjon';
import VurderingOgOppfølging from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/vurderingOgOppfølging/VurderingOgOppfølging';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    aktivtSteg: number;
    erWorkOp: boolean;
    jobbsøkere: JobbsøkerDTO[];
    antallPåmeldte: number;
  };

export default function StegMedFremmøtte({
  aktivtSteg,
  erWorkOp,
  jobbsøkere,
  antallPåmeldte,
  onTilbake,
  onNeste,
  onTreffgjennomføringOppdatert,
  onLagringsstatusEndret,
  ...grunnlag
}: Props) {
  const lagring = { onTreffgjennomføringOppdatert, onLagringsstatusEndret };
  const navigasjon = { onTilbake, onNeste };

  switch (aktivtSteg) {
    case 2:
      return grunnlag.treffgjennomføring.rom.length === 0 ? (
        <Møteoppsett {...grunnlag} {...lagring} onTilbake={onTilbake} />
      ) : (
        <RomOgRotasjon
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          jobbsøkere={jobbsøkere}
        />
      );
    case 3:
      return (
        <Interesse
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          erWorkOp={erWorkOp}
          jobbsøkere={jobbsøkere}
        />
      );
    case 4:
      return (
        <Intervjufordeling
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          jobbsøkere={jobbsøkere}
        />
      );
    case 5:
      return (
        <VurderingOgOppfølging
          {...grunnlag}
          {...lagring}
          {...navigasjon}
          jobbsøkere={jobbsøkere}
        />
      );
    default:
      return (
        <Oppsummering
          {...grunnlag}
          jobbsøkere={jobbsøkere}
          antallPåmeldte={antallPåmeldte}
          onTilbake={onTilbake}
        />
      );
  }
}
