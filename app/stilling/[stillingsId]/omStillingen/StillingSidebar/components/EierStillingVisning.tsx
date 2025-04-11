import { useKandidatliste } from '../../../../../api/kandidat/useKandidatliste';
import { useStillingsContext } from '../../../StillingsContext';
import { KandidatutfallTyper } from '../../../kandidater/KandidatTyper';
import AvsluttStillingKnapp from './AvsluttStillingKnapp';
import KopierStilling from './KopierStilling';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button, Loader } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const EierStillingVisning: React.FC = () => {
  const router = useRouter();
  const { erEier, stillingsData, kandidatlisteInfo } = useStillingsContext();
  const { data, isLoading } = useKandidatliste(stillingsData.stilling.uuid);

  if (isLoading) {
    return <Loader size='small' />;
  }

  const ikkeArkiverteKandidater =
    data?.kandidater?.filter((k) => !k.arkivert) ?? [];

  // const antallAktuelleKandidater = ikkeArkiverteKandidater.filter(
  //   (k) => k.status === InternKandidatstatus.AKTUELL,
  // ).length;

  // const antallPresenterteKandidater = ikkeArkiverteKandidater.filter(
  //   (k) => k.utfall === KandidatutfallTyper.PRESENTERT,
  // ).length;

  const antallKandidaterSomHarFåttJobb =
    ikkeArkiverteKandidater.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    ).length +
    (data?.formidlingerAvUsynligKandidat?.filter(
      (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
    )?.length || 0);

  const antallStillinger = data?.antallStillinger;
  const besatteStillinger = antallKandidaterSomHarFåttJobb;

  // const oppsummeringTekst = `${kandidatlisteInfo?.antallKandidater ?? '-'} kandidater (${antallAktuelleKandidater} er aktuelle${
  //   data?.kandidatlisteId === stillingsData.stilling.uuid
  //     ? ` / ${antallPresenterteKandidater} er presentert`
  //     : ''
  // })`;

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
        <AvsluttStillingKnapp
          kandidatlisteId={kandidatlisteInfo?.kandidatlisteId}
          besatteStillinger={besatteStillinger}
          antallStillinger={antallStillinger}
          kandidatlisteStatus={data?.status}
        />
      </div>
      {/* <GråBoks tittel='Oppsummering' className='mt-4'>
        <div className='ml-4'>
          {besatteStillinger} av {antallStillinger}{' '}
          {antallStillinger === 1 ? 'stilling' : 'stillinger'} er besatt
          <div className='mt-2'>{oppsummeringTekst}</div>
        </div>
      </GråBoks> */}
    </div>
  );
};

export default EierStillingVisning;
