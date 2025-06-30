'use client';

import LeggTilArbeidsgiverModal from '../../../LeggTilArbeidsgiverModal';
import EndreTittel from '../../components/EndreTittel';
import InnleggModal from '../../components/innlegg/InnleggModal';
import StedModal from '../../components/sted/StedModal';
import TidspunktModal from '../../components/tidspunkt/TidspunktModal';
import SvarfristModal from '../../components/tidspunkt/svarfrist/SvarfristModal';
import {
  SjekklisteContainer,
  SjekklisteRad,
  SjekklisteSeparator,
} from './Sjekkliste';
import { useRekrutteringstreffArbeidsgivere } from '@/app/api/rekrutteringstreff/[...slug]/useArbeidsgivere';
import { useInnlegg } from '@/app/api/rekrutteringstreff/[...slug]/useInnlegg';
import { useRekrutteringstreff } from '@/app/api/rekrutteringstreff/useRekrutteringstreff';
import { useRekrutteringstreffContext } from '@/app/rekrutteringstreff/[rekrutteringstreffId]/RekrutteringstreffContext';
import { Detail, Loader } from '@navikt/ds-react';
import * as React from 'react';

const DEFAULT_TITTEL = 'Nytt rekrutteringstreff';

const sjekklisteData = [
  { id: 'arbeidsgiver', label: 'Minst 1 arbeidsgiver' },
  { id: 'navn', label: 'Navn' },
  { id: 'sted', label: 'Sted' },
  { id: 'tidspunkt', label: 'Tidspunkt' },
  { id: 'svarfrist', label: 'Svarfrist' },
  { id: 'omtreffet', label: 'Om treffet' },
];

const PublisereSteg = () => {
  const { rekrutteringstreffId } = useRekrutteringstreffContext();

  const arbeidsgiverModalRef = React.useRef<HTMLDialogElement>(null);
  const endreTittelModalRef = React.useRef<HTMLDialogElement>(null);
  const tidspunktModalRef = React.useRef<HTMLDialogElement>(null);
  const stedModalRef = React.useRef<HTMLDialogElement>(null);
  const svarfristModalRef = React.useRef<HTMLDialogElement>(null);
  const innleggModalRef = React.useRef<HTMLDialogElement>(null);

  const { data: arbeidsgivereData, isLoading: arbeidsgivereLoading } =
    useRekrutteringstreffArbeidsgivere(rekrutteringstreffId);
  const {
    data: rekrutteringstreffData,
    isLoading: rekrutteringstreffLoading,
    mutate: mutateRekrutteringstreff,
  } = useRekrutteringstreff(rekrutteringstreffId);
  const {
    data: innleggData,
    isLoading: innleggLoading,
    mutate: mutateInnlegg,
  } = useInnlegg(rekrutteringstreffId);

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

  const handleClickSjekklisteItem = (id: string) => {
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
      <SjekklisteContainer>
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
            const kanKlikkes = true;
            const visRamme =
              item.id === 'arbeidsgiver' || item.id === 'svarfrist';
            return (
              <React.Fragment key={item.id}>
                <SjekklisteRad
                  erOppfylt={erOppfylt}
                  kanKlikkes={kanKlikkes}
                  onClick={() => handleClickSjekklisteItem(item.id)}
                  label={item.label}
                  handlingstekst='Legg til'
                  ariaLabel={
                    erOppfylt
                      ? `Rediger ${item.label}`
                      : `Legg til ${item.label}`
                  }
                />
                {visRamme && <SjekklisteSeparator />}
              </React.Fragment>
            );
          })}
      </SjekklisteContainer>

      <LeggTilArbeidsgiverModal modalRef={arbeidsgiverModalRef} />

      {rekrutteringstreffData && (
        <>
          <EndreTittel
            modalRef={endreTittelModalRef}
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
