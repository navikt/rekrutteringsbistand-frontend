import { ElasticSearchQueryBuilder } from '@/app/api/stillings-sok/elastic-search/elasticSearchQueryBuilder';
import { GenerateElasticSearchQueryParams } from '@/app/api/stillings-sok/opprettElasticSearchQuery';
import { StillingsStatusTyper } from '@/app/stilling/_ui/StillingsSøkFilter/StatusFilter';

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
const getStoppetQuery = () => ({
  bool: {
    must: [
      {
        term: {
          'stilling.status': 'STOPPED',
        },
      },
      ...getPublisertKriterier(),
    ],
  },
});

// Funksjon for å lage utløpt status query
const getUtløptQuery = () => ({
  bool: {
    must: [
      {
        term: {
          'stilling.status': 'INACTIVE',
        },
      },
      {
        range: {
          'stilling.expires': {
            lt: 'now/d',
          },
        },
      },
      ...getPublisertKriterier(),
    ],
  },
});

export const statusQuery = (
  params: GenerateElasticSearchQueryParams,
  esBuilder: ElasticSearchQueryBuilder,
) => {
  const statuser = params.filter.statuser;

  const ingenFiltreValgt = statuser.length === 0;
  const alleFiltreValgt =
    statuser.length === Object.keys(StillingsStatusTyper).length;
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

  if (statuser.includes(StillingsStatusTyper.Publisert)) {
    postFilterShould.push({ term: { 'stilling.status': 'ACTIVE' } });
  }
  if (statuser.includes(StillingsStatusTyper.Stoppet)) {
    postFilterShould.push(getStoppetQuery());
  }
  if (statuser.includes(StillingsStatusTyper.Utløpt)) {
    postFilterShould.push(getUtløptQuery());
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
