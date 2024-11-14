import { PencilIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useKandidatliste } from '../../../../../api/kandidat/useKandidatliste';
import {
  Kandidatstatus,
  Kandidatutfall,
} from '../../../kandidater/KandidatIKandidatlisteTyper';
import { useStillingsContext } from '../../../StillingsContext';
import AvsluttStillingKnapp from './AvsluttStillingKnapp';

const EierStillingVisning: React.FC = () => {
  const router = useRouter();
  const { erEier, stillingsData } = useStillingsContext();

  const { data } = useKandidatliste(stillingsData.stilling.uuid);
  const ref = React.useRef<HTMLDialogElement>(null);

  const ikkeArkiverteKandidater =
    data?.kandidater.filter((k) => !k.arkivert) ?? [];

  const antallAktuelleKandidater = ikkeArkiverteKandidater.filter(
    (k) => k.status === Kandidatstatus.Aktuell,
  ).length;

  const antallPresenterteKandidater = ikkeArkiverteKandidater.filter(
    (k) => k.utfall === Kandidatutfall.Presentert,
  ).length;

  const antallKandidaterSomHarFåttJobb =
    ikkeArkiverteKandidater.filter(
      (k) => k.utfall === Kandidatutfall.FåttJobben,
    ).length +
    (data?.formidlingerAvUsynligKandidat?.filter(
      (k) => k.utfall === Kandidatutfall.FåttJobben,
    )?.length || 0);

  const antallStillinger = data?.antallStillinger;
  const besatteStillinger = antallKandidaterSomHarFåttJobb;

  const oppsummeringTekst = `${
    data?.kandidater.length
  } kandidater (${antallAktuelleKandidater} er aktuelle${
    data?.kandidatlisteId === stillingsData.stilling.uuid
      ? ` / ${antallPresenterteKandidater} er presentert`
      : ''
  })`;

  if (!erEier) {
    return null;
  }
  return (
    <div className='mt-2'>
      <div className='grid grid-cols-2 gap-2'>
        <Button
          variant='secondary'
          size='small'
          className='w-full h-5'
          icon={<PencilIcon />}
          onClick={() =>
            router.push(`/stilling/${stillingsData.stilling.uuid}/rediger`)
          }
        >
          Rediger
        </Button>
        <AvsluttStillingKnapp
          besatteStillinger={besatteStillinger}
          antallStillinger={antallStillinger}
          kandidatlisteStatus={data?.status}
        />
      </div>
      <div className='border-blue-200 rounded mt-4 border p-3'>
        <Heading size='xsmall' className='mb-4'>
          Oppsummering
        </Heading>
        <div className='ml-4'>
          {besatteStillinger} av {antallStillinger}{' '}
          {antallStillinger === 1 ? 'stilling' : 'stillinger'} er besatt
          <div className='mt-2'>{oppsummeringTekst}</div>
        </div>
      </div>
    </div>
  );
};

export default EierStillingVisning;
