import type { ArbeidsgiverDTO } from '@/app/api/rekrutteringstreff/[...slug]/arbeidsgivere/useArbeidsgivere';
import { useJobbsøkereForGjennomføring } from '@/app/api/rekrutteringstreff/[...slug]/jobbsøkere/useJobbsøkereForGjennomføring';
import DatagrunnlagFeil from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/DatagrunnlagFeil';
import { harArbeidsgiverTreffId } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/arbeidsgivere';
import type {
  StegBasisProps,
  StegLagringProps,
  StegNavigasjonProps,
} from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/felles/treffgjennomføringStegProps';
import StegMedFremmøtte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/StegMedFremmøtte';
import { STEG } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/navigasjon/treffgjennomføringSteg';
import Oppmøte from '@/app/rekrutteringstreff/[rekrutteringstreffId]/_ui/treffgjennomføring/oppmøte/Oppmøte';
import SWRLaster from '@/components/SWRLaster';
import { useMemo } from 'react';

type Props = Omit<StegBasisProps, 'arbeidsgivere'> &
  StegLagringProps &
  StegNavigasjonProps & {
    arbeidsgivere: ArbeidsgiverDTO[];
    aktivtSteg: number;
    erWorkOp: boolean;
    nesteknappTekst: string;
  };

export default function Steginnhold({
  aktivtSteg,
  nesteknappTekst,
  arbeidsgivere,
  ...resten
}: Props) {
  const arbeidsgivereMedId = useMemo(
    () => arbeidsgivere.filter(harArbeidsgiverTreffId),
    [arbeidsgivere],
  );
  const props = { ...resten, arbeidsgivere: arbeidsgivereMedId };
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
