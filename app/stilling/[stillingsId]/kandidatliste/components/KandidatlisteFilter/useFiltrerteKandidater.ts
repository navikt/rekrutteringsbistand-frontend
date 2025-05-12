import { useKandidatlisteContext } from '../../KandidatlisteContext';
import { KandidatHendelser } from '../KandidatHendelser/KandidatHendelser';
import {
  KandidatlisteSortering,
  useKandidatlisteFilterContext,
} from './KandidatlisteFilterContext';
import {
  KandidatListeKandidatDTO,
  usynligKandidaterSchemaDTO,
} from '@/app/api/kandidat/schema.zod';
import React from 'react';

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
  const { fritekstSøk, sortering, internStatus, visSlettede } =
    useKandidatlisteFilterContext();

  const [filtrerteKandidater, setFiltrerteKandidater] =
    React.useState<FiltrerteKandidater | null>(null);

  React.useEffect(() => {
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
            const sammenligning = a.lagtTilAv.navn.localeCompare(
              b.lagtTilAv.navn,
              'nb',
            );
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
            // Sorter først på tittel
            const aTittel = a.kandidatHendelser.sisteHendelse?.tekst || '';
            const bTittel = b.kandidatHendelser.sisteHendelse?.tekst || '';
            const tittelSammenligning = aTittel.localeCompare(bTittel, 'nb');

            if (tittelSammenligning !== 0) {
              return sortering === KandidatlisteSortering.HENDELSE_ASC
                ? tittelSammenligning
                : -tittelSammenligning;
            }

            // Sorter deretter på type
            const aType = a.kandidatHendelser.sisteHendelse?.tekst || '';
            const bType = b.kandidatHendelser.sisteHendelse?.tekst || '';
            const typeSammenligning = aType.localeCompare(bType, 'nb');

            if (typeSammenligning !== 0) {
              return sortering === KandidatlisteSortering.HENDELSE_ASC
                ? typeSammenligning
                : -typeSammenligning;
            }

            // Siste sortering på dato
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
            if (!a.kandidatHendelser.sisteSms && !b.kandidatHendelser.sisteSms)
              return 0;
            if (!a.kandidatHendelser.sisteSms)
              return sortering === KandidatlisteSortering.VARSEL_ASC ? 1 : -1;
            if (!b.kandidatHendelser.sisteSms)
              return sortering === KandidatlisteSortering.VARSEL_ASC ? -1 : 1;

            // Sorter først på tittel
            const aTittel = a.kandidatHendelser.sisteSms?.tekst || '';
            const bTittel = b.kandidatHendelser.sisteSms?.tekst || '';
            const tittelSammenligning = aTittel.localeCompare(bTittel, 'nb');

            if (tittelSammenligning !== 0) {
              return sortering === KandidatlisteSortering.VARSEL_ASC
                ? tittelSammenligning
                : -tittelSammenligning;
            }

            // // Sorter deretter på type
            // const aType = a.kandidatHendelser.sisteSms?.fargeKode || '';
            // const bType = b.kandidatHendelser.sisteSms?.fargeKode || '';
            // const typeSammenligning = aType.localeCompare(bType, 'nb');

            // if (typeSammenligning !== 0) {
            //   return sortering === KandidatlisteSortering.VARSEL_ASC
            //     ? typeSammenligning
            //     : -typeSammenligning;
            // }

            // Siste sortering på dato
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
          return fullNavn.toLowerCase().includes(fritekstSøk.toLowerCase());
        })
        ?.filter((kandidat) => {
          if (internStatus.length === 0) return true;
          return internStatus.includes(kandidat.status);
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
  ]);

  return filtrerteKandidater;
};

export default useFiltrerteKandidater;
