'use client';

import LeggTilArbeidsgiverModal from '../../../LeggTilArbeidsgiverModal';
import EndreTittel from '../../components/EndreTittel';
import InnleggModal from '../../components/innlegg/InnleggModal';
import StedModal from '../../components/sted/StedModal';
import TidspunktModal from '../../components/tidspunkt/TidspunktModal';
import SvarfristModal from '../../components/tidspunkt/svarfrist/SvarfristModal';
import { StegContainer, StegRad, StegSeparator } from './SjekklisteItem';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { RekbisError } from '@/util/rekbisError';
import { Detail, Loader } from '@navikt/ds-react';
import * as React from 'react';

const DEFAULT_TITTEL = 'Nytt rekrutteringstreff';

export interface ChecklistItem {
  id: string;
  label: string;
}

const sjekklisteData: ChecklistItem[] = [
  { id: 'arbeidsgiver', label: 'Minst 1 arbeidsgiver' },
  { id: 'navn', label: 'Navn' },
  { id: 'sted', label: 'Sted' },
  { id: 'tidspunkt', label: 'Tidspunkt' },
  { id: 'svarfrist', label: 'Svarfrist' },
  { id: 'omtreffet', label: 'Om treffet' },
];

interface Props {
  onAlleStegOkChange: (erOk: boolean) => void;
}

const PublisereSteg: React.FC<Props> = ({ onAlleStegOkChange }) => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgiverModalRef = React.useRef<HTMLDialogElement>(null);
  const endreTittelModalRef = React.useRef<HTMLDialogElement>(null);
  const tidspunktModalRef = React.useRef<HTMLDialogElement>(null);
  const stedModalRef = React.useRef<HTMLDialogElement>(null);
  const svarfristModalRef = React.useRef<HTMLDialogElement>(null);
  const innleggModalRef = React.useRef<HTMLDialogElement>(null);

  const {
    data: arbeidsgivereData,
    isLoading: arbeidsgivereLoading,
    error: arbeidsgivereError,
  } = useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const {
    data: rekrutteringstreffData,
    isLoading: rekrutteringstreffLoading,
    error: rekrutteringstreffError,
    mutate: mutateRekrutteringstreff,
  } = useRekrutteringstreff(rekrutteringstreffId);
  const {
    data: innleggData,
    isLoading: innleggLoading,
    error: innleggError,
    mutate: mutateInnlegg,
  } = useInnlegg(rekrutteringstreffId);

  React.useEffect(() => {
    if (arbeidsgivereError)
      new RekbisError({
        message: 'Feil ved henting av arbeidsgivere:',
        error: arbeidsgivereError,
      });
    if (rekrutteringstreffError)
      new RekbisError({
        message: 'Feil ved henting av rekrutteringstreff:',
        error: rekrutteringstreffError,
      });
    if (innleggError)
      new RekbisError({
        message: 'Feil ved henting av innlegg:',
        error: innleggError,
      });
  }, [arbeidsgivereError, rekrutteringstreffError, innleggError]);

  const checkedItems: Record<string, boolean> = React.useMemo(() => {
    const tittel = rekrutteringstreffData?.tittel?.trim() ?? '';
    return {
      arbeidsgiver: (arbeidsgivereData?.length ?? 0) > 0,
      navn: tittel.length > 0 && tittel !== DEFAULT_TITTEL,
      sted:
        !!rekrutteringstreffData?.gateadresse?.trim() &&
        !!rekrutteringstreffData?.poststed?.trim(),
      tidspunkt: !!rekrutteringstreffData?.fraTid,
      svarfrist: !!rekrutteringstreffData?.svarfrist,
      omtreffet: (innleggData?.length ?? 0) > 0,
    };
  }, [arbeidsgivereData, rekrutteringstreffData, innleggData]);

  React.useEffect(() => {
    const alleOk = sjekklisteData.every((item) => checkedItems[item.id]);
    onAlleStegOkChange(alleOk);
  }, [checkedItems, onAlleStegOkChange]);

  const handleClickSjekklisteItem = (id: string) => {
    if (checkedItems[id]) return;
    if (id === 'arbeidsgiver') arbeidsgiverModalRef.current?.showModal();
    if (id === 'navn') endreTittelModalRef.current?.showModal();
    if (id === 'tidspunkt') tidspunktModalRef.current?.showModal();
    if (id === 'sted') stedModalRef.current?.showModal();
    if (id === 'svarfrist') svarfristModalRef.current?.showModal();
    if (id === 'omtreffet') innleggModalRef.current?.showModal();
  };

  const loading =
    arbeidsgivereLoading || rekrutteringstreffLoading || innleggLoading;

  return (
    <>
      <StegContainer>
        <Detail spacing>
          Før treffet er tilgjengelig for andre, og du kan invitere jobbsøker må
          noen detaljer være på plass først:
        </Detail>

        {loading && (
          <Loader size='medium' title='Laster sjekkliste status...' />
        )}

        {!loading &&
          sjekklisteData.map((item) => {
            const erOppfylt = !!checkedItems[item.id];
            const kanKlikkes = !erOppfylt;
            const visRamme =
              item.id === 'arbeidsgiver' || item.id === 'svarfrist';
            return (
              <React.Fragment key={item.id}>
                <StegRad
                  erOppfylt={erOppfylt}
                  kanKlikkes={kanKlikkes}
                  onClick={() => handleClickSjekklisteItem(item.id)}
                  label={item.label}
                  handlingstekst='Legg til'
                  ariaLabel={
                    kanKlikkes
                      ? `Legg til eller rediger ${item.label}`
                      : `${item.label} - Oppfylt`
                  }
                />
                {visRamme && <StegSeparator />}
              </React.Fragment>
            );
          })}
      </StegContainer>

      <LeggTilArbeidsgiverModal modalRef={arbeidsgiverModalRef} />

      {rekrutteringstreffData && (
        <>
          <EndreTittel
            modalRef={endreTittelModalRef}
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => mutateRekrutteringstreff()}
          />
          <TidspunktModal
            rekrutteringstreff={rekrutteringstreffData}
            modalRef={tidspunktModalRef}
            onUpdated={() => mutateRekrutteringstreff()}
          />
          <StedModal
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => mutateRekrutteringstreff()}
            modalRef={stedModalRef}
          />
          <SvarfristModal
            rekrutteringstreff={rekrutteringstreffData}
            onUpdated={() => mutateRekrutteringstreff()}
            modalRef={svarfristModalRef}
          />
          <InnleggModal
            rekrutteringstreffId={rekrutteringstreffData.id}
            innlegg={
              innleggData && innleggData.length > 0 ? innleggData[0] : undefined
            }
            onInnleggUpdated={() => mutateInnlegg()}
            modalRef={innleggModalRef}
          />
        </>
      )}
    </>
  );
};

export default PublisereSteg;
