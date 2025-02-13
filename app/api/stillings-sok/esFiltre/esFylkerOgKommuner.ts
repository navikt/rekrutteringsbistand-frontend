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

const beholdFylkerUtenValgteKommuner = (
  valgteFylkerOgKommuner: PamGeografi[],
) => {
  const fylkerUtenValgteKommuner = valgteFylkerOgKommuner.filter(
    (fylke) =>
      !valgteFylkerOgKommuner
        .filter((kommune) => kommune.type === GeografiType.KOMMUNE)
        .some(
          (kommune) =>
            kommune.lokasjon.fylkesnummer === fylke.lokasjon.fylkesnummer,
        ),
  );

  return fylkerUtenValgteKommuner;
};

const geografi = (valgteFylkerOgKommuner: PamGeografi[]) => {
  const fylker = beholdFylkerUtenValgteKommuner(valgteFylkerOgKommuner);

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

  const fylkerInkludertGamleNavn = fylker.flatMap((fylke) => {
    const ekstraNavn =
      fylke.lokasjon.fylkesnummer &&
      stedmappingFraNyttNavn
        .get(formaterStedsnavn(fylke.lokasjon.fylkesnummer))
        ?.map((sted) => {
          return sted.navn;
        });
    return [fylke.lokasjon.fylkesnummer, ...(ekstraNavn || [])];
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
