import { useKandidatlisteContext } from '../../KandidatlisteContext';
import { KandidatHendelse, mapToHendelser } from '../KandidatHendelse';
import {
  KandidatlisteSortering,
  useKandidatlisteFilterContext,
} from './KandidatlisteFilterContext';
import {
  kandidaterSchemaDTO,
  usynligKandidaterSchemaDTO,
} from '@/app/api/kandidat/schema.zod';
import React from 'react';

export interface KandidatVisningProps extends kandidaterSchemaDTO {
  kandidatHendelser: KandidatHendelse[];
}

type FiltrerteKandidater = {
  kandidater?: KandidatVisningProps[];
  usynligeKandidater?: usynligKandidaterSchemaDTO[];
  totaltAntallKandidater: number;
};

const useFiltrerteKandidater = (): FiltrerteKandidater | null => {
  const { kandidatliste, forespurteKandidater, beskjeder } =
    useKandidatlisteContext();
  const { fritekstSøk, sortering } = useKandidatlisteFilterContext();

  const [filtrerteKandidater, setFiltrerteKandidater] =
    React.useState<FiltrerteKandidater | null>(null);

  React.useEffect(() => {
    const kandidaterFilter = kandidatliste.kandidater.map((kandidat) => {
      const forespørselCvForKandidat =
        kandidat.aktørid && forespurteKandidater
          ? forespurteKandidater[kandidat.aktørid]
          : null;

      const beskjedForKandidat =
        beskjeder && beskjeder[kandidat.fodselsnr ?? ''];

      const kandidatHendelser = mapToHendelser({
        kandidat,
        forespørselCvForKandidat,
        beskjedForKandidat,
      });

      return { ...kandidat, kandidatHendelser };
    });
    const usynligeKandidaterFilter = [
      ...kandidatliste.formidlingerAvUsynligKandidat,
    ];

    switch (sortering) {
      case KandidatlisteSortering.NAVN_ASC:
      case KandidatlisteSortering.NAVN_DESC:
        kandidaterFilter.sort((a, b) => {
          const sammenligning = a.etternavn.localeCompare(b.etternavn, 'nb');
          return sortering === KandidatlisteSortering.NAVN_ASC
            ? sammenligning
            : -sammenligning;
        });
        usynligeKandidaterFilter.sort((a, b) => {
          const sammenligning = a.etternavn.localeCompare(b.etternavn, 'nb');
          return sortering === KandidatlisteSortering.NAVN_ASC
            ? sammenligning
            : -sammenligning;
        });
        break;

      case KandidatlisteSortering.LAGT_TIL_ASC:
      case KandidatlisteSortering.LAGT_TIL_DESC:
        kandidaterFilter.sort((a, b) => {
          const sammenligning = a.lagtTilAv.navn.localeCompare(
            b.lagtTilAv.navn,
            'nb',
          );
          return sortering === KandidatlisteSortering.LAGT_TIL_ASC
            ? sammenligning
            : -sammenligning;
        });
        usynligeKandidaterFilter.sort((a, b) => {
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
        kandidaterFilter.sort((a, b) => {
          const sammenligning = a.kandidatHendelser[0].tittel.localeCompare(
            b.kandidatHendelser[0].tittel,
          );
          return sortering === KandidatlisteSortering.HENDELSE_ASC
            ? sammenligning
            : -sammenligning;
        });
        usynligeKandidaterFilter.sort((a, b) => {
          const sammenligning = a.utfall.localeCompare(b.utfall, 'nb');
          return sortering === KandidatlisteSortering.HENDELSE_ASC
            ? sammenligning
            : -sammenligning;
        });
        break;
    }

    setFiltrerteKandidater({
      kandidater: kandidaterFilter,
      usynligeKandidater: usynligeKandidaterFilter,
      totaltAntallKandidater:
        kandidaterFilter.length + usynligeKandidaterFilter.length,
    });
  }, [sortering, kandidatliste.kandidater]);

  return filtrerteKandidater;
};

export default useFiltrerteKandidater;
