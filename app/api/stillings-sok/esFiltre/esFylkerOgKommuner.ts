import {
  GeografiType,
  PamGeografi,
} from '../../pam-geografi/typehead/lokasjoner/usePamGeografi';
import {
  formaterStedsnavn,
  stedmappingFraNyttNavn,
  stedmappingFraNyttNummer,
} from './fylkeOgKommuneMapping';

export const esFylkerOgKommuner = (valgteFylkerOgKommuner: PamGeografi[]) => {
  if (!valgteFylkerOgKommuner) return [];
  return geografi(valgteFylkerOgKommuner);
};

const geografi = (valgteFylkerOgKommuner: PamGeografi[]) => {
  const fylkeSøk = valgteFylkerOgKommuner.filter(
    (fylke) => fylke.type === GeografiType.FYLKE,
  );

  const fylker = valgteFylkerOgKommuner.filter(
    (f) => f.type === GeografiType.FYLKE,
  );

  if (
    fylker.length === 0 &&
    valgteFylkerOgKommuner.filter(
      (kommune) => kommune.type === GeografiType.KOMMUNE,
    ).length === 0
  )
    return [];

  const kommunerInkludertGamleKoder = valgteFylkerOgKommuner
    .filter((kommune) => kommune.type === GeografiType.KOMMUNE)
    .flatMap((kommune) => {
      const ekstraSteder =
        kommune.lokasjon.kommunenummer &&
        stedmappingFraNyttNummer
          .get(kommune.lokasjon.kommunenummer)
          ?.map((sted) => {
            return sted.nummer;
          });

      return [kommune.lokasjon.kommunenummer, ...(ekstraSteder || [])];
    });

  const fylkerInkludertGamleNavn = new Set(
    [...fylkeSøk].flatMap((fylke) => {
      const ekstraNavn =
        stedmappingFraNyttNavn
          .get(formaterStedsnavn(fylke.navn))
          ?.map((sted) => sted.navn.toUpperCase()) || [];
      return [fylke.navn, ...ekstraNavn];
    }),
  );

  const shouldFylker =
    fylkerInkludertGamleNavn.size === 0
      ? []
      : [
          {
            terms: {
              'stilling.locations.county.keyword': Array.from(
                fylkerInkludertGamleNavn,
              ).map((fylke) => fylke.toUpperCase()),
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
