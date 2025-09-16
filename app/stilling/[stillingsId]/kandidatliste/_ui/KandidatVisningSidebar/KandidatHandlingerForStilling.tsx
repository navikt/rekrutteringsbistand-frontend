import { endreUtfallKandidat } from '@/app/api/kandidat/endreKandidatUtfall';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import DelMedArbeidsgiver from '@/app/stilling/[stillingsId]/kandidatliste/_ui/DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from '@/app/stilling/[stillingsId]/kandidatliste/_ui/DelMedKandidat/DelMedKandidatModal';
import {
  EndreArkivertStatusKnapp,
  EndreArkivertStatusModal,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/EndreArkivertStatusModal';
import FjernDelingMedArbeidsgiver from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernDelingMedArbeidsgiver';
import FjernFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernFåttJobbenKnapp';
import KandidatHendelseTag, {
  SlettetTag,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelseTagVisning';
import { KandidatHendelseType } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import KandidatHendelser from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelser';
import { KandidatVisningProps } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatlisteFilter/useFiltrerteKandidater';
import RegistrerFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/RegistrerFåttJobbenKnapp';
import SendSmsModal from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsModal';
import VelgInternStatus from '@/app/stilling/[stillingsId]/kandidatliste/_ui/VelgInternStatus';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { Accordion } from '@navikt/ds-react';
import { useRef, useState, type FC } from 'react';

export interface KandidatHandlingerForStillingProps {
  kandidat: KandidatVisningProps;
}

const KandidatHandlingerForStilling: FC<KandidatHandlingerForStillingProps> = ({
  kandidat,
}) => {
  const { valgtNavKontor } = useApplikasjonContext();
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();
  const { reFetchKandidatliste, lukketKandidatliste, kandidatlisteId } =
    useKandidatlisteContext();
  const [loading, setLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null!);

  const cvDeltMedArbeidsgiver =
    kandidat.kandidatHendelser.utfallsendringer?.some(
      (endring) =>
        'sendtTilArbeidsgiversKandidatliste' in endring.raw &&
        endring.raw.sendtTilArbeidsgiversKandidatliste,
    );

  const fåttJobben = kandidat.utfall === KandidatutfallTyper.FATT_JOBBEN;

  const cvFjernetFraArbeidsgiver =
    kandidat.kandidatHendelser.utfallsendringer?.some(
      (cv) => cv.tekst === KandidatHendelseType.CV_slettet_hos_arbeidsgiver,
    );

  const endreUtfallForKandidat = async (utfall: KandidatutfallTyper) => {
    setLoading(true);
    try {
      await endreUtfallKandidat(
        utfall,
        valgtNavKontor?.navKontor ?? '',
        kandidatlisteId,
        kandidat.kandidatnr,
      );
      reFetchKandidatliste();
    } catch (error) {
      new RekbisError({ message: 'Feil ved endring av utfall', error });
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <div>
          <div className='mb-2'>{stillingsData.stilling.title}</div>
          {kandidat.arkivert ? (
            <SlettetTag kandidat={kandidat} />
          ) : (
            <KandidatHendelseTag
              sidebar
              kandidatHendelse={kandidat.kandidatHendelser.sisteHendelse}
            />
          )}
        </div>
        <div>
          {kandidatlisteInfo && (
            <VelgInternStatus
              lukketKandidatliste={
                kandidatlisteInfo.kandidatlisteStatus === 'LUKKET'
              }
              kandidatnr={kandidat.kandidatnr}
              status={kandidat.status}
            />
          )}
        </div>
      </div>
      {!kandidat.arkivert &&
        !fåttJobben &&
        !cvDeltMedArbeidsgiver &&
        !cvFjernetFraArbeidsgiver && (
          <div className='grid grid-cols-2 gap-2'>
            <DelMedKandidatModal
              markerteKandidater={[kandidat]}
              fjernAllMarkering={() => {}}
              sidebar
            />

            <DelMedArbeidsgiver markerteKandidater={[kandidat]} sidebar />
          </div>
        )}

      {kandidat.arkivert ? (
        <EndreArkivertStatusKnapp
          lukketKandidatliste={lukketKandidatliste}
          slettet={kandidat.arkivert}
          modalRef={modalRef}
        />
      ) : (
        <div className='grid grid-cols-2 gap-2 justify-between @3xl:flex @3xl:justify-between'>
          <SendSmsModal
            markerteKandidater={[kandidat]}
            fjernAllMarkering={() => {}}
            sidebar
          />
          <div>
            {kandidat.utfall !== KandidatutfallTyper.FATT_JOBBEN ? (
              <RegistrerFåttJobbenKnapp
                loading={loading}
                endreUtfallForKandidat={endreUtfallForKandidat}
                lukketKandidatliste={lukketKandidatliste}
              />
            ) : (
              <FjernFåttJobbenKnapp
                loading={loading}
                endreUtfallForKandidat={endreUtfallForKandidat}
                lukketKandidatliste={lukketKandidatliste}
              />
            )}
          </div>
          {cvDeltMedArbeidsgiver && (
            <FjernDelingMedArbeidsgiver
              kandidatnummer={kandidat.kandidatnr}
              navKontor={valgtNavKontor?.navKontor ?? null}
            />
          )}
          <div className='flex flex-1 justify-end'>
            <EndreArkivertStatusKnapp
              lukketKandidatliste={lukketKandidatliste}
              slettet={kandidat.arkivert}
              modalRef={modalRef}
            />
          </div>
        </div>
      )}
      <EndreArkivertStatusModal
        modalRef={modalRef}
        kandidat={kandidat}
        kandidatlisteId={kandidatlisteId}
      />
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Vis alle hendelser og varsler</Accordion.Header>
          <Accordion.Content>
            <KandidatHendelser kandidatHendelser={kandidat.kandidatHendelser} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default KandidatHandlingerForStilling;
