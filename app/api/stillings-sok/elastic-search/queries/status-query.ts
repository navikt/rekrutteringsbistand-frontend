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

  // Hvis ingen eller alle statuser er valgt skal vi IKKE snevre inn treff. Da lar vi baseline stå og skipper post_filter.
  if (ingenFiltreValgt || alleFiltreValgt) {
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
          { exists: { field: 'stilling.published' } },
          { term: { 'stilling.status': 'REJECTED' } },
          { term: { 'stilling.status': 'DELETED' } },
        ],
      },
    });
  }
  if (statuser.includes(VisningsStatus.Avbrutt)) {
    postFilterShould.push({ term: { 'stilling.status': 'DELETED' } });
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
