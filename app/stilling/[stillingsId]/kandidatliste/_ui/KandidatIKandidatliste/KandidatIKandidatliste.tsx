'use client';

import { endreUtfallKandidat } from '@/app/api/kandidat/endreKandidatUtfall';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import DelMedArbeidsgiver from '@/app/stilling/[stillingsId]/kandidatliste/_ui/DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from '@/app/stilling/[stillingsId]/kandidatliste/_ui/DelMedKandidat/DelMedKandidatModal';
import { EndreArkivertStatusKnapp } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/EndreArkivertStatusModal';
import FjernDelingMedArbeidsgiver from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernDelingMedArbeidsgiver';
import FjernFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernFåttJobbenKnapp';
import KandidatHendelseTagVisning, {
  SlettetTag,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelseTagVisning';
import { KandidatHendelseType } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import KandidatHendelser from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelser';
import RegistrerFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/RegistrerFåttJobbenKnapp';
import SendSmsKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsKnapp';
import VelgInternStatus from '@/app/stilling/[stillingsId]/kandidatliste/_ui/VelgInternStatus';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { ChevronDownCircleIcon } from '@navikt/aksel-icons';
import { Alert } from '@navikt/ds-react';
import { useRef, useState } from 'react';

export interface KandidatIKandidatlisteProps {
  kandidatlisteKandidat: string;
}

export default function KandidatIKandidatliste({
  kandidatlisteKandidat,
}: KandidatIKandidatlisteProps) {
  const { valgtNavKontor } = useApplikasjonContext();
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();
  const [loading, setLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null!);
  const [visFullførStillingModal, setVisFullførStillingModal] = useState(false);
  const [visSendSmsModal, setVisSendSmsModal] = useState(false);

  const {
    reFetchKandidatliste,
    lukketKandidatliste,
    kandidatlisteId,
    kandidater,
  } = useKandidatlisteContext();
  const kandidat = kandidater.find(
    (k) => k.kandidatnr === kandidatlisteKandidat,
  );

  if (!kandidat) {
    return (
      <div className='py-5'>
        <Alert variant='error'>Fant ikke kandidat i kandidatliste</Alert>
      </div>
    );
  }

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

  const fåttJobben = kandidat.utfall === KandidatutfallTyper.FATT_JOBBEN;
  const cvFjernetFraArbeidsgiver =
    kandidat.kandidatHendelser.utfallsendringer?.some(
      (cv) => cv.tekst === KandidatHendelseType.CV_slettet_hos_arbeidsgiver,
    );

  const cvDeltMedArbeidsgiver =
    kandidat.kandidatHendelser.utfallsendringer?.some(
      (endring) =>
        'sendtTilArbeidsgiversKandidatliste' in endring.raw &&
        endring.raw.sendtTilArbeidsgiversKandidatliste,
    );

  const kandidatHendelseVisning = (sisteHendelse: React.ReactNode) => {
    return (
      <HoverCard>
        <HoverCardTrigger>
          <div className='flex cursor-pointer items-center gap-1'>
            {sisteHendelse} <ChevronDownCircleIcon />
          </div>
        </HoverCardTrigger>
        <HoverCardContent className='w-80'>
          <KandidatHendelser kandidatHendelser={kandidat.kandidatHendelser} />
        </HoverCardContent>
      </HoverCard>
    );
  };

  if (kandidat.arkivert) {
    return (
      <div className='flex h-4 gap-4 py-2'>
        {kandidatHendelseVisning(<SlettetTag kandidat={kandidat} />)}
        <div className='flex flex-1 justify-end'>
          <EndreArkivertStatusKnapp
            lukketKandidatliste={lukketKandidatliste}
            slettet={kandidat.arkivert}
            modalRef={modalRef}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex h-4 items-center gap-4 pt-6 pb-4'>
        {kandidatHendelseVisning(
          <KandidatHendelseTagVisning
            topBar
            kandidatHendelse={kandidat.kandidatHendelser.sisteHendelse}
          />,
        )}

        {kandidatlisteInfo && (
          <VelgInternStatus
            lukketKandidatliste={
              kandidatlisteInfo.kandidatlisteStatus === 'LUKKET'
            }
            kandidatnr={kandidat.kandidatnr}
            status={kandidat.status}
          />
        )}

        {!fåttJobben && !cvDeltMedArbeidsgiver && !cvFjernetFraArbeidsgiver && (
          <>
            <DelMedKandidatModal
              markerteKandidater={[kandidat]}
              fjernAllMarkering={() => {}}
              sidebar
            />

            <DelMedArbeidsgiver markerteKandidater={[kandidat]} sidebar />
          </>
        )}

        <>
          <div className='flex gap-2'>
            <SendSmsKnapp
              markerteKandidater={[kandidat]}
              setVisSendSmsModal={setVisSendSmsModal}
            />
            {kandidat.utfall !== KandidatutfallTyper.FATT_JOBBEN ? (
              <RegistrerFåttJobbenKnapp
                loading={loading}
                endreUtfallForKandidat={endreUtfallForKandidat}
                lukketKandidatliste={lukketKandidatliste}
                visFullførStillingModal={setVisFullførStillingModal}
              />
            ) : (
              <FjernFåttJobbenKnapp
                loading={loading}
                endreUtfallForKandidat={endreUtfallForKandidat}
                lukketKandidatliste={lukketKandidatliste}
              />
            )}
            {!cvFjernetFraArbeidsgiver && cvDeltMedArbeidsgiver && (
              <FjernDelingMedArbeidsgiver
                kandidatnummer={kandidat.kandidatnr}
                navKontor={valgtNavKontor?.navKontor ?? null}
              />
            )}
          </div>
          <EndreArkivertStatusKnapp
            lukketKandidatliste={lukketKandidatliste}
            slettet={kandidat.arkivert}
            modalRef={modalRef}
          />
        </>
      </div>
    </div>
  );
}
