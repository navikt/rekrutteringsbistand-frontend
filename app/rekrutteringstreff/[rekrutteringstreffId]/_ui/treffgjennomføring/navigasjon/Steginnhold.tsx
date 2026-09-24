import { useJobbsøkereForGjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForGjennomføring';
import DatagrunnlagFeil from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/DatagrunnlagFeil';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import StegMedFremmøtte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/StegMedFremmøtte';
import { STEG } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import Oppmøte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/Oppmøte';
import SWRLaster from '@/components/SWRLaster';

type Props = StegBasisProps &
  StegLagringProps &
  StegNavigasjonProps & {
    aktivtSteg: number;
    erWorkOp: boolean;
    nesteknappTekst: string;
  };

export default function Steginnhold({
  aktivtSteg,
  nesteknappTekst,
  ...props
}: Props) {
  // Oppmøte henter jobbsøkerne side for side selv. De andre stegene trenger alle fremmøtte.
  const erOppmøte = aktivtSteg === STEG.OPPMØTE;
  const jobbsøkereHook = useJobbsøkereForGjennomføring(
    erOppmøte ? undefined : props.rekrutteringstreffId,
  );

  if (erOppmøte) {
    return <Oppmøte {...props} nesteknappTekst={nesteknappTekst} />;
  }

  return (
    <SWRLaster
      hooks={[jobbsøkereHook]}
      egenFeilmelding={() => (
        <DatagrunnlagFeil
          henter={jobbsøkereHook.isValidating}
          onHentPåNytt={() => void jobbsøkereHook.mutate()}
        />
      )}
    >
      {(data) => (
        <StegMedFremmøtte
          {...props}
          aktivtSteg={aktivtSteg}
          jobbsøkere={data.jobbsøkere}
          antallPåmeldte={data.antallPåmeldte}
        />
      )}
    </SWRLaster>
  );
}
