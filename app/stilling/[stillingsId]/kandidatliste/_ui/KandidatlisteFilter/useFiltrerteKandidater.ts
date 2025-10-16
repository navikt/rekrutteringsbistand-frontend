import {
  KandidatlisteSortering,
  useKandidatlisteFilterContext,
} from './KandidatlisteFilterContext';
// Ny import
import {
  KandidatListeKandidatDTO,
  usynligKandidaterSchemaDTO,
} from '@/app/api/kandidat/schema.zod';
import { useKandidatlisteContext } from '@/app/stilling/[stillingsId]/kandidatliste/KandidatlisteContext';
import { KandidatHendelseType } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelseTag';
import { KandidatHendelser } from '@/app/stilling/[stillingsId]/kandidatliste/_ui/KandidatHendelser/KandidatHendelser';
import { useEffect, useState } from 'react';

export interface KandidatVisningProps extends KandidatListeKandidatDTO {
  kandidatHendelser: KandidatHendelser;
}

type FiltrerteKandidater = {
  kandidater?: KandidatVisningProps[];
  usynligeKandidater?: usynligKandidaterSchemaDTO[];
  totaltAntallKandidater: number;
};

const useFiltrerteKandidater = (): FiltrerteKandidater | null => {
  const { kandidater, usynligeKandidater } = useKandidatlisteContext();
  const { fritekstSøk, sortering, internStatus, visSlettede, hendelseFilter } =
    useKandidatlisteFilterContext();

  const [filtrerteKandidater, setFiltrerteKandidater] =
    useState<FiltrerteKandidater | null>(null);

  useEffect(() => {
    if (kandidater) {
      const nyKandidatliste = kandidater;
      const nyUsynligListe = usynligeKandidater;

      switch (sortering) {
        case KandidatlisteSortering.NAVN_ASC:
        case KandidatlisteSortering.NAVN_DESC:
          nyKandidatliste?.sort((a, b) => {
            const sammenligning = a.etternavn.localeCompare(b.etternavn, 'nb');
            return sortering === KandidatlisteSortering.NAVN_ASC
              ? sammenligning
              : -sammenligning;
          });
          nyUsynligListe?.sort((a, b) => {
            const sammenligning = a.etternavn.localeCompare(b.etternavn, 'nb');
            return sortering === KandidatlisteSortering.NAVN_ASC
              ? sammenligning
              : -sammenligning;
          });
          break;

        case KandidatlisteSortering.LAGT_TIL_ASC:
        case KandidatlisteSortering.LAGT_TIL_DESC:
          nyKandidatliste?.sort((a, b) => {
            const datoA = new Date(a.lagtTilTidspunkt).getTime();
            const datoB = new Date(b.lagtTilTidspunkt).getTime();

            const sammenligning = datoA - datoB;
            return sortering === KandidatlisteSortering.LAGT_TIL_ASC
              ? sammenligning
              : -sammenligning;
          });
          nyUsynligListe?.sort((a, b) => {
            const sammenligning = a.lagtTilAvNavn.localeCompare(
              b.lagtTilAvNavn,
              'nb',
            );
            return sortering === KandidatlisteSortering.LAGT_TIL_ASC
              ? sammenligning
              : -sammenligning;
          });
          break;

        case KandidatlisteSortering.HENDELSE_ASC:
        case KandidatlisteSortering.HENDELSE_DESC:
          nyKandidatliste?.sort((a, b) => {
            const aDato =
              a.kandidatHendelser.sisteHendelse?.dato?.getTime() || 0;
            const bDato =
              b.kandidatHendelser.sisteHendelse?.dato?.getTime() || 0;
            const datoSammenligning = bDato - aDato;

            return sortering === KandidatlisteSortering.HENDELSE_ASC
              ? datoSammenligning
              : -datoSammenligning;
          });
          nyUsynligListe?.sort((a, b) => {
            const sammenligning = a.utfall.localeCompare(b.utfall, 'nb');

            return sortering === KandidatlisteSortering.HENDELSE_ASC
              ? sammenligning
              : -sammenligning;
          });
          break;
        case KandidatlisteSortering.VARSEL_ASC:
        case KandidatlisteSortering.VARSEL_DESC:
          nyKandidatliste?.sort((a, b) => {
            const aDato = a.kandidatHendelser.sisteSms?.dato?.getTime() || 0;
            const bDato = b.kandidatHendelser.sisteSms?.dato?.getTime() || 0;
            const datoSammenligning = bDato - aDato;

            return sortering === KandidatlisteSortering.VARSEL_ASC
              ? datoSammenligning
              : -datoSammenligning;
          });

          break;

        case KandidatlisteSortering.INTERN_STATUS_ASC:
        case KandidatlisteSortering.INTERN_STATUS_DESC:
          nyKandidatliste?.sort((a, b) => {
            const sammenligning = a.status.localeCompare(b.status, 'nb');
            return sortering === KandidatlisteSortering.INTERN_STATUS_ASC
              ? sammenligning
              : -sammenligning;
          });
          break;
      }

      const fritekstKandidater = nyKandidatliste
        ?.filter((kandidat) => {
          const fullNavn = `${kandidat.fornavn} ${kandidat.etternavn}`;
          const fødselsnummer = kandidat.fodselsnr;
          return fullNavn.toLowerCase().includes(fritekstSøk.toLowerCase()) || fødselsnummer?.includes(fritekstSøk);
        })
        ?.filter((kandidat) => {
          if (internStatus.length === 0) return true;
          return internStatus.includes(kandidat.status);
        })
        ?.filter((kandidat) => {
          if (hendelseFilter.length === 0) return true;

          const filterTyper = hendelseFilter.map(
            (filter) =>
              KandidatHendelseType[filter as keyof typeof KandidatHendelseType],
          );

          return filterTyper.some((filter) => {
            if (kandidat.kandidatHendelser.sisteHendelse?.type === filter) {
              return true;
            }
            return false;
          });
        })
        ?.filter((kandidat) => {
          if (visSlettede === 'false') {
            return !kandidat.arkivert;
          } else {
            return true;
          }
        });

      const fritekstUsynlige = nyUsynligListe?.filter((kandidat) => {
        const fullNavn = `${kandidat.fornavn} ${kandidat.etternavn}`;
        return fullNavn.toLowerCase().includes(fritekstSøk.toLowerCase());
      });

      setFiltrerteKandidater({
        kandidater: fritekstKandidater,
        usynligeKandidater: fritekstUsynlige,
        totaltAntallKandidater:
          fritekstKandidater.length + (fritekstUsynlige?.length || 0),
      });
    }
  }, [
    sortering,
    kandidater,
    usynligeKandidater,
    fritekstSøk,
    internStatus,
    visSlettede,
    hendelseFilter,
  ]);

  return filtrerteKandidater;
};

export default useFiltrerteKandidater;
