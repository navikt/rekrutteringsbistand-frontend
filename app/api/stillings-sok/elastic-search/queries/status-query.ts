import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';
import { VisningsStatus } from '@/app/stilling/_util/stillingInfoUtil';

// Hjelper-funksjon for å lage publisert-kriterier
const getPublisertKriterier = () => [
  {
    term: {
      'stilling.administration.status': 'DONE',
    },
  },
  {
    exists: {
      field: 'stilling.publishedByAdmin',
    },
  },
  {
    range: {
      'stilling.published': {
        lte: 'now/d',
      },
    },
  },
];

const alleStillinger = (esBuilder: ElasticSearchQueryBuilder) => {
  // Legg til bool-query med must_not for REJECTED/DELETED og must for publisert-kriterier
  esBuilder.addBoolFilter({
    must_not: [
      { term: { 'stilling.status': 'REJECTED' } },
      { term: { 'stilling.status': 'DELETED' } },
    ],
    must: getPublisertKriterier(),
  });
};

// Funksjon for å lage stoppet status query
// getStoppetQuery og getUtløptQuery erstattes av eksplisitte visningsStatus-kriterier under.

export const statusQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const statuser = params.filter.statuser as VisningsStatus[];

  const ingenFiltreValgt = statuser.length === 0;
  const alleFiltreValgt =
    statuser.length === Object.values(VisningsStatus).length;
  // Baseline: alle publiserte stillinger (ekskl REJECTED/DELETED) i hovedquery slik at aggregasjoner ALLTID baserer seg på hele settet
  if (!params.navIdent) {
    alleStillinger(esBuilder);
  }

  // Ingen valgte statuser:
  //  - formidlinger=true: la være å snevre inn (alle baseline-publiserte formidlinger skal vises)
  //  - ellers: match_none for å unngå forvirrende tom baseline for intern søk der vi forventer minst én status
  if (ingenFiltreValgt) {
    if (!params.formidlinger) {
      esBuilder.setPostFilter({ match_none: {} });
    }
    return;
  }

  // Alle statuser valgt => ingen innsnevring; behold baseline uten post_filter.
  if (alleFiltreValgt) {
    return;
  }

  // Bygg post_filter for de valgte statusene — påvirker kun hits, ikke aggregasjoner
  const postFilterShould: any[] = [];

  // Mapping til visningsStatus kriterier:
  // Åpen for søkere: stilling.status=ACTIVE AND publishedByAdmin exists AND published exists AND administration.status=DONE
  if (statuser.includes(VisningsStatus.ApenForSokere)) {
    postFilterShould.push({
      bool: {
        must: [
          { term: { 'stilling.status': 'ACTIVE' } },
          { term: { 'stilling.administration.status': 'DONE' } },
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
        ],
        must_not: [
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      },
    });
  }
  // Fullført (tidligere stoppet): stilling.status=STOPPED + publiseringskriterier
  if (statuser.includes(VisningsStatus.Fullfort)) {
    postFilterShould.push({
      bool: {
        must: [
          { term: { 'stilling.status': 'STOPPED' } },
          { term: { 'stilling.administration.status': 'DONE' } },
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
        ],
        must_not: [
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      },
    });
  }
  // Utløpt - Stengt for søkere: stilling.status=INACTIVE + expires < today + publiseringskriterier
  if (statuser.includes(VisningsStatus.UtloptStengtForSokere)) {
    postFilterShould.push({
      bool: {
        must: [
          { term: { 'stilling.status': 'INACTIVE' } },
          { range: { 'stilling.expires': { lt: 'now/d' } } },
          { term: { 'stilling.administration.status': 'DONE' } },
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
        ],
        must_not: [
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      },
    });
  }
  if (statuser.includes(VisningsStatus.StengtForSokere)) {
    postFilterShould.push({
      bool: {
        must: [
          { term: { 'stilling.status': 'INACTIVE' } },
          { term: { 'stilling.administration.status': 'DONE' } },
          { exists: { field: 'stilling.publishedByAdmin' } },
          { range: { 'stilling.published': { lte: 'now/d' } } },
        ],
        must_not: [
          { range: { 'stilling.expires': { lt: 'now/d' } } },
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      },
    });
  }
  if (statuser.includes(VisningsStatus.IkkePublisert)) {
    postFilterShould.push({
      bool: {
        must: [{ term: { 'stilling.status': 'INACTIVE' } }],
        must_not: [
          { exists: { field: 'stilling.publishedByAdmin' } },
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      },
    });
  }
  if (statuser.includes(VisningsStatus.Avbrutt)) {
    postFilterShould.push({ term: { 'stilling.status': 'DELETED' } });
  }

  // Implicit inkludering for "Mine" (navIdent):
  //  - Ikke publisert (INACTIVE uten publishedByAdmin) skal alltid dukke opp sammen med valgte statuser
  //  - Avbrutt (DELETED) skal også dukke opp selv om det ikke er et eksponert filter
  // Begge legges kun til dersom bruker har valgt minst én annen status (postFilterShould.length > 0)
  if (params.navIdent && postFilterShould.length > 0) {
    if (!statuser.includes(VisningsStatus.IkkePublisert)) {
      postFilterShould.push({
        bool: {
          must: [{ term: { 'stilling.status': 'INACTIVE' } }],
          must_not: [
            { exists: { field: 'stilling.publishedByAdmin' } },
            { term: { 'stilling.status': 'REJECTED' } },
            { term: { 'stilling.status': 'DELETED' } },
          ],
        },
      });
    }
    if (!statuser.includes(VisningsStatus.Avbrutt)) {
      postFilterShould.push({ term: { 'stilling.status': 'DELETED' } });
    }
  }

  if (postFilterShould.length > 0) {
    esBuilder.setPostFilter({
      bool: {
        should: postFilterShould,
        minimum_should_match: 1,
      },
    });
  }
};
