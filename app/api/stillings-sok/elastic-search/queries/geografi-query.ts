import {
  formaterStedsnavn,
  stedmappingFraNyttNavn,
  stedmappingFraNyttNummer,
} from '../../../../../util/fylkeOgKommuneMapping';
import {
  GeografiType,
  PamGeografi,
} from '../../../pam-geografi/typehead/lokasjoner/usePamGeografi';
import { GenerateElasticSearchQueryParams } from '../../opprettElasticSearchQuery';
import { ElasticSearchQueryBuilder } from '../elasticSearchQueryBuilder';

export const geografiQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  if (
    (params.geografiData && params.filter.fylker?.length > 0) ||
    params.filter.kommuner?.length > 0
  ) {
    const valgteFylker =
      params.geografiData
        ?.filter((geografi) => geografi.type === GeografiType.FYLKE)
        .filter(
          (fylke) =>
            fylke.lokasjon.fylkesnummer &&
            params.filter?.fylker.includes(fylke.lokasjon.fylkesnummer),
        ) ?? [];

    const valgteKommuner =
      params.geografiData
        ?.filter((geografi) => geografi.type === GeografiType.KOMMUNE)
        .filter((kommune) => {
          const kommuneErValgt =
            kommune.lokasjon.kommunenummer &&
            params.filter?.kommuner.includes(kommune.lokasjon.kommunenummer);

          return kommuneErValgt;
        }) ?? [];

    const kommunerDerKunFylkeErValgt = valgteFylker
      .filter(
        (fylke) =>
          fylke.type === GeografiType.FYLKE &&
          fylke.lokasjon.fylkesnummer &&
          !valgteKommuner.some(
            (k) => k.lokasjon.fylkesnummer === fylke.lokasjon.fylkesnummer,
          ),
      )
      .flatMap(
        (fylke) =>
          params.geografiData?.filter(
            (g) =>
              g.lokasjon.fylkesnummer === fylke.lokasjon.fylkesnummer &&
              g.type === GeografiType.KOMMUNE,
          ) ?? [],
      );

    const fylkerUtenValgteKommuner = valgteFylker.filter(
      (fylke) =>
        fylke.lokasjon.fylkesnummer &&
        !valgteKommuner.some(
          (k) => k.lokasjon.fylkesnummer === fylke.lokasjon.fylkesnummer,
        ),
    );

    const valgteFylkerOgKommuner: PamGeografi[] = [
      ...fylkerUtenValgteKommuner,
      ...valgteKommuner,
      ...kommunerDerKunFylkeErValgt,
    ];

    const fylkeSøk = valgteFylkerOgKommuner.filter(
      (f) => f.type === GeografiType.FYLKE,
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
      return;

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

    // Legg til nested geografi-query
    esBuilder.addFilter({
      nested: {
        path: 'stilling.locations',
        query: {
          bool: {
            should: [...shouldFylker, ...shouldKommuner],
            minimum_should_match: 1,
          },
        },
      },
    });
  }
};
