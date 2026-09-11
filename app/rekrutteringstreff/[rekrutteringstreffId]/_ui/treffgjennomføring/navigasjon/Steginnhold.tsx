import { useJobbsøkereForGjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForGjennomføring';
import DatagrunnlagFeil from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/DatagrunnlagFeil';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import StegMedFremmøtte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/StegMedFremmøtte';
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
  const jobbsøkereHook = useJobbsøkereForGjennomføring(
    aktivtSteg === 1 ? undefined : props.rekrutteringstreffId,
  );

  if (aktivtSteg === 1) {
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
