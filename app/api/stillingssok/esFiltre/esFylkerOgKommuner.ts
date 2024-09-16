import { geografiDTO } from '../../stilling/geografi/useGeografi';
import {
  formaterStedsnavn,
  stedmappingFraNyttNavn,
  stedmappingFraNyttNummer,
} from './fylkeOgKommuneMapping';

export const esFylkerOgKommuner = (valgteFylkerOgKommuner: geografiDTO) => {
  if (!valgteFylkerOgKommuner) return [];
  return geografi(valgteFylkerOgKommuner);
};

const beholdFylkerUtenValgteKommuner = (
  valgteFylkerOgKommuner: geografiDTO,
) => {
  const fylkerUtenValgteKommuner = valgteFylkerOgKommuner.fylker.filter(
    (fylke) =>
      !valgteFylkerOgKommuner.kommuner.some(
        (kommune) => kommune.countyCode === fylke.code,
      ),
  );

  return fylkerUtenValgteKommuner;
};

const geografi = (valgteFylkerOgKommuner: geografiDTO) => {
  const fylker = beholdFylkerUtenValgteKommuner(valgteFylkerOgKommuner);

  if (fylker.length === 0 && valgteFylkerOgKommuner.kommuner.length === 0)
    return [];

  const kommunerInkludertGamleKoder = valgteFylkerOgKommuner.kommuner.flatMap(
    (kommune) => {
      const ekstraSteder = stedmappingFraNyttNummer
        .get(kommune.code)
        ?.map((sted) => {
          return sted.nummer;
        });

      return [kommune.code, ...(ekstraSteder || [])];
    },
  );

  const fylkerInkludertGamleNavn = fylker.flatMap((fylke) => {
    const ekstraNavn = stedmappingFraNyttNavn
      .get(formaterStedsnavn(fylke.name))
      ?.map((sted) => {
        return sted.navn;
      });
    return [fylke.name, ...(ekstraNavn || [])];
  });

  const shouldFylker =
    fylkerInkludertGamleNavn.length === 0
      ? []
      : [
          {
            terms: {
              'stilling.locations.county.keyword': fylkerInkludertGamleNavn,
            },
          },
        ];

  const shouldKommuner =
    kommunerInkludertGamleKoder.length === 0
      ? []
      : [
          {
            terms: {
              'stilling.locations.municipalCode': kommunerInkludertGamleKoder,
            },
          },
        ];

  return {
    nested: {
      path: 'stilling.locations',
      query: {
        bool: {
          should: [...shouldFylker, ...shouldKommuner],
        },
      },
    },
  };
};
