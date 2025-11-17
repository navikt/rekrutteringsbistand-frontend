import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { ClipboardCheckmarkIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';
import { FC, useState } from 'react';
import { useKandidatlisteForEier } from '@/app/api/kandidat/useKandidatlisteForEier';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførStillingModal
  from '@/app/stilling/[stillingsId]/_ui/fremdriftspanel/fullfør-stilling/FullførStillingModal';


export interface RegistrerFåttJobbenKnappProps {
  lukketKandidatliste?: boolean;
  endreUtfallForKandidat: (utfall: KandidatutfallTyper) => void;
  loading?: boolean;
  actionMenu?: boolean;
}

const RegistrerFåttJobbenKnapp: FC<RegistrerFåttJobbenKnappProps> = ({
  loading,
  lukketKandidatliste,
  endreUtfallForKandidat,
  actionMenu,
}) => {
  const [visFullførStillingModal, setVisFullførStillingModal] = useState(false);
  const { stillingsData, erEier } = useStillingsContext();
  const kandidatlisteForEier = useKandidatlisteForEier(stillingsData, erEier).data;

  const sjekkOmAlleStillingerBesatt = () => {
    const ikkeArkiverteKandidater =
      kandidatlisteForEier?.kandidater?.filter((k) => !k.arkivert) ?? [];

    const antallKandidaterSomHarFåttJobb =
      ikkeArkiverteKandidater.filter(
        (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
      ).length +
      (kandidatlisteForEier?.formidlingerAvUsynligKandidat?.filter(
        (k) => k.utfall === KandidatutfallTyper.FATT_JOBBEN,
      )?.length || 0);

    const antallStillinger = kandidatlisteForEier?.antallStillinger;
    const besatteStillinger = antallKandidaterSomHarFåttJobb;

    return antallStillinger === besatteStillinger;
  }

  if (actionMenu) {
    return (
      <ActionMenu.Item
        onSelect={() => endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN)}
      >
        <ClipboardCheckmarkIcon /> Registrer fått jobben
      </ActionMenu.Item>
    );
  }
  return (
    <>
      <Button
        size='small'
        variant='secondary'
        disabled={lukketKandidatliste}
        icon={<ClipboardCheckmarkIcon />}
        onClick={() => {
          endreUtfallForKandidat(KandidatutfallTyper.FATT_JOBBEN)
          setVisFullførStillingModal(sjekkOmAlleStillingerBesatt)
        }}
        loading={loading}
      >
        Registrer fått jobben
      </Button>
      {visFullførStillingModal && <FullførStillingModal setVisModal={setVisFullførStillingModal}/>}
    </>
  );
};

export default RegistrerFåttJobbenKnapp;
