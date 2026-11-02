'use client';

import { EndreArkivertStatusModal } from './_ui/EndreArkivertStatusModal';
import { KandidatVisningProps } from './_ui/KandidatlisteFilter/useFiltrerteKandidater';
import OrganisasjonsnummerAlert from './_ui/OrganisasjonsnummerAlert';
import { useMarkerteKandidaterStore } from './markerteKandidaterStore';
import { mapKandidatListeKandidatTilVisning } from './util';
import {
  KandidatlisteKandidaterResponseDTO,
  KandidatListeKandidatDTO,
  usynligKandidaterSchemaDTO,
} from '@/app/api/kandidat/schema.zod';
import { useStillingsContext } from '@/app/stilling/[stillingsId]/StillingsContext';
import { RekbisError } from '@/util/rekbisError';
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface KandidatlisteContextProps {
  lukketKandidatliste: boolean;
  markerteKandidater: KandidatVisningProps[];
  setMarkerteKandidater: (val: KandidatVisningProps[]) => void;
  toggleMarkerKandidat: (val: KandidatVisningProps) => void;
  reFetchKandidatliste: () => void;
  kandidatlisteId: string;
  jobbsøkerListe: KandidatVisningProps[];
  usynligeKandidater: usynligKandidaterSchemaDTO[];
  totaltAntallKandidater: number;
  alleKandidatnr: string[];
  visArkiveringsmodal: (kandidat: KandidatListeKandidatDTO) => void;
}

const KandidatListeContext = createContext<
  KandidatlisteContextProps | undefined
>(undefined);

interface KandidatlisteContextProviderProps {
  children?: ReactNode | undefined;
  jobbSøkere: KandidatlisteKandidaterResponseDTO | undefined;
  alleKandidatnr: string[];
  reFetchKandidatliste: () => void;
}

export const KandidatlisteContextProvider: FC<
  KandidatlisteContextProviderProps
> = ({ children, jobbSøkere, alleKandidatnr, reFetchKandidatliste }) => {
  const { stillingsData, kandidatlisteInfo } = useStillingsContext();
  const kandidatlisteId = kandidatlisteInfo?.kandidatlisteId;
  const [kandidatForArkivering, setKandidatForArkivering] =
    useState<KandidatListeKandidatDTO | null>(null);
  const arkiveringsmodalRef = useRef<HTMLDialogElement>(null!);

  useEffect(() => {
    if (kandidatForArkivering) arkiveringsmodalRef.current?.showModal();
  }, [kandidatForArkivering]);

  const markerteKandidaterForListe = useMarkerteKandidaterStore((s) =>
    kandidatlisteId ? s.perKandidatliste[kandidatlisteId] : undefined,
  );
  const markerteKandidater = useMemo(
    () => markerteKandidaterForListe ?? [],
    [markerteKandidaterForListe],
  );
  const setMarkerteKandidaterStore = useMarkerteKandidaterStore(
    (s) => s.setMarkerteKandidater,
  );
  const toggleMarkerKandidatStore = useMarkerteKandidaterStore(
    (s) => s.toggleMarkerKandidat,
  );
  const setMarkerteKandidater = (val: KandidatVisningProps[]) => {
    if (kandidatlisteId) setMarkerteKandidaterStore(kandidatlisteId, val);
  };
  const toggleMarkerKandidat = (kandidat: KandidatVisningProps) => {
    if (kandidatlisteId) toggleMarkerKandidatStore(kandidatlisteId, kandidat);
  };

  const setAktivKandidatlisteId = useMarkerteKandidaterStore(
    (s) => s.setAktivKandidatlisteId,
  );
  useEffect(() => {
    setAktivKandidatlisteId(kandidatlisteId ?? null);
    return () => setAktivKandidatlisteId(null);
  }, [kandidatlisteId, setAktivKandidatlisteId]);

  const lukketKandidatliste =
    kandidatlisteInfo?.kandidatlisteStatus === 'LUKKET';

  const organisasjonsnummerFraKandidatliste = kandidatlisteInfo?.orgnr;
  const organisasjonsnummerFraStilling =
    stillingsData?.stilling?.employer?.orgnr;

  const orgnummerDivergererMellomStillingOgKandidatliste: boolean = Boolean(
    organisasjonsnummerFraKandidatliste &&
    organisasjonsnummerFraStilling &&
    organisasjonsnummerFraKandidatliste !== organisasjonsnummerFraStilling,
  );

  const jobbsøkerListe = jobbSøkere
    ? jobbSøkere.kandidatPersoner
        .filter(
          (
            person,
          ): person is typeof person & {
            kandidat: NonNullable<typeof person.kandidat>;
          } => person.kandidat !== null,
        )
        .map((person) => mapKandidatListeKandidatTilVisning(person))
    : [];

  const usynligeKandidater = jobbSøkere
    ? jobbSøkere.kandidatPersoner
        .map((p) => p.formidlingerAvUsynligKandidat)
        .filter((f): f is NonNullable<typeof f> => f !== null)
    : [];

  if (!kandidatlisteInfo?.kandidatlisteId) {
    //TODO Verifiser at kandidatliste id alltid finnes.
    return null;
  }

  return (
    <KandidatListeContext.Provider
      value={{
        markerteKandidater,
        setMarkerteKandidater,
        lukketKandidatliste,
        reFetchKandidatliste,
        toggleMarkerKandidat,
        kandidatlisteId: kandidatlisteInfo?.kandidatlisteId,
        usynligeKandidater,
        totaltAntallKandidater: jobbSøkere?.totaltAntallKandidater ?? 0,
        jobbsøkerListe,
        alleKandidatnr,
        visArkiveringsmodal: setKandidatForArkivering,
      }}
    >
      {orgnummerDivergererMellomStillingOgKandidatliste && (
        <OrganisasjonsnummerAlert />
      )}
      {children}
      {kandidatForArkivering && (
        <EndreArkivertStatusModal
          modalRef={arkiveringsmodalRef}
          kandidat={kandidatForArkivering}
          kandidatlisteId={kandidatlisteInfo.kandidatlisteId}
          onClose={() => setKandidatForArkivering(null)}
        />
      )}
    </KandidatListeContext.Provider>
  );
};

export const useNullableKandidatlisteContext = () => {
  const context = useContext(KandidatListeContext);
  if (context === undefined) {
    return null;
  }
  return context;
};

export const useKandidatlisteContext = () => {
  const context = useContext(KandidatListeContext);
  if (context === undefined) {
    throw new RekbisError({
      message:
        'Context er undefined, må være children av KandidatlisteContextProvider.',
    });
  }
  return context;
};
