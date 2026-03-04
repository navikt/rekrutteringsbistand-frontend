import { endreUtfallKandidat } from '@/app/api/kandidat/endreKandidatUtfall';
import { useNullableStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import FullførStillingModal from '@/app/stilling/[stillingsId]/_ui/stilling-handlinger/fullfør-oppdrag/FullførStillingModal';
import { KandidatutfallTyper } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatTyper';
import { useNullableKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import DelMedArbeidsgiver from '@/app/stilling/[stillingsId]/kandidatliste/_ui/DelMedArbeidsgiver/DelMedArbeidsgiver';
import DelMedKandidatModal from '@/app/stilling/[stillingsId]/kandidatliste/_ui/DelMedKandidat/DelMedKandidatModal';
import {
  EndreArkivertStatusKnapp,
  EndreArkivertStatusModal,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/EndreArkivertStatusModal';
import FjernDelingMedArbeidsgiver from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernDelingMedArbeidsgiver';
import FjernFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/FjernFåttJobbenKnapp';
import KandidatHendelseTagVisning, {
  SlettetTag,
} from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelseTagVisning';
import { KandidatHendelseType } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import KandidatHendelser from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelser';
import RegistrerFåttJobbenKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/RegistrerFåttJobbenKnapp';
import SendSmsKnapp from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsKnapp';
import SendSmsModal from '@/app/stilling/[stillingsId]/kandidatliste/_ui/SendSMS/SendSmsModal';
import VelgInternStatus from '@/app/stilling/[stillingsId]/kandidatliste/_ui/VelgInternStatus';
import DynamiskDropdown from '@/components/DynamiskDropdown/DynamiskDropdown';
import { TilgangskontrollForInnhold } from '@/components/tilgangskontroll/TilgangskontrollForInnhold';
import { Roller } from '@/components/tilgangskontroll/roller';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useApplikasjonContext } from '@/providers/ApplikasjonContext';
import { RekbisError } from '@/util/rekbisError';
import { ChevronDownCircleIcon } from '@navikt/aksel-icons';
import { Alert } from '@navikt/ds-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface JobbsøkerPåKandidatlisteProps {
  kandidatId: string;
}

export default function JobbsøkerPåKandidatliste({
  kandidatId,
}: JobbsøkerPåKandidatlisteProps) {
  const kandidatliste = useNullableKandidatlisteContext();
  const stilling = useNullableStillingsContext();

  const { valgtNavKontor } = useApplikasjonContext();

  const [loading, setLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDialogElement>(null!);
  const [visFullførStillingModal, setVisFullførStillingModal] = useState(false);
  const [visSendSmsModal, setVisSendSmsModal] = useState(false);

  if (!stilling || !kandidatliste) {
    return null;
  }

  const {
    reFetchKandidatliste,
    lukketKandidatliste,
    kandidatlisteId,
    kandidater,
  } = kandidatliste;

  const { kandidatlisteInfo, omStilling } = stilling;

  const kandidat = kandidater.find((k) => k.kandidatnr === kandidatId);

  if (!kandidat) {
    return (
      <div className='py-5'>
        <Alert variant='error'>Fant ikke kandidat i kandidatliste</Alert>
      </div>
    );
  }

  const erJobbmesse = omStilling.erJobbMesse;

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
      <TilgangskontrollForInnhold
        skjulVarsel
        kreverEnAvRollene={[
          Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
        ]}
      >
        <div className='flex min-w-0 flex-wrap items-center gap-2 pt-2'>
          {kandidatHendelseVisning(<SlettetTag topBar kandidat={kandidat} />)}
          <div className='flex flex-1 justify-end'>
            <EndreArkivertStatusKnapp
              lukketKandidatliste={lukketKandidatliste}
              slettet={kandidat.arkivert}
              modalRef={modalRef}
            />
          </div>
        </div>
      </TilgangskontrollForInnhold>
    );
  }

  // Bygg liste over handlinger basert på tilstand
  const handlinger: { id: string; element: React.ReactNode }[] = [];

  if (
    !erJobbmesse &&
    !fåttJobben &&
    !cvDeltMedArbeidsgiver &&
    !cvFjernetFraArbeidsgiver
  ) {
    handlinger.push({
      id: 'delMedKandidat',
      element: (
        <DelMedKandidatModal
          markerteKandidater={[kandidat]}
          fjernAllMarkering={() => {}}
          sidebar
        />
      ),
    });
    handlinger.push({
      id: 'delMedArbeidsgiver',
      element: <DelMedArbeidsgiver markerteKandidater={[kandidat]} sidebar />,
    });
  }

  handlinger.push({
    id: 'sendSms',
    element: (
      <SendSmsKnapp
        markerteKandidater={[kandidat]}
        setVisSendSmsModal={setVisSendSmsModal}
      />
    ),
  });

  if (!erJobbmesse) {
    if (kandidat.utfall !== KandidatutfallTyper.FATT_JOBBEN) {
      handlinger.push({
        id: 'registrerFattJobben',
        element: (
          <RegistrerFåttJobbenKnapp
            loading={loading}
            endreUtfallForKandidat={endreUtfallForKandidat}
            lukketKandidatliste={lukketKandidatliste}
            visFullførStillingModal={setVisFullførStillingModal}
          />
        ),
      });
    } else {
      handlinger.push({
        id: 'fjernFattJobben',
        element: (
          <FjernFåttJobbenKnapp
            loading={loading}
            endreUtfallForKandidat={endreUtfallForKandidat}
            lukketKandidatliste={lukketKandidatliste}
          />
        ),
      });
    }
  }

  if (!cvFjernetFraArbeidsgiver && cvDeltMedArbeidsgiver) {
    handlinger.push({
      id: 'fjernDeling',
      element: (
        <FjernDelingMedArbeidsgiver
          kandidatnummer={kandidat.kandidatnr}
          navKontor={valgtNavKontor?.navKontor ?? null}
        />
      ),
    });
  }

  handlinger.push({
    id: 'endreArkivert',
    element: (
      <EndreArkivertStatusKnapp
        lukketKandidatliste={lukketKandidatliste}
        slettet={kandidat.arkivert}
        modalRef={modalRef}
      />
    ),
  });

  return (
    <TilgangskontrollForInnhold
      skjulVarsel
      kreverEnAvRollene={[
        Roller.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET,
      ]}
    >
      <div className='@container/header flex min-w-0 items-center gap-2 pt-2'>
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

        <JobbsøkerHandlinger handlinger={handlinger} />

        {visSendSmsModal && (
          <SendSmsModal
            markerteKandidater={[kandidat]}
            fjernAllMarkering={() => {}}
            setVisSendSmsModal={() => setVisSendSmsModal(false)}
          />
        )}
        <EndreArkivertStatusModal
          modalRef={modalRef}
          kandidat={kandidat}
          kandidatlisteId={kandidatlisteId}
        />
        {visFullførStillingModal && (
          <FullførStillingModal
            setVisModal={() => setVisFullførStillingModal(false)}
          />
        )}
      </div>
    </TilgangskontrollForInnhold>
  );
}

interface JobbsøkerHandlingerProps {
  handlinger: { id: string; element: React.ReactNode }[];
}

/**
 * Hook som beregner hvor mange handlingsknapper som får plass
 * basert på tilgjengelig bredde i sidepanelet.
 */
function useSidepanelDropdown(antallElementer: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [antallSynlige, setAntallSynlige] = useState(antallElementer);

  const sjekkPlass = useCallback(() => {
    if (!containerRef.current || !measureRef.current) return;

    // Mål bredden av hvert element
    const elementer = measureRef.current.querySelectorAll(
      '[data-measure-item]',
    );
    const bredder: number[] = [];
    elementer.forEach((el) => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.width > 0) {
        bredder.push(rect.width);
      }
    });

    if (bredder.length === 0) return;

    // Finn tilgjengelig bredde fra containerens parent
    const parent = containerRef.current.parentElement;
    if (!parent) {
      setAntallSynlige(antallElementer);
      return;
    }

    const parentBredde = parent.getBoundingClientRect().width;
    if (parentBredde === 0) return;

    // Finn bredden av andre elementer i parent (tags, status, etc.)
    let andreElementerBredde = 0;
    for (const barn of Array.from(parent.children)) {
      if (barn !== containerRef.current) {
        andreElementerBredde += (barn as HTMLElement).getBoundingClientRect()
          .width;
      }
    }

    // Tilgjengelig bredde = parent - andre elementer - gaps
    const gaps = 24; // gap-2 * antall elementer
    const tilgjengeligBredde = parentBredde - andreElementerBredde - gaps;

    if (tilgjengeligBredde <= 0) {
      setAntallSynlige(0);
      return;
    }

    const dropdownBredde = 44;
    const gap = 4;

    // Beregn total bredde for alle elementer
    const totalBredde = bredder.reduce(
      (sum, b, i) => sum + b + (i > 0 ? gap : 0),
      0,
    );

    // Hvis alle får plass, vis alle uten dropdown
    if (totalBredde <= tilgjengeligBredde) {
      setAntallSynlige(antallElementer);
      return;
    }

    // Beregn hvor mange som får plass med dropdown
    let bruktBredde = dropdownBredde + gap;
    let antall = 0;

    for (let i = 0; i < bredder.length; i++) {
      const elementBredde = bredder[i] + gap;
      if (bruktBredde + elementBredde <= tilgjengeligBredde) {
        bruktBredde += elementBredde;
        antall = i + 1;
      } else {
        break;
      }
    }

    setAntallSynlige(antall);
  }, [antallElementer]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      requestAnimationFrame(sjekkPlass);
    };
    window.addEventListener('resize', handleResize);

    // Observer parent for resize-endringer
    const parent = containerRef.current.parentElement;
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(sjekkPlass);
    });

    if (parent) {
      resizeObserver.observe(parent);
    }
    resizeObserver.observe(containerRef.current);

    // Initial sjekk med timeouts
    const timeouts = [0, 50, 150, 300].map((delay) =>
      setTimeout(sjekkPlass, delay),
    );

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [sjekkPlass]);

  return { containerRef, measureRef, antallSynlige };
}

function JobbsøkerHandlinger({ handlinger }: JobbsøkerHandlingerProps) {
  const { containerRef, measureRef, antallSynlige } = useSidepanelDropdown(
    handlinger.length,
  );

  const synligeHandlinger = handlinger.slice(0, antallSynlige);
  const skjulteHandlinger = handlinger.slice(antallSynlige);

  return (
    <div
      ref={containerRef}
      className='ml-auto flex flex-nowrap items-center gap-1'
    >
      {/* Usynlig måle-container for å beregne bredder */}
      <div
        ref={measureRef}
        className='pointer-events-none fixed -left-[9999px] flex gap-1'
        aria-hidden='true'
      >
        {handlinger.map(({ id, element }) => (
          <div key={id} data-measure-item>
            {element}
          </div>
        ))}
      </div>

      {/* Synlige knapper basert på tilgjengelig plass */}
      {synligeHandlinger.map(({ id, element }) => (
        <React.Fragment key={id}>{element}</React.Fragment>
      ))}

      {/* Dropdown med resterende handlinger */}
      {skjulteHandlinger.length > 0 && (
        <DynamiskDropdown>
          {skjulteHandlinger.map(({ id, element }) => (
            <React.Fragment key={id}>{element}</React.Fragment>
          ))}
        </DynamiskDropdown>
      )}
    </div>
  );
}
