import AvpubliserStilling from './AvpubliserStilling';
import AvsluttStillingKnapp from './AvsluttStillingKnapp';
import KopierStilling from './KopierStilling';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button, Loader } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const EierStillingVisning: FC = () => {
  const router = useRouter();
  const { erEier, stillingsData, kandidatlisteInfo } = useStillingsContext();

  const { data, isLoading } = useKandidatlisteForEier(stillingsData, erEier);

  if (isLoading) {
    return <Loader size='small' />;
  }

  const ikkeArkiverteKandidater =
    data?.kandidater?.filter((k) => !k.arkivert) ?? [];

  const antallKandidaterSomHarFåttJobb =
    ikkeArkiverteKandidater.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    ).length +
    (data?.formidlingerAvUsynligKandidat?.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    )?.length || 0);

  const antallStillinger = data?.antallStillinger;
  const besatteStillinger = antallKandidaterSomHarFåttJobb;

  if (!erEier) {
    return null;
  }
  return (
    <div className='mt-2'>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          disabled={kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET'}
          variant='secondary'
          size='small'
          className='h-5 w-full'
          icon={<PencilIcon />}
          onClick={() =>
            router.push(`/stilling/${stillingsData.stilling.uuid}/rediger`)
          }
        >
          Rediger
        </Button>
        <KopierStilling stillingsId={stillingsData.stilling.uuid} />
        <AvpubliserStilling />
        <AvsluttStillingKnapp
          kandidatlisteId={kandidatlisteInfo?.kandidatlisteId}
          besatteStillinger={besatteStillinger}
          antallStillinger={antallStillinger}
          kandidatlisteStatus={data?.status}
        />
      </div>
    </div>
  );
};

export default EierStillingVisning;
